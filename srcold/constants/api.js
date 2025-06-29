import axios from "axios";


const VERCELAPI = "https://powertech-api.vercel.app/";
// https://powertech-api.vercel.app/users/register
const LOCALHOST = "http://192.168.1.65:3000";

const api = axios.create({
    baseURL: VERCELAPI,
});

export default api;