import React from "react";
import loginimage from "../assets/assets/speakeasy2.jpg";
import facebook from "../assets/assets/facebook-removebg-preview.png";
import instagram from "../assets/assets/instagram-removebg-preview.png";
import twitter from "../assets/assets/twitter-removebg-preview.png";
import google from "../assets/assets/Google_logo.png";
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../firebaseConfig";

const Header = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleContactClick = () => {
    window.open("https://www.linkedin.com/in/sam-thomas-6ab3a1227/", "_blank");
  };

  return (
    <header className="bg-blue-900 text-white py-4 w-full">
      <div className=" max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold cursor-pointer" onClick={handleHomeClick}>
          <span className="text-white">Speak</span>
          <span className="text-red-500">Easy</span>
        </h1>
        <nav>
          <a href="#" className="text-lg px-4 hover:text-gray-400" onClick={handleHomeClick}>Home</a>
          <a href="#" className="text-lg px-4 hover:text-gray-400" onClick={handleContactClick}>Contact</a>
        </nav>
      </div>
    </header>
  );
};

const LoginForm = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      console.log("Google ID Token:", idToken);
      console.log("User ID:", result.user.uid);
      localStorage.setItem("token", idToken);
      localStorage.setItem("user_id", result.user.uid);
      navigate("/upload");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="w-full max-w-xs p-8 ml-auto">
      <div className="mb-4">
        <h2 className="text-center text-2xl text-gray-800 font-regular">LOGIN</h2>
      </div>
      <button
        className="w-full bg-blue-900 text-white p-3 hover:bg-red-600 flex justify-center items-center"
        onClick={handleGoogleSignIn}
      >
        <img src={google} alt="Google" className="mx-2 w-8 h-8" />
        Sign in with Google
      </button>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-200 p-4 w-full">
      <div className="max-w-6xl mx-auto flex justify-center">
        <a href="https://www.facebook.com/"><img src={facebook} alt="Facebook" className="mx-2 w-8 h-8" /></a>
        <a href="https://twitter.com/?lang=en"><img src={twitter} alt="Twitter" className="mx-2 w-8 h-8" /></a>
        <a href="https://www.instagram.com/"><img src={instagram} alt="Instagram" className="mx-2 w-8 h-8" /></a>
      </div>
    </footer>
  );
};

const LoginPage = () => {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-row pb-14 bg-white w-full justify-center items-center my-12">
        <div className="max-w-6xl mx-auto flex flex-1 flex-col md:flex-row">
          <div className="flex-1">
            <img
              src={loginimage}
              alt="Speaker"
              className="w-full h-auto md:w-auto"
              style={{
                position: 'relative',
                zIndex: 1,
                maskImage: "linear-gradient(to right, black 70%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, black 70%, transparent 100%)",
              }}
            />
          </div>
          <div className="flex-1">
            <LoginForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;