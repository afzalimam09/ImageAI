import catchAsync from "../../helper/catchAsync.js";
import Post from "../../models/postModel.js";
import { cloudinary } from "../../utils/cloudinary.js";
import { createOne, getAll } from "../handleFactory.js";

export const createPost = createOne(Post);
export const getAllPosts = getAll(Post);

export const uploadImage = catchAsync(async (req, res, next) => {
    const { prompt, photo } = req.body;
    if (prompt && photo) {
        const photoTitle = prompt.split(" ").join("-").toLowerCase();
        const uploadRes = await cloudinary.uploader.upload(photo, {
            upload_preset: "image-ai",
            folder: "image-ai",
            overwrite: true,
            public_id: photoTitle,
            unique_filename: true,
        });
        if (uploadRes) {
            req.body.photoUrl = uploadRes.secure_url;
            req.body.photo = undefined;
            req.body.userId = req.user._id;
        }
    }
    next();
});
