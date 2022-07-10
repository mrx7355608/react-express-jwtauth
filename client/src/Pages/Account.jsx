import React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import { getToken, setToken } from "../tokens";
import { useJwt } from "react-jwt";
import { useEffect } from "react";

export default function Account() {
    const accessToken = getToken();
    const { isExpired } = useJwt(accessToken);
    const { setUser, user } = React.useContext(UserContext);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8000/user", {
            method: "GET",
            mode: "cors",
            headers: { authorization: `Bearer ${getToken()}` },
            credentials: "include",
        }).then(async (resp) => {
            if (resp.status.toString().startsWith("4")) return navigate("/");
            const { data } = await resp.json();
            setUser(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <h3>Loading...</h3>;

    return (
        <>
            <h3>{user.name}</h3>
            <h3>{user.email}</h3>
        </>
    );
}
