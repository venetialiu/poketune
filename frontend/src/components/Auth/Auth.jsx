import { useState, useEffect } from 'react';

const Auth = () => {
    
    const handleClick = () => {
        // Spotify API Login Logic

        // redirects user to backend /auth/login route
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;
    }

    return(
        <>
            <h2>Hi! Please login to Spotify to find out what your pokemon is.</h2>
            <button onClick={handleClick}>Log In</button>
        </>
    )

}

export default Auth;