import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8003/api/',
});

export default axiosInstance;