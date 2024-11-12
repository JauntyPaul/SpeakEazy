import React, { useState } from 'react';
import loginimage from "../assets/LoginImage.jpg"
import facebook from "../assets/facebook-removebg-preview.png"
import instagram from "../assets/instagram-removebg-preview.png"
import twitter from "../assets/twitter-removebg-preview.png"
import { useNavigate } from 'react-router-dom';

// Header component remains the same
const Header = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleContactClick = () => {
    window.open("https://www.linkedin.com/in/sam-thomas-6ab3a1227/", "_blank");
  };

  return (
    <header className="bg-[#ff735c] text-white py-4 px-12 flex justify-between items-center">
      <h1 className="text-4xl font-bold cursor-pointer" onClick={handleHomeClick}>
        <span className="text-white">Summ</span>
        <span className="text-gray-800">It</span>
      </h1>
      <nav>
        <a href="#" className="text-lg px-4 hover:text-gray-400" onClick={handleHomeClick}>Home</a>
        <a href="#" className="text-lg px-4 hover:text-gray-400" onClick={handleContactClick}>Contact</a>
      </nav>
    </header>
  );
};

// Login form component remains the same
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform any login logic here...

    // After successful login, navigate to the upload page
    navigate('/upload');
  };

  return (
    <div className="w-full max-w-xs p-8 ml-auto">
      <div className="mb-4">
        <h2 className="text-center text-2xl text-gray-800 font-regular">LOGIN</h2>
      </div>
      <div className="mb-6">
        <input 
          type="email" 
          className="w-full p-3 border border-gray-300" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      <div className="mb-6">
        <input 
          type="password" 
          className="w-full p-3 border border-gray-300" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <div className="mb-6 text-right">
        <a href="#" className="text-sm text-red-500 hover:text-gray-600 underline">Forgot your password?</a>
      </div>
      <button 
        className="w-full bg-gray-800 text-white p-3 hover:bg-red-600" 
        onClick={handleLogin}
        disabled={!email || !password} // Disable the button if email or password is empty
      >
        LOGIN
      </button>
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-600">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
    </div>
  );
};

// Footer component remains the same
const Footer = () => {
  return (
    <footer className="bg-gray-200 bottom-0 p-4 flex justify-center ">
      <a href="https://www.facebook.com/"><img src={facebook} alt="Facebook" className="mx-2 w-8 h-8" /></a>
      <a href="https://twitter.com/?lang=en"><img src={twitter} alt="Twitter" className="mx-2 w-8 h-8" /></a>
      <a href="https://www.instagram.com/"><img src={instagram} alt="Instagram" className="mx-2 w-8 h-8" /></a>
    </footer>
  );
};

// Main Page layout remains the same
const LoginPage = () => {
  return (
    <div className="font-sans h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-row pb-14 bg-white-300 justify-center items-center my-12 mx-auto px-4 max-w-6xl">
        <div className="flex-1">
          <img src={loginimage} alt="Speaker" className="w-full h-auto md:w-auto" />
        </div>
        <div className="flex-1">
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;