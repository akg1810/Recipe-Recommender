import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
import video from "../assets/video (1).mp4";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/about-removebg-preview.png";
import Footer from "../components/Footer";

const LandingPage = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  const handleIngredientsClick = () => {
    if (localStorage.getItem("token")) {
      navigate("/recommend");
    } else {
      navigate("/auth?mode=register");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const tokenjwt = localStorage.getItem("token");
    setIsAuthenticated(!!tokenjwt);
  }, []);

  return (
    <>
      <nav>
        <div className="navbar flex plus-jakarta-sans-font">
          <h2>EatEasy</h2>
          <div className="navlinks">
            <ul className="flex">
              <li style={{ alignContent: "center" }}>
                <a href="#home">Home</a>
              </li>
              <li style={{ alignContent: "center" }}>
                <a href="#aboutus">About Us</a>
              </li>
              <li>
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="logout-button plus-jakarta-sans-font"
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/auth?mode=login">Login</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="landingPage flex">
        <section id="home">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="video-background"
          >
            <source src={video} type="video/mp4" />
          </video>
          <div className="home-content flex plus-jakarta-sans-font">
            <h1 style={{ textAlign: "center" }}>
              Your Ingredients
              <br />
              Our Recipes!
            </h1>
            <h3>Search Recipes</h3>
            <button
              className="cta-button plus-jakarta-sans-font"
              onClick={handleIngredientsClick}
            >
              By Ingredients
            </button>
          </div>
        </section>
        <section id="aboutus">
          <div className="aboutus-content flex">
            <div className="aboutus-img">
              <img src={img1} alt="photo" />
            </div>
            <div className="aboutus-info flex plus-jakarta-sans-font">
              <h1 style={{ fontSize: "80px", color: "#6e5851" }}>About Us</h1>
              <p style={{ fontSize: "20px", wordSpacing: "5px" }}>
                Welcome to <strong>EatEasy</strong>, your personal culinary
                assistant! Simply input your ingredients, and unlock a world of
                delicious possibilities with recipes to save you time, reduce
                food waste, and spark creativity. Whether you're a seasoned chef
                or a kitchen novice, EatEasy is here to elevate your cooking
                experience, bringing innovation and joy to your table. <br />
                Discover new tastes, redefine convenience, and make every meal
                an adventure—all at the touch of a button. Join us and
                revolutionize how you cook at home!
              </p>
            </div>
          </div>
          <div className="aboutus-stats flex plus-jakarta-sans-font">
            <div className="item">
              10+ <br /> cuisines
            </div>
            <div className="divider"></div>
            <div className="item">
              150+ <br />
              ingredients
            </div>
            <div className="divider"></div>
            <div className="item">
              5500+ <br />
              recipes
            </div>
          </div>
        </section>
        <Footer/>
      </div>
      
    </>
  );
};

export default LandingPage;
