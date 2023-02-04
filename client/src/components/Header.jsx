import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { AccountContext } from "../context/AccountProvider";
import { apiRequest } from "../requestMethods";

const Header = () => {
    const { account, setAccount } = useContext(AccountContext);

    const handleLogout = async () => {
        try {
            const res = await apiRequest.get("/auth/logout");
            setAccount(null);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
            <Link to="/">
                <img src={logo} alt="logo" className="w-28 object-contain" />
            </Link>
            {account ? (
                <div className="flex items-center gap-2">
                    <Link
                        to="/create-post"
                        className="font-inter font-medium bg-[#6469ff] hover:bg-[#787dfd] text-white px-4 py-2 rounded-md"
                    >
                        Create
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="font-inter font-medium bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <Link
                        to="/login"
                        className="font-inter font-medium bg-[#6469ff] hover:bg-[#787dfd] text-white px-4 py-2 rounded-md"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="font-inter font-medium bg-[#6469ff] hover:bg-[#787dfd] text-white px-4 py-2 rounded-md"
                    >
                        Signup
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;
