import { useState, useEffect } from 'react';
import './About.css'

const About = ({onClose}) => {

    return(
        <div className="modal-overlay">
            <div className="modal">
                <h2>About PokeTune</h2>
                <p>This app matches you with a Pokémon based on your Spotify tastes.</p>
                <button onClick={onClose}>close</button>
            </div>
        </div>
        
    )

}

export default About;