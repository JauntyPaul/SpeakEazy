import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '.././App.css'; // Make sure this path is correct for your CSS

function TranscriptPage() {
  const location = useLocation();
  const transcriptData = location.state?.transcriptData || [];
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleLogoutClick = () => {
    navigate('/login');
  };

  const handleFooterLinkClick = (url) => {
    window.open(url, "_blank");
  };

  const handleGetSummaryClick = () => {
    navigate('/summary');
  };

  return (
    <div className="font-sans bg-white text-gray-800 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#ff735c] text-white flex justify-between items-center px-9 py-4">
        <h1  className="text-4xl font-bold cursor-pointer" onClick={handleHomeClick}>
          <span className="text-white">Summ</span>
          <span className="text-gray-800">It</span>
        </h1>
        <nav className="flex flex-grow justify-end">
          <ul className="flex space-x-6">
            <li className="text-lg font-regular hover:text-gray-300 cursor-pointer" onClick={handleHomeClick}>Home</li>
            <li className="text-lg font-regular hover:text-gray-300 cursor-pointer" style={{ marginRight: '40px' }} onClick={() => window.open("https://www.linkedin.com/in/sam-thomas-6ab3a1227/", "_blank")}>Contact</li>
          </ul>
        </nav>
        <button className="text-white border border-white px-5 py-1 rounded-full hover:bg-white hover:text-[#1a2e35] transition-colors duration-200" onClick={handleLogoutClick}>Logout</button>
      </header>

      {/* Main Content */}
      <main className="p-8 flex-1">
        <div className="flex-1 lg:mr-12 text-left">
          <h2 className="text-[#ff735c] font-regular text-lg mb-2">SummIt/Transcript</h2>
          <p className="text-gray-700 mb-8">
            The 'transcript' page provides a detailed written account of the meeting audio, meticulously identifying speakers along with their respective names. This feature enhances accessibility and clarity, ensuring seamless comprehension of the discussion. Users can easily navigate and reference specific moments within the conversation.
          </p>
        </div>

        <h2 className="text-gray-800 font-bold text-xl mb-4">Here’s What Happened</h2>
        <div className="bg-[#D9D9D9] shadow p-6">
          <div className="text-left text-gray-700 space-y-4">
            {transcriptData.map((item, index) => (
              <p key={index}><strong>{item.Speaker}:</strong> "{item.Utterance}"</p>
            ))}
          </div>
        </div>

        <button className="mt-4 bg-gray-800 text-white rounded-full px-10 py-2 font-semibold hover:bg-[#cc5a47] transition-colors duration-200" onClick={handleGetSummaryClick}>
          GET SUMMARY
        </button>
      </main>

      {/* Footer */}
      <footer className="bg-[#ff735c] p-8 mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold">SummIt</h3>
            <div onClick={handleHomeClick} style={{ cursor: 'pointer' }}>Home</div>
            <div className=" font-regular hover:text-gray-500 cursor-pointer" onClick={() => window.open("https://www.linkedin.com/in/sam-thomas-6ab3a1227/", "_blank")} style={{ marginRight: '0px' }}>Contact us</div>
           
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Contact</h3>
            <div onClick={() => handleFooterLinkClick("https://www.linkedin.com/in/sam-thomas-6ab3a1227/")} style={{ cursor: 'pointer' }}>Linkedin</div>
            <div onClick={() => handleFooterLinkClick("https://www.instagram.com")} style={{ cursor: 'pointer' }}>Instagram</div>
            <div onClick={() => handleFooterLinkClick("https://www.facebook.com")} style={{ cursor: 'pointer' }}>Facebook</div>
          </div>
          <div>
            <h3 className="font-semibold">STAY UP TO DATE</h3>
            <div className="flex mt-2">
              <input className="border-2 border-[#1a2e35] px-4 py-1 text-[#1a2e35]" type="email" placeholder="Enter your email" />
              <button className="bg-[#1a2e35] text-white px-4">Submit</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default TranscriptPage;
