import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        "Content-Encoding": "application/json"
    }
});

export default api;