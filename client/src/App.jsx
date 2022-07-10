import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Account from "./Pages/Account";

import { UserContext } from "./Contexts/UserContext";
import { useState, useEffect } from "react";
import { setToken } from "./tokens";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("http://localhost:8000/refresh-token", {
            method: "POST",
            mode: "cors",
            credentials: "include",
        }).then(async (resp) => {
            if (resp.status === 200) {
                const { accessToken } = await resp.json();
                setToken(accessToken);
            }
            setLoading(false);
        });
    }, []);
    if (loading) return <h3>Loading...</h3>;
    return (
        <Router>
            <h3>React-Express-Jwt-Auth</h3>
            <nav>
                <p>
                    <Link to="login">Login</Link>
                </p>
                <p>
                    <Link to="signup">Signup</Link>
                </p>
                <p>
                    <Link to="/">Home</Link>
                </p>
                <p>
                    <Link to="account">Account</Link>
                </p>
            </nav>
            <UserContext.Provider value={{ user, setUser }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="account" element={<Account />} />
                </Routes>
            </UserContext.Provider>
        </Router>
    );
}

export default App;
