import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, orderBy, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import "../App.css";

function ProgressTrackingPage() {
  const navigate = useNavigate();
  const db = getFirestore();
  const auth = getAuth();

  // State setup
  const [userId, setUserId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionResults, setSessionResults] = useState([]);

  // Profile data state
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    gender: "Not provided",
    age: "Not provided",
    dob: "Not provided",
    profilePic: null,
  });

  const [activeTab, setActiveTab] = useState("overview");

  // Fetch user ID and profile data from Firebase Auth and Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        // Update profile data with Firebase Auth info
        setProfileData((prevData) => ({
          ...prevData,
          name: user.displayName || "John Doe",
          email: user.email || "johndoe@example.com",
          profilePic: user.photoURL || null,
        }));

        // Fetch additional profile data (gender, age, dob) from Firestore
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setProfileData((prevData) => ({
              ...prevData,
              gender: userData.gender || "Not provided",
              age: userData.age || "Not provided",
              dob: userData.dob || "Not provided",
            }));
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
          setError("Failed to fetch user profile data.");
        }
      } else {
        setError("User not logged in");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  // Fetch assessment data from Firestore when userId is available
  useEffect(() => {
    const fetchAssessments = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const assessmentsRef = collection(db, "assessments");

        // Query assessments collection, filter by user_id, order by timestamp
        const q = query(
          assessmentsRef,
          where("user_id", "==", userId),
          orderBy("timestamp", "desc")
        );

        const querySnapshot = await getDocs(q);

        const sessions = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          sessions.push({
            id: doc.id,
            timestamp: data.timestamp,
            prediction: data.colab_prediction?.predicted_class || "N/A",
            confidence: data.colab_prediction?.confidence || 0,
            features: data.colab_prediction?.features || {},
            exercises: data.deepseek_exercises || "No exercises provided",
          });
        });

        setSessionResults(sessions);
        setError(null);
      } catch (err) {
        console.error("Error fetching assessments:", err);
        setError("Failed to fetch assessment data. Ensure Firestore indexes are set up.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [db, userId]);

  // Handle input changes in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle profile picture upload
  const handleFileChange = (e) => {
    setProfileData((prevData) => ({
      ...prevData,
      profilePic: URL.createObjectURL(e.target.files[0]),
    }));
  };

  // Save profile data to Firestore
  const handleSave = async () => {
    if (!userId) return;

    try {
      const userDocRef = doc(db, "users", userId);
      await setDoc(
        userDocRef,
        {
          gender: profileData.gender,
          age: profileData.age,
          dob: profileData.dob,
        },
        { merge: true } // Use merge to update only these fields
      );
      setIsEditing(false);
      setError(null);
    } catch (err) {
      console.error("Error saving profile data:", err);
      setError("Failed to save profile data.");
    }
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
        <button
          className="text-white border border-white px-5 py-1 rounded-full hover:bg-gray-200 hover:text-blue-900 transition-colors duration-200"
          onClick={() => navigate("/login")}
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="p-10 flex flex-col space-y-8">
        {/* Profile Section */}
        <div className="bg-gray-100 border border-gray-300 p-6 rounded-lg shadow-md flex items-center space-x-8 relative">
          <div className="flex flex-col items-center">
            {profileData.profilePic ? (
              <img
                src={profileData.profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full border shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 shadow-lg">
                No Image
              </div>
            )}
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2 text-sm"
              />
            )}
          </div>

          <div className="absolute top-4 right-4 flex space-x-2">
            {isEditing ? (
              <>
                <button
                  className="bg-green-600 text-white px-3 py-1 text-sm hover:bg-green-800 transition"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="bg-gray-600 text-white px-3 py-1 text-sm hover:bg-gray-800 transition"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="bg-blue-600 text-white px-3 py-1 text-sm hover:bg-blue-800 transition"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold">{profileData.name}</h2>
            <div className="mt-2 space-y-1">
              <p className="text-gray-700">
                <strong>Email:</strong> {profileData.email}
              </p>
              {isEditing ? (
                <>
                  <p className="text-gray-700">
                    <strong>Gender:</strong>{" "}
                    <input
                      type="text"
                      name="gender"
                      value={profileData.gender}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  </p>
                  <p className="text-gray-700">
                    <strong>Age:</strong>{" "}
                    <input
                      type="text"
                      name="age"
                      value={profileData.age}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  </p>
                  <p className="text-gray-700">
                    <strong>DOB:</strong>{" "}
                    <input
                      type="date"
                      name="dob"
                      value={profileData.dob}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-700">
                    <strong>Gender:</strong> {profileData.gender}
                  </p>
                  <p className="text-gray-700">
                    <strong>Age:</strong> {profileData.age}
                  </p>
                  <p className="text-gray-700">
                    <strong>DOB:</strong> {profileData.dob}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-300 pb-2">
          <button
            className={`px-4 py-2 ${
              activeTab === "overview" ? "border-b-2 border-blue-900 font-bold" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "analysis" ? "border-b-2 border-blue-900 font-bold" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("analysis")}
          >
            Session History
          </button>
        </div>

        {/* Session History */}
        {activeTab === "analysis" && (
          <div className="space-y-8">
            {loading ? (
              <p>Loading session data...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              sessionResults.map((session, index) => (
                <div
                  key={session.id}
                  className="bg-red-100 border border-red-900 p-6 rounded-lg shadow-md"
                >
                  <h4 className="text-xl font-semibold text-red-900 mb-2">Session {index + 1}</h4>
                  <p className="text-gray-700">
                    Date: {new Date(session.timestamp).toLocaleDateString()}
                  </p>
                  {session.prediction && session.confidence ? (
                    <p className="text-gray-800">
                      Prediction: {session.prediction} (Confidence:{" "}
                      {(session.confidence * 100).toFixed(2)}%)
                    </p>
                  ) : (
                    <p className="text-gray-600">No prediction available for this session.</p>
                  )}
                  {/* Display Features */}
                  {Object.keys(session.features).length > 0 ? (
                    <details className="mt-4">
                      <summary className="text-red-900 font-semibold cursor-pointer">
                        Speech Features
                      </summary>
                      <div className="mt-2 text-gray-700">
                        <p>
                          <strong>Average Pitch:</strong> {session.features.avg_pitch?.toFixed(2)} Hz
                        </p>
                        <p>
                          <strong>Duration:</strong> {session.features.duration?.toFixed(2)} seconds
                        </p>
                        <p>
                          <strong>Speech Rate:</strong> {session.features.speech_rate} Hz
                        </p>
                        <p>
                          <strong>Total Pause Time:</strong>{" "}
                          {session.features.total_pause_time?.toFixed(3)} seconds
                        </p>
                        <p>
                          <strong>Zero Crossings:</strong> {session.features.zero_crossings}
                        </p>
                      </div>
                    </details>
                  ) : (
                    <p className="text-gray-600 mt-4">No speech features available.</p>
                  )}
                  {/* Display Exercises */}
                  <details className="mt-4">
                    <summary className="text-red-900 font-semibold cursor-pointer">
                      Personalized Exercise Plan
                    </summary>
                    <div className="mt-2 text-gray-700 whitespace-pre-wrap">
                      {session.exercises}
                    </div>
                  </details>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default ProgressTrackingPage;