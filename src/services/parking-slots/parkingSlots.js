import { spawn } from "child_process";

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
