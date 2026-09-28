import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service';

const LoginPage = () => {
    const [password, setPassword]= useState(null);
    const [email, setEmail]= useState(null);
    const [error, setError]= useState(null);
    const [loading, setLoading]= useState(false);

    const {setUser, setToken}= useAuth();
    const navigate= useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response= await login({email, password});
            setUser(response.data.user);
            setToken(response.data.token);

            navigate("/todos");
        } catch (error) {
            setError(error.response?.data?.message || "Login Failed");
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
                    {loading? "Logining..." : "Login"}
                </button>
            </form>

            <p>Dont have an account?</p>
            <Link to="/Signup">Signup</Link>
        </div>
    </div>
  )
}

export default LoginPage