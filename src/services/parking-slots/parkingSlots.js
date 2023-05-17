import { spawn } from "child_process";
import { ParkingSlots } from "../../models/parking-slots/index.js";
import { generateRandomVehicleNumber } from "../utils/index.js";
import { CurrentParking } from "../../models/current-parking/CurrentParking.js";
import { ParkingHistory } from "../../models/parking-history/ParkingHistory.js";

export const setAvailability = async (id, availability) => {
  const parkingSlot = await ParkingSlots.findOne({
    where: {
      id,
    },
  });

  if (parkingSlot) {
    parkingSlot.isAvailable = availability;
    await parkingSlot.save();
  }
};

export const getAllParkingSlots = async (req, res) => {
  let responseData = "";
  const python = spawn("py", [
    "./python/Smart-Parking.py",
    "./python/EmptySlots4.png",
  ]);
  python.stdout.on("data", (data) => {
    responseData += data.toString();
  });

  python.on("close", (code) => {
    // create object from the data
    if (code !== 0) {
      res.send("error");
      return;
    }
    const data = JSON.parse(responseData);

    const insertData = [];

    data["1"].forEach((slot) => {
      insertData.push({
        laneNumber: 1,
        slotNumber: slot.slot,
        isAvailable: true,
        distanceFromEntry: slot.distance,
      });
    });

    data["2"].forEach((slot) => {
      insertData.push({
        laneNumber: 2,
        slotNumber: slot.slot,
        isAvailable: true,
        distanceFromEntry: slot.distance,
      });
    });

    data["3"].forEach((slot) => {
      insertData.push({
        laneNumber: 3,
        slotNumber: slot.slot,
        isAvailable: true,
        distanceFromEntry: slot.distance,
      });
    });

    data["4"].forEach((slot) => {
      insertData.push({
        laneNumber: 4,
        slotNumber: slot.slot,
        isAvailable: true,
        distanceFromEntry: slot.distance,
      });
    });

    console.log(insertData);
    res.send("ok");
    return insertData;
  });
};

export const generatePreviousData = async (req, res) => {
  let responseData = "";
  const python = spawn("py", ["./python/GeneratePreviousData.py"]);
  python.stdout.on("data", (data) => {
    responseData += data.toString();
  });

  python.on("close", (code) => {
    if (code !== 0) {
      res.send("error");
      return;
    }
    res.send(responseData);
  });
};

export const getCurrentParking = async (req, res) => {
  let responseData = "";
  const python = spawn("py", [
    "./python/Parked-Slots.py",
    "./python/EmptySlots4.png",
  ]);
  python.stdout.on("data", (data) => {
    responseData += data.toString();
  });

  python.on("close", async (code) => {
    if (code !== 0) {
      res.send("error");
      return;
    }

    const data = JSON.parse(responseData);
    const insertData = [];

    const promises = [];

    Object.keys(data).forEach(async (lane) => {
      data[lane].forEach(async (slot) => {
        const promise = (async () => {
          const parkingSlotId = await getParkingSlotId(
            parseInt(lane),
            slot.slot
          );
          const vehicleNumber = generateRandomVehicleNumber(8);
          const entryTime = new Date();

          insertData.push({
            slotId: parkingSlotId,
            vehicleNumber,
            entryTime,
          });
        })();

        promises.push(promise);
      });
    });

    await Promise.all(promises);

    insertData.forEach(async (data) => {
      await ParkingSlots.update(
        {
          isAvailable: false,
        },
        {
          where: {
            id: data.slotId,
          },
        }
      );
    });

    console.log(insertData);
    res.send("ok");
    return insertData;
  });
};

export const getParkingSlotId = async (laneNumber, slotNumber) => {
  const result = await ParkingSlots.findOne({
    attributes: ["id"],
    where: {
      laneNumber,
      slotNumber,
    },
    logging: false,
  });

  if (!result) {
    return null;
  }

  return result.dataValues.id;
};

export const getNearestParkingSlot = async () => {
  const result = await ParkingSlots.findOne({
    where: {
      isAvailable: true,
    },
    order: [["distanceFromEntry", "ASC"]],
    logging: false,
  });

  if (!result) {
    return null;
  }

  return result.dataValues;
};

export const getParkingDetails = async (req, res) => {
  const parkingSlots = await ParkingSlots.findAll({
    attributes: ["id", "laneNumber", "slotNumber", "isAvailable"],
    logging: false,
  });

  const emptySlotsCount = parkingSlots.filter((slot) => slot.isAvailable);

  res.send({
    parkingSlots,
    emptySlotsCount: emptySlotsCount.length,
    fullSlotsCount: parkingSlots.length - emptySlotsCount.length,
  });
};

export const bookParkingSlot = async (req, res) => {
  const { vehicleNumber } = req.body;

  const nearestSlot = getNearestParkingSlot();

  if (!nearestSlot) {
    res.send({
      message: "No slots available",
    });
    return;
  }

  await ParkingSlots.update(
    {
      isAvailable: false,
    },
    {
      where: {
        id: nearestSlot.id,
      },
    }
  );

  await CurrentParking.create({
    slotId: nearestSlot.id,
    vehicleNumber,
    entryTime: new Date(),
  });

  res.send({
    message: "ok",
    data: {
      slotId: nearestSlot.id,
      vehicleNumber,
      entryTime: new Date(),
    },
  });
};

export const exitParkingSlot = async (req, res) => {
  const { slotId, vehicleNumber } = req.body;

  const currentParking = await CurrentParking.findOne({
    where: {
      slotId,
      vehicleNumber,
    },
  });

  if (!currentParking) {
    res.send({
      message: "Invalid slot id or vehicle number",
    });
    return;
  }

  const entryTime = currentParking.dataValues.entryTime;
  const exitTime = new Date();

  const timeDiff = Math.abs(exitTime - entryTime);
  const hours = Math.floor(timeDiff / 1000 / 60 / 60);

  const amount = process.env.PARKING_RATE * hours;

  await ParkingHistory.create({
    slotId,
    vehicleNumber,
    entryTime,
    exitTime,
    amount,
  });

  const parkingSlot = await ParkingSlots.findOne({
    where: {
      id: slotId,
    },
  });

  parkingSlot.update({
    isAvailable: true,
  });

  currentParking.destroy();

  res.send({
    message: "ok",
    data: {
      slotId,
      vehicleNumber,
      entryTime,
      exitTime,
      amount,
    },
  });
};
