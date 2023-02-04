import mongoose from "mongoose";

import db from "../connections/dbConnection.js";

const Schema = mongoose.Schema;

// Creating cab schema
const postSchema = new Schema({
    prompt: {
        type: String,
        required: [true, "Prompt is required!"],
    },
    photoUrl: {
        type: String,
        required: [true, "ImageUrl is required!"],
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

// Creating model from schema
export default db.model("Posts", postSchema);
