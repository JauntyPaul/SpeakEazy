import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/assets/speakeasy.jpg';
import facebook from '../assets/assets/fb.jpeg';
import insta from '../assets/assets/insta.jpeg';
import twitter from '../assets/assets/twitter.jpeg';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="font-outfit min-h-screen flex flex-col bg-white">
      {/* Header Section */}
      <header className="bg-white px-12 py-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="text-4xl font-extrabold text-blue-900">
            Speak<span className="text-red-500">Easy</span>
          </div>
          <nav className="flex space-x-7">
            <a href="#" className="text-gray-800 hover:text-red-500">Home</a>
            <a href="#about" className="text-gray-800 hover:text-red-500">Assessment</a>
            <a href="#about" className="text-gray-800 hover:text-red-500">About</a>
            <a href="#contact" className="text-gray-800 hover:text-red-500">Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8 bg-white relative">
          <div className="text-left z-10">
            <h1 className="text-4xl font-extrabold mb-4 leading-tight text-blue-900">
              Guiding Young Voices Toward Confidence, One Word At A Time.
            </h1>
            <p className="mb-6 text-gray-700">
              Empowering children to overcome speech challenges through personalized, engaging support. Join us to help children find their voice and speak confidently.
            </p>
            <div className="flex gap-4">
              <button className="text-white bg-red-500 px-6 py-2 rounded-full font-semibold hover:bg-red-400">
                Create Free Account
              </button>
              <button
                className="text-blue-900 border border-blue-900 px-6 py-2 rounded-full font-semibold hover:border-blue-700 hover:text-blue-700"
                onClick={handleLoginClick}
              >
                Log In
              </button>
            </div>
          </div>
          <div className="relative">
            {/* Image with a fade-out effect on the left */}
            <img
              src={heroImage}
              alt="Child learning illustration"
              className="max-w-full h-auto rounded-lg"
              style={{ position: 'relative', zIndex: 1, maskImage: "linear-gradient(to left, black 70%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to left, black 70%, transparent 100%)", }}
            />
            <div
              className="max-w-full h-auto rounded-lg"
              style={{ maskImage: "linear-gradient(to left, black 70%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to left, black 70%, transparent 100%)", }}
            ></div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-blue-900 text-white">
          <div className="max-w-5xl mx-auto px-8 text-center">
            <h2 className="text-5xl font-bold mb-4">About Us</h2>
            <p className="text-lg leading-relaxed">
              We believe that every child deserves the confidence to express themselves clearly and without hesitation. Our mission is to provide an accessible, supportive tool that identifies early signs of speech impairment and guides children on their journey to stronger communication skills. Through innovative technology and expert-guided practices, we strive to empower families and educators to nurture each child’s unique voice, helping them thrive in every conversation and interaction.
            </p>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="contact" className="px-8 py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-blue-900">What Our Users Have To Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* First Testimonial */}
              <div className="bg-blue-900 text-white rounded-lg p-8 shadow-lg">
                <p className="italic mb-4">"This tool has been a game-changer for my child's confidence. It's so easy to use!"</p>
                <p className="font-bold">- Sam</p>
              </div>
              
              {/* Second Testimonial */}
              <div className="bg-red-500 text-white rounded-lg p-8 shadow-lg">
                <p className="italic mb-4">"As a speech therapist, this platform has been invaluable for effective and engaging support. It makes a real difference!"</p>
                <p className="font-bold">- Anpil, Speech Therapist</p>
              </div>

              {/* Third Testimonial */}
              <div className="bg-blue-900 text-white rounded-lg p-8 shadow-lg">
                <p className="italic mb-4">"I love how it tracks my progress! SpeakEasy makes me feel much more confident."</p>
                <p className="font-bold">- Shalini, age 9</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white text-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Social Media Column */}
          <div className="flex flex-col items-start">
            <h6 className="font-bold mb-6 text-blue-900">SpeakEasy</h6>
            <p className="mb-4">Social Media</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt="Facebook" className="w-6 h-6"/>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src={twitter} alt="Twitter" className="w-6 h-6"/>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={insta} alt="Instagram" className="w-6 h-6"/>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h6 className="font-bold mb-4">Quick Links</h6>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-red-500">Home</a></li>
              <li className="mb-2"><a href="#about" className="hover:text-red-500">Summary</a></li>
              <li className="mb-2"><a href="#about" className="hover:text-red-500">About Us</a></li>
              <li className="mb-2"><a href="#contact" className="hover:text-red-500">Contact</a></li>
            </ul>
          </div>

          {/* Contact Links Column */}
          <div>
            <h6 className="font-bold mb-4">Contact</h6>
            <ul>
              <li className="mb-2"><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">LinkedIn</a></li>
              <li className="mb-2"><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">Instagram</a></li>
              <li className="mb-2"><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">Facebook</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h6 className="font-bold mb-4">Stay Up to Date</h6>
            <form action="your_newsletter_subscription_endpoint" method="POST">
              <input type="email" placeholder="Enter your email" className="p-2 bg-gray-100 text-gray-800 mb-2 w-full rounded" required />
              <button type="submit" className="p-2 w-full bg-blue-900 hover:bg-blue-800 text-white rounded">Subscribe</button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
