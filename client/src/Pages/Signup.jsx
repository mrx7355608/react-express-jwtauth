import React from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../tokens";

export default function Signup() {
    const navigate = useNavigate();
    const [signupData, setSignupData] = React.useState({
        name: "",
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSignupData({ ...signupData, [name]: value });
    };
    const signup = () => {
        fetch("http://localhost:8000/signup", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(signupData),
        }).then(async (resp) => {
            if (resp.status === 201) {
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
                name="name"
                type="text"
                placeholder="Enter name"
            />
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
            <button onClick={signup} type="button">
                Signup
            </button>
        </>
    );
}
