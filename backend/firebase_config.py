import firebase_admin
from firebase_admin import credentials, firestore

# Load Firebase credentials
cred = credentials.Certificate("firebaseKey.json")  # Download from Firebase Console
firebase_admin.initialize_app(cred)

db = firestore.client()  # Firestore database instance
