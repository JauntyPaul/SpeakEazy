from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import uuid
from inference import send_audio_to_colab
from firebase_config import db

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

import requests

# Update this manually whenever ngrok restarts (or use Firebase to automate)
COLAB_URL = "https://0a75-34-48-173-20.ngrok-free.app"

def send_audio_to_colab(file_path):
    """Sends audio file to Colab API for inference."""
    with open(file_path, "rb") as audio_file:
        files = {"audio": audio_file}
        
        response = requests.post(f"{COLAB_URL}/predict", files=files)
        
        if response.status_code == 200:
            return response.json()
        else:
            return {"error": "Failed to get a response from Colab"}


@app.route('/upload-audio', methods=['POST'])
def upload_audio():
    """Endpoint to receive audio from frontend."""
    if 'audio' not in request.files or 'user_id' not in request.form:
        return jsonify({'error': 'Missing audio or user ID'}), 400

    user_id = request.form['user_id']  # Google ID from frontend
    audio_file = request.files['audio']
    
    # Save audio temporarily
    file_path = os.path.join(UPLOAD_FOLDER, f"{uuid.uuid4()}.wav")
    audio_file.save(file_path)

    # Send to Google Colab for inference
    prediction = send_audio_to_colab(file_path)

    # Store results in Firebase
    result = {
        "user_id": user_id,
        "file_path": file_path,
        "prediction": prediction,
        "timestamp": firestore.SERVER_TIMESTAMP
    }
    db.collection("assessments").add(result)

    return jsonify({'prediction': prediction, 'message': 'Audio processed successfully'})

if __name__ == '__main__':
    app.run(debug=True)
