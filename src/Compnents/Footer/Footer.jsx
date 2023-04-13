import React from 'react'
import { NavLink } from 'react-router-dom'
import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-heading"><h2>Jeez</h2></div>
            <div className="footer-links">
                <NavLink target="_blank" to="https://instagram.com" ><FontAwesomeIcon className='icon' icon={faInstagram} />Instagram</NavLink>
                <NavLink target="_blank" to="https://instagram.com"><FontAwesomeIcon className='icon' icon={faTwitter} />Twitter</NavLink>
            </div>
        </div>
    )
}

export default Footer