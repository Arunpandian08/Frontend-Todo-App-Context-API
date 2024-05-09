import React from 'react';
import './Footer.css';

const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()
    return (
        <footer>
            <p className="text-center text-white"> &copy; {year} All Copyrights Reserved</p>
        </footer>
    );
};

export default Footer;