import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api', // Set your Laravel API base URL here
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercept request to add the authorization token if present
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
