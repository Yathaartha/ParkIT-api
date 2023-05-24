import { spawn } from "child_process";
import { generateRandomVehicleNumber } from "../services/utils/index.js";
import { getParkingSlotId } from "../services/parking-slots/index.js";
import { ParkingSlots } from "../models/parking-slots/index.js";
import {
  getLaneAndSlotNumber,
  getNearestParkingSlot,
} from "./../services/parking-slots/parkingSlots.js";
import fs from "fs";
import { ParkingHistory } from "../models/parking-history/ParkingHistory.js";
import { CurrentParking } from "../models/current-parking/CurrentParking.js";

export const getAllParkingSlots = async (req, res) => {
  let responseData = "";
  const python = spawn("py", [
    "./python/Smart-Parking.py",
    "./python/EmptySlots.jpg",
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
  const { startIndex, endIndex } = req.body;
  let responseData = "";
  const python = spawn("py", [
    "./python/GeneratePreviousData.py",
    startIndex,
    endIndex,
  ]);
  python.stdout.on("data", (data) => {
    responseData += data.toString();
  });

  python.on("close", (code) => {
    if (code !== 0) {
      res.send("error");
      return;
    }
    let dataDump = fs.createWriteStream("./src/data/previousParkings.json");
    dataDump.write(responseData);
    dataDump.end();
    res.send(responseData);
  });
};

export const getCurrentParking = async (req, res) => {
  let responseData = "";
  const python = spawn("py", [
    "./python/Parked-Slots.py",
    "./python/NonEmptySlots.jpg",
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
            laneNumber: parseInt(lane),
            slotNumber: slot.slot,
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
          logging: false,
        }
      );
    });

    res.send({ slots: insertData, availableSlots: 68 - insertData.length });
    return insertData;
  });
};

export const findNearestParkingSlot = async (req, res) => {
  const result = await getNearestParkingSlot();

  if (!result) {
    res.send({
      message: "No slots available",
    });
    return;
  }

  res.send({
    message: "Slot found",
    slot: result,
  });
};

export const exitParking = async (req, res) => {
  const { vehicleNumber } = req.body;

  const parkingSlot = await CurrentParking.findOne({
    where: {
      vehicleNumber,
    },
  });

  if (!parkingSlot) {
    res.send({
      message: "No vehicle found",
    });
    return;
  }

  await ParkingSlots.update(
    {
      isAvailable: true,
    },
    {
      where: {
        id: parkingSlot.slotId,
      },
    }
  );

  const currentTime = new Date();
  // get the hour difference between current date and the date of entry
  const totalHours = Math.abs(currentTime - parkingSlot.entryTime) / 36e5;

  const parkingDetails = await ParkingHistory.create(
    {
      slotId: parkingSlot.slotId,
      vehicleNumber: parkingSlot.vehicleNumber,
      entryTime: parkingSlot.entryTime,
      exitTime: new Date(),
      amount: parseFloat(Math.max(0.5 * totalHours, 0.25).toFixed(2)),
    },
    {
      returning: true,
    }
  );

  parkingSlot.destroy();

  res.send({
    message: "Vehicle exited",
    parkingDetails,
  });
};

export const searchParking = async (req, res) => {
  const { vehicleNumber } = req.body;

  const parkingSlot = await CurrentParking.findOne({
    where: {
      vehicleNumber,
    },
  });

  if (!parkingSlot) {
    res.send({
      message: "No vehicle found",
    });
    return;
  }

  const { laneNumber, slotNumber } = await getLaneAndSlotNumber(
    parkingSlot.slotId
  );

  res.send({
    message: "Vehicle found",
    parkingSlot: {
      slotId: parkingSlot.slotId,
      laneNumber,
      slotNumber,
      vehicleNumber: parkingSlot.vehicleNumber,
      entryTime: parkingSlot.entryTime,
      estimatedExitTime: parkingSlot.estimatedExit,
    },
  });
};
