import { Router } from "express";
import apiRoutes from "./api";
import authRoutes from "./auth";

const router = Router();

router.use("/api/v1", apiRoutes).use("/api/v1", authRoutes);

export default router;
