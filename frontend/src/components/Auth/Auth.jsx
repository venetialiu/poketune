// Spotify API Login Logic

import { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext';

const Auth = () => {
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(UserContext);

    
    const handleClick = async () => {
        
        // redirects user to backend /auth/login route
        try {
            window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;
            // navigate('/show');

        } catch(err){
            console.error("Login error: ", err);
        }

    }

    return(
        <>
            <h2>Hi! Please login to Spotify to find out what your pokemon is.</h2>
            <button onClick={handleClick}>Log In</button>
        </>
    )

}

export default Auth;