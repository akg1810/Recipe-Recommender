import { Link } from "react-router-dom";
import React from "react";
const Footer = () => {
    return (
        <footer className="footer plus-jakarta-sans-font flex">
            <div className="footer-up flex">
                <div className="footer-about flex">
                    <h2 style={{fontSize:'32px'}}>About EatEasy</h2>
                    <p style={{wordSpacing:'3px'}}>Simplifying your cooking experience by turning your ingredients into delightful meals.
                    Join us to explore easy and delicious recipes!</p>
                </div>
                <div className="footer-links flex">
                    <h2 style={{fontSize:'32px'}}>Quick Links</h2>
                    <ul>
                        <li style={{marginBottom:'20px'}}><a href="#home">Home</a></li>
                        <li style={{marginBottom:'20px'}}><a href="#about">About</a></li>
                        <li style={{marginBottom:'20px'}}><Link to="/auth">Login</Link></li>
                    </ul>
                </div>
                <div className="footer-contact flex">
                    <h2 style={{fontSize:'32px'}}>Contact info</h2>
                    <p>Email: support@eateasy.com</p>
                    <p>Phone: +123 456 7890</p>
                </div>
            </div>
            <div className="footer-down">
            <p>&copy; 2024 GMO R&AI. All rights reserved.</p>
            </div>
        </footer>
    )
};
export default Footer;