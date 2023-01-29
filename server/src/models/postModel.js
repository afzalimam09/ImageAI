import mongoose from "mongoose";

import db from "../connections/dbConnection.js";

const Schema = mongoose.Schema;

// Creating cab schema
const postSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
    },
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
        // required: true,
    },
});

// Creating model from schema
export default db.model("Posts", postSchema);
