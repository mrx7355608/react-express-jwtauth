import React from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../tokens";

export default function Login() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = React.useState({
        name: "",
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLoginData({ ...loginData, [name]: value });
    };
    React.useEffect(() => {
        console.log("checking if token has expired or not");
    }, []);
    const login = () => {
        fetch("http://localhost:8000/login", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(loginData),
        }).then(async (resp) => {
            if (resp.status === 200) {
                const { accessToken } = await resp.json();
                setToken(accessToken);
                navigate("/account");
            }
        });
    };
    return (
        <>
            <input
                onChange={(e) => handleChange(e)}
                name="email"
                type="email"
                placeholder="Enter email"
            />
            <input
                onChange={(e) => handleChange(e)}
                name="password"
                type="password"
                placeholder="Enter password"
            />
            <button onClick={login} type="button">
                Login
            </button>
        </>
    );
}
