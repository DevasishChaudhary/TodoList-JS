import axios from "axios";

//BASE URL CINFIGURATION
//all API requests start with this YRL
const axiosInstance= axios.create({
    baseURL: import.meta.env.VITE_API_URL, //reads from .env file
});

//REQUEST INTERCEPTOR
//runs before EVERY request
//automatically attaches token to every request
axiosInstance.interceptors.request.use((config)=>{
    const token= logalStorage.getItem("token"); //get token from storage

    if (token){
        config.headers.Authorization= `Bearer ${token}`; // attach token
    }
    return config;
});

export default axiosInstance;