import { Router } from "express";
import { protect } from "../auth/authController.js";
import { generateImage } from "./dalleController.js";

const router = Router();

router.route("/").post(protect, generateImage);

export default router;
