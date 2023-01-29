import { Router } from "express";
import { createPost, getAllPosts, uploadImage } from "./postController.js";

const router = Router();

router.route("/").get(getAllPosts).post(uploadImage, createPost);

export default router;
