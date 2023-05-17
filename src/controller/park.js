import { spawn } from "child_process";
import { generateRandomVehicleNumber } from "../services/utils/index.js";
import { getParkingSlotId } from "../services/parking-slots/index.js";
import { ParkingSlots } from "../models/parking-slots/index.js";

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
        }
      );
    });

    res.send({ slots: insertData, availableSlots: insertData.length });
    return insertData;
  });
};