import firebase_admin
from firebase_admin import credentials, firestore
import json

# Initialize Firebase Admin SDK
cred = credentials.Certificate('moodsphere-dev-dynasty-firebase-adminsdk-ycn9w-40b74b27a7.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

def push_to_firestore(data):
    # Push each track data to Firestore
    for track_id, track_data in data.items():
        db.collection('tracks').document(track_id).set(track_data)

# Load data from JSON file
with open('output.json', 'r') as json_file:
    data = json.load(json_file)

# Push data to Firestore
push_to_firestore(data)
