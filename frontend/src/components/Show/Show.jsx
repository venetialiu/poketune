import { useState, useEffect } from 'react';

const Show = () => {
    // shape of userdata TBD
    const [userData, setUserData] = useState([]);
    const [userGenres, setUserGenres] = useState([]);

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

    return(
        <div>
            <h1>Your Pokemon</h1>
            {/*Replace later*/}
            <pre>{JSON.stringify(userGenres, null, 2)}</pre>
        </div>
        
    )

}

export default Show;