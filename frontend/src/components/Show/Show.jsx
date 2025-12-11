import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Show.css'


const Show = () => {
    // shape of userdata TBD
    const [userData, setUserData] = useState([]);
    const [userGenres, setUserGenres] = useState([]);
    const navigate = useNavigate();

    // fetch user data on mount
    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/me/genres`, {
                    method: 'GET',
                    // send cookies to backend
                    credentials: "include", 
                });
                
                const data = await res.json();

                if (data.ok) {
                    // shape of userdata TBD
                    // setUserData(data);
                    setUserGenres(data.genres)
                    console.log("User data successfully fetched.")
                }

            } catch (error) {
                console.error('User data fetch error:', error);
            } 
        }

        fetchUserData();
        
    }, [])

    const handleClick = () => {
        navigate('/pokemon');
    }

    return(
        <div>
            <h1>Open Your Pokeball!</h1>
            <button 
                onClick={handleClick}
                className="pokeball-btn"
            >
                <img src='./pokeball.svg' alt="pokeball" className="pokeball-img"/>
            </button>
        </div>
        
    )

}

export default Show;