import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormField } from "../components";
import { apiRequest } from "../requestMethods";
import { AccountContext } from "../context/AccountProvider";

const Login = () => {
    const { setAccount } = useContext(AccountContext);
    const navigate = useNavigate();
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password) {
            setErr("All Fields are required!");
            return;
        }
        setLoading(true);
        try {
            const res = await apiRequest.post("/auth/signin", inputs);
            setAccount(res?.data?.data);
            navigate("/");
        } catch (error) {
            setErr(error?.response?.data?.message);
        }
        setLoading(false);
    };

    return (
        <form className="mt-8 max-w-sm mx-auto">
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
                {err && <p className="text-red-600">{err}</p>}
                {!loading ? (
                    <button
                        onClick={handleLogin}
                        className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
                    >
                        Login
                    </button>
                ) : (
                    <button className="font-inter font-medium bg-[#707070] text-white px-4 py-2 rounded-md cursor-default">
                        Please Wait...
                    </button>
                )}
                <p>
                    Don't have an account:{" "}
                    <Link className="text-[#6469ff]" to="/register">
                        Register
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default Login;
