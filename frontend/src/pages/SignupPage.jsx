import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { useAuth } from '../context/AuthContext';
import { signup } from '../services/auth.service';

const SignupPage = () => {
    const [name, setName]= useState(null);
    const [password, setPassword]= useState(null);
    const [email, setEmail]= useState(null);
    const [error, setError]= useState(null);
    const [loading, setLoading]= useState(false);

    const {setUser, setToken}= useAuth();
    const navigate= useNavigate();

    const handleSubmit= async (e) =>{
        e.preventDefault();
        setLoading(true);
        setError("");

        try{
        const response= await signup({name, email, password});
        setUser(response.data.user);
        setToken(response.data.token);

        navigate("/todos");
    }catch{
        setError(error.response?.data?.message || "Signup failed");
    }finally{
        setLoading(false);
    }
    }

  return (
    <div>
        <h1>SignUp</h1>
        {error && <p>{error}</p>}

        <div>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder='Name'
                value={name}
                onChange={(e)=> setName(e.target.value)} />

                <input 
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e)=> setEmail(e.target.value)} />

                <input type="password"
                placeholder='Password'
                value={password}
                onChange={(e)=> setPassword(e.target.value)} />

                <button 
                type='submit'
                disabled={loading}>
                    {loading? "Signuping..." : "Signup"}
                </button>
            </form>

            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
        </div>
    </div>
  )
}

export default SignupPage