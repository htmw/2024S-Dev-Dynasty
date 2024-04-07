from flask import Flask, render_template, request, jsonify
from keras.models import load_model
import numpy as np
from PIL import Image
import io
import base64
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load your pre-trained Keras model
model = load_model("./NewEpchModelSave.keras")

# Define class names
class_names = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']

# Load your CSV data
Music_Player = pd.read_csv("./app/static/Data/data_moods.csv")
# Adjust the path as necessary


# Function to recommend songs based on predicted class
def recommend_songs(pred_class):
    if pred_class == 'Disgust':
        mood = 'Sad'
    elif pred_class in ['Happy', 'Sad']:
        mood = 'Happy'
    elif pred_class in ['Fear', 'Angry']:
        mood = 'Calm'
    else:
        mood = 'Energetic'

    # Filter music based on predicted mood and sort by popularity
    recommended_songs = Music_Player[Music_Player['mood'] == mood]
    recommended_songs = recommended_songs.sort_values(by="popularity", ascending=False).head(5).to_dict('records')

    return recommended_songs


# Define route for home page
@app.route('/')
def home():
    return render_template('index.html', data=Music_Player)


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


if __name__ == '__main__':
    app.run(debug=True)
