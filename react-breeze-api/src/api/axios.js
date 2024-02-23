import axios from "axios";

const token = localStorage.getItem('token');

const instance = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
    maxRedirects: 5,
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`, 
        'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
    },
});

export default instance;
