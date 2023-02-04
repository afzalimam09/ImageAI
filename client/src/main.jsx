import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AccountProvider from "./context/AccountProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AccountProvider>
        <App />
    </AccountProvider>
);
