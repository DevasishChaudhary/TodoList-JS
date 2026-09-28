import axiosInstance from './axios.config';

//SIGNUP
//sends signup data to backnd
//stores token in localSToarge on success
export const signup= async (data)=>{
    const response= await axiosInstance.post("/auth/signup", data);

    if (response.data.data.token) {
        localStorage.setItem("token", response.data.data.token); //store token
    }
    return response.data;
};

//LOGIN
//sends logic data to backend
//stores token in localStoarge on success
export const login= async (data)=>{
    const response= await axiosInstance.post("/auth/login", data);

    if(response.data.data.token){
        localStorage.setItem("token", response.data.data.token); //store token
    }
    return response.data;
};

//LOGOUT
//removes token from localStorage
export const logout= ()=>{
    localStorage.removeItem("token"); //remove token
}