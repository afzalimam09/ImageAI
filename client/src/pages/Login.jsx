import React from "react";
import { useState } from "react";
import { FormField } from "../components";

const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const handleChange = () => {};
    return (
        <form className="mt-16 max-w-xl mx-auto">
            <h1 className="mb-10 text-2xl font-bold">Login</h1>
            <div className="flex flex-col gap-5">
                <FormField
                    labelName="Email"
                    type="email"
                    name="email"
                    placeholder="mail@gmail.com"
                    value={inputs.email}
                    handleChange={handleChange}
                />
                <FormField
                    labelName="Password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={inputs.password}
                    handleChange={handleChange}
                />
                <button className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
                    Login
                </button>
            </div>
        </form>
    );
};

export default Login;
