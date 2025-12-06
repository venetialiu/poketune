import { useState, useEffect } from 'react';
import './Navbar.css'

const Navbar = ({ onShowAbout }) => {

    return(
        <div className="navbar">
            <h2>PokeTune</h2>
            <button className="about" onClick={onShowAbout}>About</button>
        </div>
        
        
    )

}

export default Navbar;