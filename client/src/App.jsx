import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { AccountContext } from "./context/AccountProvider";
import { CreatePost, Home, Login, Register } from "./pages";

const App = () => {
    const { account } = useContext(AccountContext);
    return (
        <BrowserRouter>
            <Header />
            <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/login"
                        element={account ? <Navigate to="/" /> : <Login />}
                    />
                    <Route
                        path="/register"
                        element={account ? <Navigate to="/" /> : <Register />}
                    />
                    <Route
                        path="/create-post"
                        element={
                            !account ? <Navigate to="/login" /> : <CreatePost />
                        }
                    />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default App;
