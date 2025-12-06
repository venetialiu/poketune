import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Navbar.css'

const Navbar = ({ onShowAbout }) => {
    const navigate = useNavigate();
    
    return(
        <div className="navbar">
            <button onClick={() => navigate('/show') }>PokeTune</button>
            <button className="about" onClick={onShowAbout}>About</button>
        </div>
        
        
    )

}

export default Navbar;