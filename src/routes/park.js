import { Router } from "express";
import {
  findNearestParkingSlot,
  generatePreviousData,
  getAllParkingSlots,
  getCurrentParking,
} from "../controller/park.js";

const router = Router();

router.get("/slots", getAllParkingSlots);

router.get("/generate-data", generatePreviousData);

router.get("/current-parking", getCurrentParking);

router.get("/nearest-slot", findNearestParkingSlot);

export default router;
