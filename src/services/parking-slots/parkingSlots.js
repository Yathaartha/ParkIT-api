import { ParkingSlots } from "../../models/parking-slots/index.js";
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

  return result;
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
  const { vehicleNumber, estimatedHours } = req.body;

  const nearestSlot = await getNearestParkingSlot();

  if (!nearestSlot) {
    res.status(401).json({
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

  const estimatedExitTime = new Date();
  estimatedExitTime.setHours(estimatedExitTime.getHours() + estimatedHours);

  await CurrentParking.create({
    slotId: nearestSlot.id,
    vehicleNumber,
    entryTime: new Date(),
    estimatedExit: estimatedExitTime,
  });

  res.send({
    slotId: nearestSlot.id,
    vehicleNumber,
    entryTime: new Date(),
    estimatedExitTime,
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
