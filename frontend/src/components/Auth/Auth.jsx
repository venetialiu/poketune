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
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
            })
            
            const data = await res.json();

            if (! data.ok) {
                console.error("Login failed: ", data.error);
            }

            const { user, token } = data;

            setCurrentUser(user);
            
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem("authToken", token);


        } catch(err){
            console.error("Login error: ", err);
        }

        navigate('/show')

    }

    return(
        <>
            <h2>Hi! Please login to Spotify to find out what your pokemon is.</h2>
            <button onClick={handleClick}>Log In</button>
        </>
    )

}

export default Auth;