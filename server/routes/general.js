
import express from "express";
import { getUser, getDashboardStats } from "../controllers/general.js";

const router = express.Router();
router.get("/user/:id", getUser );

//  dashboard routes
router.get("/dashboard", getDashboardStats );


export default router;
