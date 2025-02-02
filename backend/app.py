import os
import firebase_admin
from firebase_admin import credentials, auth
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests  # To send requests to Google Colab later

app = Flask(__name__)
CORS(app)

# Load Firebase Admin SDK credentials
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# Google Colab API URL (Update this when your model is ready)
COLAB_API_URL = "http://xyz.ngrok.io/predict"

# Folder to store uploaded audio files
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def verify_firebase_token(token):
    """Verify Google Sign-In token from Firebase"""
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        return None

@app.route("/predict", methods=["POST"])
def predict():
    """Handles audio file upload & forwards it to the ML model"""
    token = request.headers.get("Authorization")
    if not token or not token.startswith("Bearer "):
        return jsonify({"error": "Missing or invalid token"}), 401

    user = verify_firebase_token(token.replace("Bearer ", ""))
    if not user:
        return jsonify({"error": "Invalid Firebase token"}), 403

    if "file" not in request.files:
        return jsonify({"error": "No audio file uploaded"}), 400

    file = request.files["file"]
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # Send to Google Colab (when model is ready)
    files = {"file": open(file_path, "rb")}
    response = requests.post(COLAB_API_URL, files=files)
    os.remove(file_path)  # Delete after sending

    return jsonify(response.json())

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
