import { createContext, useContext, useEffect, useState} from 'react';
import {logout as logoutService} from "../services/auth.service";

//Create CONTEXT
const AuthContext= createContext(null);

//AUTH PROVIDER
//WRAP the entire app so all the components can access auth state
export const AuthProvider= ({children})=>{
    const [user, setUser]= useState(null);
    const [token, setToken]= useState(null);
    
    //checks if the token exist in localStorage when app loads
    useEffect(()=>{
        const storedToken= localStorage.setItem("token");
        if(storedToken){
            setToken(storedToken); //restored token from the localStorage
        } 
    },[]);

    //is user logged in?
    const isAuthenticated= token !== null;

    //logout function
    const logout= ()=>{
        logoutService();
        setUser();
        setToken();
    };

    return (
        <AuthContext.Provider value= {{user, setUser, token, setToken, isAuthenticated, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

//CUSTOM HOOK
//easy way to acces auth context in any component
export const useAuth= ()=>{
    const context= useContext(AuthContext);
    if(!context){
        throw new error("useAuth must be used inside AuthProvider")
    }
    return context;
}