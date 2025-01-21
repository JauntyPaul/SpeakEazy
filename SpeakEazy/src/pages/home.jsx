import React from 'react';
import { useNavigate } from 'react-router-dom';
import summit1 from '../assets/summit1.jpg'; // Ensure the image path is correct
import bgimage from '../assets/bg.png';
import facebook from '../assets/fb.jpeg';
import insta from '../assets/insta.jpeg';
import twitter from '../assets/twitter.jpeg';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="font-outfit min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="bg-white px-12 py-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="text-4xl font-extrabold">
            <span className="text-gray-900">Summ</span>
            <span className="text-[#ff735c]">It</span>
          </div>
          <nav className="flex space-x-7">
            <a href="#" className="text-grey hover:text-red-600">Home</a>
            <a href="#about" className="text-grey hover:text-red-600">About</a>
            <a href="#contact" className="text-grey hover:text-red-600">Contact</a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="text-gray-900 bg-white">
          <div className="max-w-7xl mx-auto py-20 px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl font-extrabold mb-4 leading-tight text-left">Unlock The Power Of Productive Meetings With Effortless Summarization</h1>
              <p className="mb-6 text-left">Revolutionize your meetings with our app – effortlessly generating concise transcripts and summaries, empowering teams to communicate and achieve success seamlessly.</p>
              <div className="flex gap-4">
                <button className="text-gray-800 border border-gray-800 px-6 py-2 rounded-full font-semibold hover:border-gray-500 hover:text-gray-500">CREATE FREE ACCOUNT</button>
                <button 
                  className="text-[#ff735c] border border-[#ff735c] px-6 py-2 rounded-full font-semibold hover:border-red-600 hover:text-red-600"
                  onClick={handleLoginClick}
                >
                  LOG IN
                </button>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center md:block"> {/* Image section */}
              <img src={summit1} alt="Meeting Illustration" className="max-w-full h-auto rounded-lg"/>
            </div>
          </div>
        </section>       

        {/* About Section */}
        <section id="about" className="bg-[#ff735c]">
          <div className="max-w-7xl mx-auto py-20 px-8">
            <h2 className="text-5xl font-bold text-center text-gray-900 mb-8">About Us</h2>
            <p className="text-xl text-gray-900 text-center mx-auto leading-relaxed max-w-3xl">"At SummIt, we're reshaping the landscape of meetings. With our cutting-edge web app, we've engineered a revolutionary approach to meeting summarization that goes beyond mere transcription. Our powerful technology not only identifies speakers but distills their discussions into comprehensive summaries, offering unparalleled clarity and insight. Say goodbye to time-consuming note-taking and hello to streamlined productivity. Join us on our journey to revolutionize how meetings are conducted and decisions are made. Together, let's unlock the full potential of collaboration with SummIt."</p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="px-8 py-20 bg-[#ff735c]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-12">What Our Users Have To Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* First Testimonial */}
              <div className="bg-gray-100 rounded-lg p-8 shadow-lg">
                <p className="text-gray-900 italic mb-4">"This app has transformed how we approach meetings! The ability to effortlessly generate transcripts and summaries has saved us valuable time and improved collaboration within our team."</p>
                <p className="text-gray-800 font-bold">-Sam</p>
              </div>
              
              {/* Second Testimonial */}
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <p className="text-gray-900 italic mb-4">"I love how intuitive and user-friendly this app is. It's made capturing meeting highlights and action items a breeze, keeping everyone on the same page and driving productivity."</p>
                <p className="text-gray-800 font-bold">-Anpil</p>
              </div>

              {/* Third Testimonial */}
              <div className="bg-gray-100 rounded-lg p-8 shadow-lg">
                <p className="text-gray-900 italic mb-4">"The meeting summaries generated by this app are incredibly insightful and concise. They've helped us stay focused on key takeaways and follow-up actions, leading to more effective decision-making."</p>
                <p className="text-gray-800 font-bold">-Shalini</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white text-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Social Media Column */}
          <div className="flex flex-col items-start">
            <h6 className="font-bold mb-6 align-center">SummIt</h6>
            <p className="mb-4">SOCIAL MEDIA</p>
            <div className="flex space-x-4 items-center">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt="Facebook" className='w-6 h-6'/>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src={twitter} alt="Twitter" className='w-6 h-6'/>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={insta} alt="Instagram" className='w-6 h-6'/>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h6 className="font-bold mb-4">SummIt</h6>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-gray-300">Home</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-300">About us</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-300">Get Started</a></li>
            </ul>
          </div>

          {/* Contact Links Column */}
          <div>
            <h6 className="font-bold mb-4">Contact</h6>
            <ul>
              <li className="mb-2"><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">LinkedIn</a></li>
              <li className="mb-2"><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Instagram</a></li>
              <li className="mb-2"><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Facebook</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h6 className="font-bold mb-4">STAY UP TO DATE</h6>
            <form action="your_newsletter_subscription_endpoint" method="POST">
              <input type="email" placeholder="Enter your email" className="p-2 bg-gray-100 text-gray-700 mb-2" required/>
              <button type="submit" className="p-2 bg-red-500 hover:bg-red-700 text-white">Submit</button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
