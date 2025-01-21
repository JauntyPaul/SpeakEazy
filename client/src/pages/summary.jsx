import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/SummIt-logo.png'; // Replace with the actual logo path
import illustration from '../assets/summaryimage.png'; // Replace with the actual illustration path
import facebook from '.././assets/fb.jpeg';
import insta from '.././assets/insta.jpeg';
import twitter from '.././assets/twitter.jpeg';

const SummaryPage = () => {
  const [summary, setSummary] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/summary');
      const data = await response.json(); // Parse the JSON response
      setSummary(data.summary); // Update the state with the extracted summary text
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  const handleLogoutClick = () => {
    navigate('/login');
  };

  const handleFooterLinkClick = (url) => {
    window.open(url, "_blank");
  };

  const handleUploadNextFileClick = () => {
    navigate('/upload');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-outfit">
      <Header handleLogoutClick={handleLogoutClick} />
      <main className="p-4 pb-0">
        <div className="flex-1 lg:mr-12 w-50 text-left">
          <h2 className="text-[#ff735c] font-regular text-lg mb-2">SummIt/Summary</h2>
          <p className="text-gray-700 mb-8">
            The 'summary' page offers a concise overview of the previously generated transcript, distilling key points and highlights for quick reference. By condensing the content into digestible segments, it facilitates efficient comprehension and decision-making for stakeholders. Users can swiftly grasp the essence of the discussion, aiding in strategic planning and follow-up actions.
          </p>
        </div>
      </main>
      <div className="flex-grow flex">
        <SummarySection summary={summary} handleUploadNextFileClick={handleUploadNextFileClick} />
        <IllustrationSection />
      </div>
      <Footer handleFooterLinkClick={handleFooterLinkClick} />
    </div>
  );
};

const Header = ({ handleLogoutClick }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home');
  };

  return (
    <header className="bg-[#1a2e35] text-white flex justify-between items-center px-9 py-4">
      <h1 className="text-4xl font-bold cursor-pointer" onClick={handleHomeClick} >
        <span className="text-white">Summ</span>
        <span className="text-[#ff735c]">It</span>
      </h1>
      <nav className="flex flex-grow justify-end">
        <ul className="flex space-x-6">
          <li className="text-lg font-regular hover:text-gray-300 cursor-pointer" onClick={handleHomeClick}>Home</li>

          <li className="text-lg font-regular hover:text-gray-300 cursor-pointer" onClick={() => handleFooterLinkClick("https://www.linkedin.com/in/sam-thomas-6ab3a1227/")} style={{ marginRight: '40px' }}>Contact</li>
        </ul>
      </nav>
      <button className="text-white border border-white px-5 py-1 rounded-full hover:bg-gray-200 hover:text-[#1a2e35] transition-colors duration-200" onClick={handleLogoutClick}>Logout</button>
    </header>
  );
};

const SummarySection = ({ summary, handleUploadNextFileClick }) => {
  return (
    <div className="w-1/2 bg-[#11111] text-gray-800 p-8 pb-14">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Summary</h1>
      <div className="bg-gray-800 w-140 h-80 text-white p-4 overflow-auto">
        <p>{summary}</p>
      </div>
      <button className="text-gray-800 border border-gray-800 px-6 py-2 rounded-full font-semibold hover:border-gray-500 hover:text-gray-500 mt-5" onClick={handleUploadNextFileClick}>UPLOAD NEXT FILE</button>
    </div>
  );
};

const IllustrationSection = () => {
  return (
    <div className="w-1/2 flex justify-center items-center p-1">
      <img src={illustration} alt="Illustration" className="w-auto max-h-[520px]" />
    </div>
  );
};

const Footer = ({ handleFooterLinkClick }) => {
  return (
    <footer className="bg-[#1a2e35] text-white py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex justify-between">
        <FooterColumn title="Social Media" links={['Facebook', 'Instagram', 'LinkedIn']} handleFooterLinkClick={handleFooterLinkClick} />
        <FooterColumn title="SummIt" links={['Home', 'About Us', 'Get Started']} handleFooterLinkClick={handleFooterLinkClick} />
        <FooterColumn title="Contact" links={['LinkedIn', 'Instagram', 'Facebook']} handleFooterLinkClick={handleFooterLinkClick} />
        <NewsletterSubscription />
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links, handleFooterLinkClick }) => {
  return (
    <div>
      <h3 className="font-bold mb-1">{title}</h3>
      {links.map((link, index) => (
        <div key={index} className="block mb-2 hover:underline" onClick={() => handleFooterLinkClick(getFooterLinkUrl(link))}>
          {link}
        </div>
      ))}
    </div>
  );
};

const NewsletterSubscription = () => {
  return (
    <div>
      <h3 className="font-bold mb-3">Stay Up to Date</h3>
      <div className="flex mt-4">
        <input className="bg-white text-[#1a2e35] p-2 " placeholder="Enter your email" />
        <button className="bg-white text-[#1a2e35] py-2 px-4 ">
          Submit
        </button>
      </div>
    </div>
  );
};

const getFooterLinkUrl = (link) => {
  switch (link.toLowerCase()) {
    case 'facebook':
      return 'https://www.facebook.com';
    case 'instagram':
      return 'https://www.instagram.com';
    case 'linkedin':
      return 'https://www.linkedin.com/in/sam-thomas-6ab3a1227/';
    case 'about us':
      return 'https://www.linkedin.com/in/sam-thomas-6ab3a1227/';
    default:
      return '#';
  }
};

export default SummaryPage;
