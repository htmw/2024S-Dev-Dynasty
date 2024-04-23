from flask import Flask, render_template, request, jsonify
from keras.models import load_model
import numpy as np
from PIL import Image
import io
import base64
import pandas as pd
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin
cred = credentials.Certificate('./moodsphere-dev-dynasty-firebase-adminsdk-ycn9w-4ec19c3952.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__)
CORS(app)

# Load your pre-trained Keras model
model = load_model("./NewEpchModelSave.keras")

# Define class names
class_names = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']

# Load your CSV data
Music_Player = pd.read_csv("./app/static/Data/data_moods.csv")
# Adjust the path as necessary
def get_all_songs():
    songs_ref = db.collection('tracks')  # 'tracks' is the Firestore collection name
    try:
        docs = songs_ref.stream()  # Fetch all documents in the collection
        songs = [doc.to_dict() for doc in docs if doc.exists]
        return songs
    except Exception as e:
        print("Error fetching songs:", str(e))
        return []

@app.route('/save-user', methods=['POST'])
def save_user():
    try:
        data = request.get_json()
        user_id = data['user_id']
        first_name = data['first_name']
        last_name = data['last_name']

        # Firestore operation
        users_ref = db.collection('users')
        users_ref.document(user_id).set({
            'first_name': first_name,
            'last_name': last_name,
            'user_id': user_id
        })

        return jsonify({'success': True, 'message': 'User data saved successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Function to recommend songs based on predicted class
def recommend_songs(pred_class):
    mood_map = {
        'Disgust': 'Sad', 'Happy': 'Happy', 'Sad': 'Happy',
        'Fear': 'Calm', 'Angry': 'Calm', 'Neutral': 'Energetic',
        'Surprise': 'Energetic'
    }
    mood = mood_map.get(pred_class, 'Happy')

    try:
        songs_ref = db.collection('tracks')
        query_ref = songs_ref.where('mood', '==', mood).order_by('popularity', direction=firestore.Query.DESCENDING).limit(5)
        docs = query_ref.stream()

        recommended_songs = [doc.to_dict() for doc in docs if doc.exists]
        return recommended_songs
    except Exception as e:
        print("Error recommending songs:", str(e))
        return []
# Define route for home page
@app.route('/')
def home():
    return render_template('index.html', data=Music_Player)

def get_songs_by_artist(artist_name):
    # Filter the DataFrame for rows where the 'artist' column matches the artist_name
    songs_by_artist = Music_Player[Music_Player['artist'] == artist_name]
    
    # Check if the filtered DataFrame is empty
    if songs_by_artist.empty:
        return []
    
    # Convert the filtered DataFrame to a list of dictionaries, 
    # where each dictionary represents a row in the DataFrame
    return songs_by_artist.to_dict('records')

def get_songs_by_genre(artist_name):
    songs_by_artist = Music_Player[Music_Player['artist'] == artist_name]
    if songs_by_artist.empty:
        return []
    return songs_by_artist[['name', 'artist']].values.tolist()

#API for recommending songs based on artists ~Shane
@app.route('/songs-by-artist', methods=['POST'])
def artist():
    try:
        data = request.get_json()
        artist_name = data.get('artist_name')

        if not artist_name:
            return jsonify({'error': 'Artist name not provided'}), 400

        songs = get_songs_by_artist(artist_name)
        if not songs:
            return jsonify({'message': 'No songs found for the provided artist'}), 404

        return jsonify({'songs': songs}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
#Songs by genre ~Shane
def get_songs_by_genre(genre_name):
    songs_by_genre = Music_Player[Music_Player['genre'] == genre_name]
    if songs_by_genre.empty:
        return []
    return songs_by_genre[['name', 'genre']].values.tolist()


#API for retrieving songs by genre ~Shane
@app.route('/songs-by-genre', methods=['POST'])
def genre():
    try:
        data = request.get_json()
        genre_name = data.get('genre_name')

        if not genre_name:
            return jsonify({'error': 'Genre name not provided'}), 400

        songs = get_songs_by_genre(genre_name)
        if not songs:
            return jsonify({'message': 'No songs found for the provided genre'}), 404

        return jsonify({'songs': songs}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Define route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the uploaded image file from the request
        file = request.files.get('image')
        if not file:
            return jsonify({'error': 'No file uploaded'}), 400
        print(request.headers)
        # Read the image file as an array
        img = Image.open(io.BytesIO(file.read()))
        img = img.resize((150, 150))  # Resize image to match model's expected sizing
        img_array = np.asarray(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0  # Normalize pixel values

        # Make sure image shape matches the expected input shape
        assert img_array.shape == (1, 150, 150, 3), "Unexpected image shape"

        # Perform prediction using your model
        prediction = model.predict(img_array)
        predicted_class_index = np.argmax(prediction)
        predicted_class = class_names[predicted_class_index]

        prediction = model.predict(img_array)
        predicted_class_index = np.argmax(prediction)
        predicted_class = class_names[predicted_class_index]

        recommended_songs = recommend_songs(predicted_class)

        response = {
            'prediction': predicted_class,
            'recommended_songs': recommended_songs
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@app.route('/create-playlist', methods=['POST'])
def create_playlist():
    try:
        data = request.get_json()
        user_id = data['user_id']
        playlist_name = data['playlist_name']
        songs = data['songs']

        # Firestore operation: add a new playlist document to the user's playlist subcollection
        playlists_col = db.collection('playlists').document(user_id).collection('user_playlists')
        new_playlist_ref = playlists_col.document()  # Let Firestore generate a unique ID
        playlist_id = new_playlist_ref.id  # Retrieve the generated ID

        new_playlist_ref.set({
            'playlist_id': playlist_id,  # Store the ID within the document for easy retrieval
            'playlist_name': playlist_name,
            'songs': songs
        })

        return jsonify({'success': True, 'message': 'Playlist created successfully', 'playlist_id': playlist_id}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/get-playlist', methods=['GET'])
def get_playlist():
    user_id = request.args.get('user_id')

    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    try:
        # Fetch all playlists for the given user ID
        playlists_col = db.collection('playlists').document(user_id).collection('user_playlists')
        playlists = playlists_col.stream()

        playlists_data = [doc.to_dict() for doc in playlists]
        if playlists_data:
            return jsonify({'success': True, 'data': playlists_data}), 200
        else:
            return jsonify({'success': False, 'message': 'No playlists found for the user'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/add-song-to-playlist', methods=['POST'])
def add_song_to_playlist():
    try:
        data = request.get_json()
        user_id = data['user_id']
        playlist_id = data['playlist_id']
        song_data = data['song_data']

        # Firestore operation: Access the specific playlist
        playlist_ref = db.collection('playlists').document(user_id).collection('user_playlists').document(playlist_id)
        playlist = playlist_ref.get()

        if playlist.exists:
            playlist_data = playlist.to_dict()
            # Check if the song is already in the playlist
            if any(song['key'] == song_data['key'] for song in playlist_data.get('songs', [])):
                return jsonify({'error': 'Song is already in the playlist'}), 400

            # Add the new song to the playlist's songs list
            updated_songs = playlist_data.get('songs', [])
            updated_songs.append(song_data)
            playlist_ref.update({'songs': updated_songs})

            return jsonify({'success': True, 'message': 'Song added successfully'}), 200
        else:
            return jsonify({'error': 'Playlist not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/remove-song-from-playlist', methods=['DELETE'])
def remove_song_from_playlist():
    try:
        user_id = request.args.get('user_id')
        playlist_id = request.args.get('playlist_id')
        song_key = request.args.get('key')

        playlist_ref = db.collection('playlists').document(user_id).collection('user_playlists').document(playlist_id)
        playlist = playlist_ref.get()

        if playlist.exists:
            playlist_data = playlist.to_dict()
            updated_songs = [song for song in playlist_data.get('songs', []) if song['key'] != song_key]
            playlist_ref.update({'songs': updated_songs})
            return jsonify({'success': True, 'message': 'Song removed successfully', 'updatedSongs':updated_songs}), 200
        else:
            return jsonify({'error': 'Playlist not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
 
@app.route('/delete-playlist', methods=['DELETE'])
def delete_playlist():
    try:
        user_id = request.args.get('user_id')
        playlist_id = request.args.get('playlist_id')

        playlist_ref = db.collection('playlists').document(user_id).collection('user_playlists').document(playlist_id)
        playlist_ref.delete()
        return jsonify({'success': True, 'message': 'Playlist deleted successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500 
 
@app.route('/search', methods=['POST'])
def search():
    query = request.json.get('query', '').lower().strip()  # Normalize query to lowercase
    if not query:
        return jsonify({'error': 'No search query provided'}), 400

    # Search for matching songs or artists
    results = search_songs_and_artists(query)
    return jsonify({'matches': results})

def search_songs_and_artists(query):
    # Perform a single scan to fetch all entries and filter manually for demo purposes
    # This is not efficient for large datasets
    songs_ref = db.collection('tracks')
    try:
        docs = songs_ref.stream()
        results = []
        for doc in docs:
            if len(results) >= 30:
                break  # Stop processing once we have 30 items
            song_data = doc.to_dict()
            # Check both the artist and name fields for the query
            if query in song_data.get('name', '').lower() or query in song_data.get('artist', '').lower():
                results.append(song_data)
        return results
    except Exception as e:
        print(f"Failed to fetch songs: {str(e)}")
        return []

if __name__ == '__main__':
    app.run(debug=True)
