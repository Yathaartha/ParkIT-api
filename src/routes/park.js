import { Router } from "express";
import {
  exitParking,
  findNearestParkingSlot,
  generatePreviousData,
  getAllParkingSlots,
  getCurrentParking,
} from "../controller/park.js";
import { bookParkingSlot } from "../services/parking-slots/parkingSlots.js";

const router = Router();

router.get("/slots", getAllParkingSlots);

router.post("/generate-data", generatePreviousData);

router.get("/current-parking", getCurrentParking);

router.get("/nearest-slot", findNearestParkingSlot);

router.post("/book", bookParkingSlot);
router.post("/exit", exitParking);

export default router;
