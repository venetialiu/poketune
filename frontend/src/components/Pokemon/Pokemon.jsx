import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Pokemon.css'

const Pokemon = () => {

    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState({
        name: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        sprite: "",
        type: ""
    });

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

                console.log(data.pokemon)

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


    return (
        <div>
            <h1 className="page-title">Your Pokémon</h1>

            <div>
                <div className={`tcg-card tcg-card-${pokemon.type}`}>

                    <div className="tcg-header">
                        <div className="tcg-name">
                            {pokemon.name}
                        </div>

                        <div className="tcg-hp">
                            HP {pokemon.hp}
                        </div>
                    </div>

                    <div className="tcg-image-wrapper">
                        <img src={pokemon.sprite} className="tcg-sprite" />
                    </div>

                    <div className="tcg-info">
                        <div className="tcg-stat-row">
                        <span>Attack</span>
                        <span>{pokemon.attack}</span>
                        </div>
                        <div className="tcg-stat-row">
                        <span>Defense</span>
                        <span>{pokemon.defense}</span>
                        </div>
                        <div className="tcg-stat-row">
                        <span>Speed</span>
                        <span>{pokemon.speed}</span>
                        </div>
                    </div>

                    <div className={`tcg-type-badge type-${pokemon.type}`}>
                        {pokemon.type}
                    </div>

                </div>
            </div>

        </div>
    );


}

export default Pokemon;