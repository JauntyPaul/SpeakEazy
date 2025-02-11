import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '.././App.css';

function AssessmentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const assessmentData = location.state?.assessmentData || 'No data available';
  const audioFeatures = location.state?.audioFeatures || 'No features available';
  const generatedExercises = location.state?.generatedExercises || 'No exercises generated';

  return (
    <div className="font-sans bg-white p-0 m-0 text-gray-800 min-h-screen">
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

      <main className="flex flex-col lg:flex-row items-center p-20 flex-1 space-y-8">
        <div className="lg:mr-12 flex-1 space-y-8">
          <h2 className="text-red-500 font-regular text-left mb-2">Assessment Results</h2>
          <p className="text-gray-700 mb-8 text-left">
            Here is the assessment result based on the audio file you uploaded. This analysis provides insights into speech patterns to support early detection and intervention.
          </p>

          <div className="bg-blue-100 border border-blue-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Assessment Result:</h3>
            <p className="text-gray-800 text-lg">{assessmentData}</p>
          </div>

          <div className="bg-green-100 border border-green-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-green-900 mb-4">Audio Features:</h3>
            <p className="text-gray-800 text-lg">{audioFeatures}</p>
          </div>

          <div className="bg-yellow-100 border border-yellow-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-900 mb-4">Generated Exercises:</h3>
            <p className="text-gray-800 text-lg">{generatedExercises}</p>
          </div>

          {/* Button to track patient progress */}
          <div className="flex justify-center">
  <button
    className="w-1/3 bg-blue-900 text-white px-6 py-2 text-sm font-semibold  hover:bg-red-600 transition duration-200"
    onClick={() => navigate('/tracking')}
  >
    Track Progress
  </button>
</div>

        </div>
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

export default AssessmentPage;
