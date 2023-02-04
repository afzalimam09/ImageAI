import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormField } from "../components";
import { apiRequest } from "../requestMethods";

const Register = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (JSON.stringify(inputs) === "{}") {
            setErr("All Fields are required!");
            return;
        }
        setLoading(true);
        try {
            const res = await apiRequest.post("/auth/signup", inputs);
            navigate("/login");
        } catch (error) {
            setErr(error?.response?.data?.message);
        }
        setLoading(false);
    };

    return (
        <form className="mt-8 max-w-sm mx-auto">
            <h1 className="mb-10 text-2xl font-bold">Register</h1>
            <div className="flex flex-col gap-5">
                <FormField
                    labelName="Name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    handleChange={handleChange}
                />
                <FormField
                    labelName="Email"
                    type="email"
                    name="email"
                    placeholder="mail@gmail.com"
                    handleChange={handleChange}
                />
                <FormField
                    labelName="Password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    handleChange={handleChange}
                />
                <FormField
                    labelName="Password Confirm"
                    type="password"
                    name="passwordConfirm"
                    placeholder="Password Confirm"
                    handleChange={handleChange}
                />
                {err && <p className="text-red-600">{err}</p>}
                {!loading ? (
                    <button
                        onClick={handleRegister}
                        className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
                    >
                        Register
                    </button>
                ) : (
                    <button className="font-inter font-medium bg-[#707070] text-white px-4 py-2 rounded-md cursor-default">
                        Please Wait...
                    </button>
                )}

                <p>
                    Already have an account:{" "}
                    <Link className="text-[#6469ff]" to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default Register;
