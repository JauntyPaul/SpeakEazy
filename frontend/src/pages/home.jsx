import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import heroImage from '../assets/assets/speakeasy.jpg';
import facebook from '../assets/assets/fb.jpeg';
import insta from '../assets/assets/insta.jpeg';
import twitter from '../assets/assets/twitter.jpeg';

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate(isLoggedIn ? '/tracking' : '/login');
  };

  const handleUploadClick = () => {
    navigate(isLoggedIn ? '/upload' : '/login');
  };

  return (
    <div className="font-outfit min-h-screen flex flex-col bg-white">
      {/* Header Section */}
      <header className="bg-white justify-between items-center fixed top-0 left-0 w-screen px-9 z-30">
        <div className="px-12 py-6 max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="text-4xl font-extrabold text-blue-900">
            Speak<span className="text-red-500">Easy</span>
          </div>
          <nav className="flex space-x-8">
            <a href="#" className="text-gray-800 hover:text-red-500 text-lg">Home</a>
            <a href="#about" className="text-gray-800 hover:text-red-500 text-lg">About</a>
            <a href="#contact" className="text-gray-800 hover:text-red-500 text-lg">Contact</a>
            <button
              onClick={handleUploadClick}
              className="text-gray-800 hover:text-red-500 text-lg"
            >
              Upload
            </button>
            <button
              onClick={handleProfileClick}
              className="text-gray-800 hover:text-red-500 text-lg"
            >
              Profile
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full py-10">
        {/* Hero Section */}
        <section className="py-16 px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-12 w-full max-w-7xl mx-auto">
          <div className="text-left">
            <h1 className="text-5xl font-extrabold mb-6 leading-tight text-blue-900">
              Guiding Young Voices Toward Confidence, One Word At A Time.
            </h1>
            <p className="mb-8 text-gray-700 text-lg">
              Empowering children to overcome speech challenges through personalized, engaging support. Join us to help children find their voice and speak confidently.
            </p>
            <div className="flex gap-6">
              <button className="text-white bg-red-500 px-8 py-3 rounded-full font-semibold hover:bg-red-400 text-lg" onClick={handleLoginClick}>
                Create Free Account
              </button>
              <button
                className="text-blue-900 border border-blue-900 px-8 py-3 rounded-full font-semibold hover:border-blue-700 hover:text-blue-700 text-lg"
                onClick={handleLoginClick}
              >
                Log In
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Child learning illustration"
              className="w-full h-auto rounded-lg object-cover transform translate-x-8"
              style={{
                maskImage: "linear-gradient(to left, black 70%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to left, black 70%, transparent 100%)",
              }}
            />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-blue-900 text-white w-full">
          <div className="max-w-5xl mx-auto px-8 text-center">
            <h2 className="text-6xl font-bold mb-6">About Us</h2>
            <p className="text-xl leading-relaxed">
              We believe that every child deserves the confidence to express themselves clearly and without hesitation. Our mission is to provide an accessible, supportive tool that identifies early signs of speech impairment and guides children on their journey to stronger communication skills. Through innovative technology and expert-guided practices, we strive to empower families and educators to nurture each child’s unique voice, helping them thrive in every conversation and interaction.
            </p>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="contact" className="px-8 py-24 bg-gray-100 w-full">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-blue-900">What Our Users Have To Say</h2>
            </div>
            <div className="grid grid-cols-1 md-grid-cols-3 gap-12">
              <div className="bg-blue-900 text-white rounded-lg p-8 shadow-lg">
                <p className="italic mb-4 text-lg">"This tool has been a game-changer for my child's confidence. It's so easy to use!"</p>
                <p className="font-bold text-lg">- Sam</p>
              </div>
              <div className="bg-red-500 text-white rounded-lg p-8 shadow-lg">
                <p className="italic mb-4 text-lg">"As a speech therapist, this platform has been invaluable for effective and engaging support. It makes a real difference!"</p>
                <p className="font-bold text-lg">- Anpil, Speech Therapist</p>
              </div>
              <div className="bg-blue-900 text-white rounded-lg p-8 shadow-lg">
                <p className="italic mb-4 text-lg">"I love how it tracks my progress! SpeakEasy makes me feel much more confident."</p>
                <p className="font-bold text-lg">- Shalini, age 9</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white text-gray-700 py-16 w-full">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col items-start">
            <h6 className="font-bold mb-6 text-blue-900 text-xl">SpeakEasy</h6>
            <p className="mb-4 text-lg">Social Media</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt="Facebook" className="w-8 h-8"/>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src={twitter} alt="Twitter" className="w-8 h-8"/>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={insta} alt="Instagram" className="w-8 h-8"/>
              </a>
            </div>
          </div>
          <div>
            <h6 className="font-bold mb-4 text-lg">Quick Links</h6>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-red-500 text-lg">Home</a></li>
              <li className="mb-2"><a href="#about" className="hover:text-red-500 text-lg">Summary</a></li>
              <li className="mb-2"><a href="#about" className="hover:text-red-500 text-lg">About Us</a></li>
              <li className="mb-2"><a href="#contact" className="hover:text-red-500 text-lg">Contact</a></li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold mb-4 text-lg">Contact</h6>
            <ul>
              <li className="mb-2"><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 text-lg">LinkedIn</a></li>
              <li className="mb-2"><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 text-lg">Instagram</a></li>
              <li className="mb-2"><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 text-lg">Facebook</a></li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold mb-4 text-lg">Stay Up to Date</h6>
            <form action="your_newsletter_subscription_endpoint" method="POST">
              <input type="email" placeholder="Enter your email" className="p-3 bg-gray-100 text-gray-800 mb-2 w-full rounded text-lg" required />
              <button type="submit" className="p-3 w-full bg-blue-900 hover:bg-blue-800 text-white rounded text-lg">Subscribe</button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;