import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Pokemon = () => {

    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState([]);

    // fetch user data on mount
    useEffect(() => {
        const fetchPokemonData = async () => {
            try{ 
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pokemon`, {
                    method: 'GET',
                    // send cookies to backend
                    credentials: "include"
                });

                const data = await res.json();

                if (data.ok) {
                    setPokemon(data.pokemon)
                    console.log("Pokemon data successfully fetched.")
                }

            } catch (error) {
                console.error('Pokemon data fetch error:', error);
            } 
        }

        fetchPokemonData();

    }, []);


    return(
        <div>
            <h1>Your Pokemon</h1>
            <h3>{pokemon.name}</h3>
            <h4>{pokemon.type}</h4>
            <img src={pokemon.sprite}></img>
        </div>
        
    )

}

export default Pokemon;