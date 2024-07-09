import axios from "axios";
import Swal_show from "components/Swal";

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const handleApiError = (error) => {
    console.error('API Error:', error);

    if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
    } else if (error.request) {
        console.error('No response received:', error.request);
    } else {
        console.error('Error setting up the request:', error.message);
    }

    Swal_show('error', 'Something went wrong');
};

const deleteRequest = async (url, successCallback) => {
    try {
        const response = await api.delete(url);
        if (response.data.status === 'success') {
            if (successCallback) {
                successCallback(response.data);
            }
        } else {
            Swal_show('error', response.data.message);
        }
    } catch (error) {
        handleApiError(error);
    }
};

export default deleteRequest;
