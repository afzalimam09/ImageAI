import { Router } from "express";
import { generateImage } from "./dalleController.js";

const router = Router();

router.route("/").post(generateImage);

export default router;
