
import express from "express";
import { getAdmins, getUserPerformance, getKpis } from "../controllers/management.js";

const router = express.Router();

router.get("/admins", getAdmins);
router.get("/kpis", getKpis);
router.get("/performance/:id", getUserPerformance);

export default router;
