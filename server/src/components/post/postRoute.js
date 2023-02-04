import { Router } from "express";
import { protect } from "../auth/authController.js";
import { createPost, getAllPosts, uploadImage } from "./postController.js";

const router = Router();

router.route("/").get(getAllPosts).post(protect, uploadImage, createPost);

export default router;
