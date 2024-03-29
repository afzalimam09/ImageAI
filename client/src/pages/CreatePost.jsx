import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { download, preview } from "../assets";
import { downloadImage, getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";
import { apiRequest } from "../requestMethods";

const CreatePost = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        prompt: "",
        photo: "",
    });

    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({ photo: "", prompt: randomPrompt });
    };

    const generateImage = async () => {
        if (form.prompt) {
            try {
                setGeneratingImg(true);
                const res = await apiRequest.post("/dalle", {
                    prompt: form.prompt,
                });

                setForm({
                    ...form,
                    photo: `data:image/jpeg;base64,${res.data.photo}`,
                });
            } catch (err) {
                alert(err);
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert("Please provide proper prompt");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.prompt && form.photo) {
            setLoading(true);
            try {
                const response = await apiRequest.post("/post", form);
                alert("Success");
                navigate("/");
            } catch (err) {
                console.log(err);
                alert(err);
            } finally {
                setLoading(false);
            }
        } else {
            alert("Please generate an image with proper details");
        }
    };

    return (
        <section className="max-w-7xl mx-auto">
            <div>
                <h1 className="font-extrabold text-[#222328] text-[32px]">
                    Create
                </h1>
                <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
                    Generate an imaginative image through DALL-E AI and share it
                    with the community
                </p>
            </div>

            <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                    <FormField
                        labelName="Prompt"
                        type="text"
                        name="prompt"
                        placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe
                        handleSurpriseMe={handleSurpriseMe}
                    />

                    <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                        {form.photo ? (
                            <img
                                src={form.photo}
                                alt={form.prompt}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <img
                                src={preview}
                                alt="preview"
                                className="w-9/12 h-9/12 object-contain opacity-40"
                            />
                        )}
                        {form.photo && (
                            <button
                                type="button"
                                onClick={() =>
                                    downloadImage(form.prompt, form.photo)
                                }
                                className="outline-none bg-black border-none rounded-full absolute -right-7 bottom-0"
                            >
                                <img
                                    src={download}
                                    alt="download"
                                    className="w-6 h-6 object-contain invert"
                                />
                            </button>
                        )}

                        {generatingImg && (
                            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-5 flex gap-5">
                    <button
                        type="button"
                        onClick={generateImage}
                        className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        {generatingImg ? "Generating..." : "Generate"}
                    </button>
                </div>

                <div className="mt-10">
                    <p className="mt-2 text-[#666e75] text-[14px]">
                        ** Once you have created the image you want, you can
                        share it with others in the community **
                    </p>
                    <button
                        type="submit"
                        className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        {loading ? "Sharing..." : "Share with the Community"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default CreatePost;
