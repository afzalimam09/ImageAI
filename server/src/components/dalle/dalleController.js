import { Configuration, OpenAIApi } from "openai";
import config from "../../config/config.js";
import catchAsync from "../../helper/catchAsync.js";

const configuration = new Configuration({
    apiKey: config.openai.api_key,
});

const openai = new OpenAIApi(configuration);

export const generateImage = catchAsync(async (req, res, next) => {
    const { prompt } = req.body;

    const aiResponse = await openai.createImage({
        prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json",
    });
    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
});
