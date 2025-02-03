import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '.././App.css';
import uploadImage from "../assets/assets/smiling.jpg";

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  const token = localStorage.getItem("token"); // Retrieve token

  if (!token) {
    console.error("User is not authenticated");
    return;
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append('audio', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Response from server:", data);
        navigate('/assessment', { state: { assessmentData: data.result } }); // Navigate to assessment page with state
      } else {
        console.error("Failed to upload file:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="font-sans bg-white p-0 m-0 text-gray-800 min-h-screen">
      <header className="bg-blue-900 text-white flex justify-between items-center px-9 py-4">
        <h1 className="font-bold text-3xl">
          <span className="text-white">Speak</span>
          <span className="text-red-500">Easy</span>
        </h1>
        <nav className="flex flex-grow justify-end">
          <ul className="flex space-x-6">
            <li className="text-lg font-regular hover:text-gray-300 cursor-pointer" onClick={() => navigate('/home')}>Home</li>
            <li className="text-lg font-regular hover:text-gray-300 cursor-pointer" onClick={() => window.open("https://www.linkedin.com/in/sam-thomas-6ab3a1227/", "_blank")} style={{ marginRight: '40px' }}>Contact</li>
          </ul>
        </nav>
        <button className="text-white border border-white px-5 py-1 rounded-full hover:bg-gray-200 hover:text-blue-900 transition-colors duration-200" onClick={() => navigate('/login')}>Logout</button>
      </header>

      <main className="flex flex-col lg:flex-row items-center p-20 flex-1">
        <div className="lg:mr-12 flex-1">
          <h2 className="text-red-500 font-regular text-left mb-2">SpeakEasy/Upload</h2>
          <p className="text-gray-700 mb-8 text-left">
            The SpeakEasy upload page provides an accessible way to upload audio files for speech impairment assessment. Simply upload an audio file, and our system will analyze it for patterns and provide insights to support early detection and intervention in speech impairments.
          </p>
          
          <div className="flex flex-col space-y-5">
            <label className="bg-[#11111] text-gray-600 px-5 py-1 font-regular">UPLOAD FILE BELOW</label>
            <input type="file" accept=".wav" className="hidden" id="audioFile" onChange={handleFileChange} />

            <div className="flex justify-center">
              <button className="text-white border border-red-500 bg-red-500 px-20 py-2 rounded-full font-semibold hover:bg-blue-900 transition-colors duration-200" onClick={() => setShowModal(true)}>GET ASSESSMENT</button>
            </div>

            <span className="text-sm font-thin">MAX 25 MB</span>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <img src={uploadImage} alt="Speech assessment illustration" className="w-3/4 h-auto rounded-full" />
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Upload Audio File</h2>
            <input type="file" accept=".wav" onChange={handleFileChange} />
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-900 transition-colors duration-200" onClick={() => { setShowModal(false); handleUpload(); }}>Upload</button>
              <button className="ml-4 px-4 py-2 rounded border border-gray-300" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-white p-8 mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold">SpeakEasy</h3>
            <div className="text-lg font-regular hover:text-gray-500 cursor-pointer" onClick={() => navigate('/home')}>Home</div>
            <div className="font-regular cursor-pointer" onClick={() => window.open("https://www.linkedin.com/in/sam-thomas-6ab3a1227/", "_blank")} style={{ marginRight: '0px' }}>Contact us</div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Contact</h3>
            <div onClick={() => window.open("https://www.linkedin.com/in/sam-thomas-6ab3a1227/", "_blank")} style={{ cursor: "pointer" }}>LinkedIn</div>
            <div onClick={() => window.open("https://www.instagram.com", "_blank")} style={{ cursor: "pointer" }}>Instagram</div>
            <div onClick={() => window.open("https://www.facebook.com", "_blank")} style={{ cursor: "pointer" }}>Facebook</div>
          </div>
          <div>
            <h3 className="font-semibold">STAY UP TO DATE</h3>
            <div className="flex mt-2">
              <input className="border-2 border-blue-900 px-4 py-1 text-blue-900" type="email" placeholder="Enter your email" />
              <button className="bg-blue-900 text-white px-4">Submit</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default UploadPage;
