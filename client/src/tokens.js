let token = "";

const getToken = () => {
    return token;
};
const setToken = (accessToken) => {
    token = accessToken;
};
export { setToken, getToken };
