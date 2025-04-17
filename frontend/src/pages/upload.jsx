import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth'; // Import getAuth and signOut
import '.././App.css';
import uploadImage from "../assets/assets/smiling.jpg";
import Loader from "../components/loader"; // Import the Loader component

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // State for loading
  const [error, setError] = useState(null); // Added error state for handling logout errors
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Auth

  const token = localStorage.getItem("token");

  if (!token) {
    console.error("User is not authenticated");
    return;
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      console.error("User ID is missing! Redirecting to login...");
      navigate("/login");
      return;
    }
  
    if (!selectedFile) {
      alert("Please select an audio file first");
      return;
    }
  
    const formData = new FormData();
    formData.append("audio", selectedFile);
    formData.append("user_id", user_id);
    
    setIsUploading(true); // Show loader
    
    try {
      const response = await fetch("http://127.0.0.1:5000/upload-audio", {
        method: "POST",
        body: formData,
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }
  
      console.log("Response from server:", data);
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      navigate("/assessment", { state: { assessmentData: data } });
    } catch (error) {
      console.error("Error uploading file:", error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false); // Hide loader regardless of success or failure
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out using Firebase Auth
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      setError("Failed to sign out. Please try again.");
    }
  };

  return (
    <div className="font-sans bg-white p-0 m-0 text-gray-800 min-h-screen ">
      <header className="bg-blue-900 text-white flex justify-between items-center fixed top-0 left-0 w-screen px-9 py-4 z-30">
        <h1 className="font-bold text-3xl">
          <span className="text-white">Speak</span>
          <span className="text-red-500">Easy</span>
        </h1>
        <nav className="flex flex-grow justify-end">
          <ul className="flex space-x-6">
            <li
              className="text-lg font-regular hover:text-gray-300 cursor-pointer"
              onClick={() => navigate("/home")}
            >
              Home
            </li>
            <li
              className="text-lg font-regular hover:text-gray-300 cursor-pointer"
              onClick={() => window.open("https://www.linkedin.com/in/sam-thomas-6ab3a1227/", "_blank")}
              style={{ marginRight: "40px" }}
            >
              Contact
            </li>
          </ul>
        </nav>
        <div className="flex space-x-4">
          <button
            className="text-white border border-white px-5 py-1 rounded-full hover:bg-gray-200 hover:text-blue-900 transition-colors duration-200"
            onClick={() => navigate("/tracking")}
          >
            Profile
          </button>
          <button
            className="text-white border border-white px-5 py-1 rounded-full hover:bg-gray-200 hover:text-blue-900 transition-colors duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
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

      {showModal && !isUploading && (
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

      {isUploading && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center">
            <Loader size={40} /> {/* Using the Loader component */}
            <p className="text-white mt-4 text-lg">Uploading...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-red-500">Error</h2>
            <p className="text-gray-700 mb-4">{error}</p>
            <div className="flex justify-end">
              <button
                className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                onClick={() => setError(null)}
              >
                Close
              </button>
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