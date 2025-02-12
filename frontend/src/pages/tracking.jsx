import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '.././App.css';

function ProgressTrackingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Profile and usage details
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: location.state?.patientName || "John Doe",
    email: location.state?.patientEmail || "johndoe@example.com",
    gender: location.state?.gender || "Not provided",
    age: location.state?.age || "Not provided",
    dob: location.state?.dob || "Not provided",
    profilePic: location.state?.profilePic || null
  });

  const overallDisease = location.state?.overallDisease || 'No disease detected';
  const sessionResults = location.state?.sessionResults || [];
  const [activeTab, setActiveTab] = useState("overview");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle profile picture upload
  const handleFileChange = (e) => {
    setProfileData((prevData) => ({
      ...prevData,
      profilePic: URL.createObjectURL(e.target.files[0])
    }));
  };

  return (
    <div className="font-sans bg-white p-0 m-0 text-gray-800 min-h-screen">
      {/* Header */}
      <header className="bg-blue-900 text-white flex justify-between items-center px-9 py-4">
        <h1 className="font-bold text-3xl">
          <span className="text-white">Speak</span>
          <span className="text-red-500">Easy</span>
        </h1>
        <nav className="flex flex-grow justify-end">
          <ul className="flex space-x-6">
            <li
              className="text-lg font-regular hover:text-gray-300 cursor-pointer"
              onClick={() => navigate('/home')}
            >
              Home
            </li>
            <li
              className="text-lg font-regular hover:text-gray-300 cursor-pointer"
              onClick={() => window.open("https://www.linkedin.com/in/sam-thomas-6ab3a1227/", "_blank")}
              style={{ marginRight: '40px' }}
            >
              Contact
            </li>
          </ul>
        </nav>
        <button
          className="text-white border border-white px-5 py-1 rounded-full hover:bg-gray-200 hover:text-blue-900 transition-colors duration-200"
          onClick={() => navigate('/login')}
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="p-10 flex flex-col space-y-8">
        {/* Profile Section */}
        <div className="bg-gray-100 border border-gray-300 p-6 rounded-lg shadow-md flex items-center space-x-8 relative">
          {/* Left Side - Profile Image */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {profileData.profilePic ? (
                <img src={profileData.profilePic} alt="Profile" className="w-24 h-24 rounded-full border shadow-lg" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 shadow-lg">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Edit Profile Button (Top Right) */}
          <button 
            className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 text-sm hover:bg-blue-800 transition"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>

          {/* Right Side - Profile Details */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold">{profileData.name}</h2>
            <div className="mt-2 space-y-1">
              <p className="text-gray-700"><strong>Email:</strong> {profileData.email}</p>
              <p className="text-gray-700"><strong>Gender:</strong> {profileData.gender}</p>
              <p className="text-gray-700"><strong>Age:</strong> {profileData.age}</p>
              <p className="text-gray-700"><strong>DOB:</strong> {profileData.dob}</p>
            </div>
          </div>
        </div>

        {/* Edit Form Overlay */}
        {isEditing && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center p-6">
            <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
              <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
              <input type="text" name="name" value={profileData.name} placeholder="Enter Name" onChange={handleChange} className="w-full p-2 border border-gray-400 rounded mb-2" />
              <input type="email" name="email" value={profileData.email} placeholder="Enter Email" onChange={handleChange} className="w-full p-2 border border-gray-400 rounded mb-2" />
              <select name="gender" value={profileData.gender} onChange={handleChange} className="w-full p-2 border border-gray-400 rounded mb-2">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input type="number" name="age" value={profileData.age} placeholder="Enter Age" onChange={handleChange} className="w-full p-2 border border-gray-400 rounded mb-2" />
              <input type="date" name="dob" value={profileData.dob} onChange={handleChange} className="w-full p-2 border border-gray-400 rounded mb-4" />
              <input type="file" accept="image/*" className="w-full p-2 border border-gray-400 rounded mb-4" onChange={handleFileChange} />
              <button className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-800 transition" onClick={() => setIsEditing(false)}>Save</button>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b border-gray-300 pb-2">
          <button className={`px-4 py-2 ${activeTab === "overview" ? "border-b-2 border-blue-900 font-bold" : "text-gray-600"}`} onClick={() => setActiveTab("overview")}>Overview</button>
          <button className={`px-4 py-2 ${activeTab === "analysis" ? "border-b-2 border-blue-900 font-bold" : "text-gray-600"}`} onClick={() => setActiveTab("analysis")}>Detailed Analysis</button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="bg-blue-100 border border-blue-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Overall Disease:</h3>
            <p className="text-gray-800 text-lg">{overallDisease}</p>
          </div>
        )}

        {activeTab === "analysis" && (
          <div className="space-y-8">
            <div className="bg-green-100 border border-green-900 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-900 mb-4">Total Files Uploaded: {sessionResults.length}</h3>
            </div>
            {sessionResults.map((session, index) => (
              <div key={index} className="bg-red-100 border border-red-900 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-red-900 mb-2">Session {index + 1}</h4>
                <p className="text-gray-700 text-lg mb-2">Uploaded on: {session.timestamp || "N/A"}</p>
                <p className="text-gray-800 text-lg">Result: {session.result || "No result available"}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="bg-white p-8 mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold">SpeakEasy</h3>
            <div
              className="text-lg font-regular hover:text-gray-500 cursor-pointer"
              onClick={() => navigate('/home')}
            >
              Home
            </div>
            <div
              className="font-regular cursor-pointer"
              onClick={() => window.open("https://www.linkedin.com/in/sam-thomas-6ab3a1227/", "_blank")}
              style={{ marginRight: '0px' }}
            >
              Contact us
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Contact</h3>
            <div
              onClick={() => window.open("https://www.linkedin.com/in/sam-thomas-6ab3a1227/", "_blank")}
              style={{ cursor: "pointer" }}
            >
              LinkedIn
            </div>
            <div
              onClick={() => window.open("https://www.instagram.com", "_blank")}
              style={{ cursor: "pointer" }}
            >
              Instagram
            </div>
            <div
              onClick={() => window.open("https://www.facebook.com", "_blank")}
              style={{ cursor: "pointer" }}
            >
              Facebook
            </div>
          </div>
          <div>
            <h3 className="font-semibold">STAY UP TO DATE</h3>
            <div className="flex mt-2">
              <input
                className="border-2 border-blue-900 px-4 py-1 text-blue-900"
                type="email"
                placeholder="Enter your email"
              />
              <button className="bg-blue-900 text-white px-4">Submit</button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default ProgressTrackingPage;
