// Spotify API Login Logic

import { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext';

const Auth = () => {
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(UserContext);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const error = params.get('error');

        if (error) {
            setHasError(true);
            console.log("Login error:", error);
            alert("Login failed.");
        } 
    }, [])

    const handleClick = async () => {
        
        // redirects user to backend /auth/login route
        try {
            window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;

        } catch(err){
            console.error("Login error: ", err);
        }

    }

    return(
        <>
            <h2>Hi! {hasError && "Login failed."} Please login{hasError && " again"} to Spotify{!hasError && " to find out what your pokemon is"}.</h2>
            <button onClick={handleClick}>Log In</button>
        </>
    )

}

export default Auth;