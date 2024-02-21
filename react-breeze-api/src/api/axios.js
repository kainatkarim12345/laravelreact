import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-type": "application/json",
        'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
    },
});

export default instance;
