import axios from "axios";

const VERCELAPI = "https://api-services-delta.vercel.app/";

const LOCALHOST = "http://192.168.1.65:3000";

const api = axios.create({
    baseURL: VERCELAPI,
});

export default api;