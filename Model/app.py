import os
import pickle
import numpy as np
import streamlit as st
from PIL import Image
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model, Model
from tensorflow.keras.layers import Input, Dense, LSTM, Embedding, Dropout, add
from tensorflow.keras.utils import to_categorical

# Load the VGG16 model and tokenizer
model_vgg = VGG16()
model_vgg = Model(inputs=model_vgg.inputs, outputs=model_vgg.layers[-2].output)
tokenizer = Tokenizer()
with open('tokenizer.pkl', 'rb') as f:
    tokenizer = pickle.load(f)

# Load your trained model
model = load_model('image_captioning_model.h5')

# Function to preprocess the image
def preprocess_image(image_path):
    image = Image.open(image_path)
    image = image.resize((224, 224))
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image = preprocess_input(image)
    return image

# Function to generate captions
def generate_caption(image_path, model, model_vgg, tokenizer, max_length):
    image = preprocess_image(image_path)
    feature = model_vgg.predict(image, verbose=0)
    in_text = 'startseq'
    for i in range(max_length):
        sequence = tokenizer.texts_to_sequences([in_text])[0]
        sequence = pad_sequences([sequence], maxlen=max_length)
        yhat = model.predict([feature, sequence], verbose=0)
        yhat = np.argmax(yhat)
        word = idx_to_word(yhat, tokenizer)
        if word is None:
            break
        in_text += " " + word
        if word == 'endseq':
            break
    return in_text

# Function to convert index to word
def idx_to_word(integer, tokenizer):
    for word, index in tokenizer.word_index.items():
        if index == integer:
            return word
    return None

# Create the Streamlit app
def main(max_length):
    st.title("Image Captioning App")

    # Initialize image_path variable
    image_path = None

    # File uploader for image
    image_file = st.file_uploader("Upload an image", type=["jpg", "jpeg", "png"])

    if image_file is not None:
        # Save the uploaded image
        image_path = os.path.join('./Images', image_file.name)
        with open(image_path, 'wb') as f:
            f.write(image_file.read())

        # Show the uploaded image
        st.image(Image.open(image_path), caption="Uploaded Image", use_column_width=True)

    # Check if an image has been uploaded
    if image_path:
        # Generate and display the caption
        caption = generate_caption(image_path, model, model_vgg, tokenizer, max_length)
        st.subheader("Generated Caption:")
        st.write(caption)

        # Remove the saved image
        os.remove(image_path)


if __name__ == "__main__":
    max_length = 35
    main(max_length)

# import os
# import pickle
# import numpy as np
# from flask import Flask, request, jsonify
# from PIL import Image
# from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
# from tensorflow.keras.preprocessing.image import load_img, img_to_array
# from tensorflow.keras.preprocessing.text import Tokenizer
# from tensorflow.keras.preprocessing.sequence import pad_sequences
# from tensorflow.keras.models import load_model, Model
# from tensorflow.keras.layers import Input, Dense, LSTM, Embedding, Dropout, add
# from tensorflow.keras.utils import to_categorical

# # Load the VGG16 model and tokenizer
# model_vgg = VGG16()
# model_vgg = Model(inputs=model_vgg.inputs, outputs=model_vgg.layers[-2].output)
# tokenizer = Tokenizer()
# with open('tokenizer.pkl', 'rb') as f:
#     tokenizer = pickle.load(f)

# # Load your trained model
# model = load_model('image_captioning_model.h5')

# # Function to preprocess the image
# def preprocess_image(image_path):
#     image = Image.open(image_path)
#     image = image.resize((224, 224))
#     image = img_to_array(image)
#     image = np.expand_dims(image, axis=0)
#     image = preprocess_input(image)
#     return image

# # Function to generate captions
# def generate_caption(image_path, model, model_vgg, tokenizer, max_length):
#     image = preprocess_image(image_path)
#     feature = model_vgg.predict(image, verbose=0)
#     in_text = 'startseq'
#     for i in range(max_length):
#         sequence = tokenizer.texts_to_sequences([in_text])[0]
#         sequence = pad_sequences([sequence], maxlen=max_length)
#         yhat = model.predict([feature, sequence], verbose=0)
#         yhat = np.argmax(yhat)
#         word = idx_to_word(yhat, tokenizer)
#         if word is None:
#             break
#         in_text += " " + word
#         if word == 'endseq':
#             break
#     return in_text

# # Function to convert index to word
# def idx_to_word(integer, tokenizer):
#     for word, index in tokenizer.word_index.items():
#         if index == integer:
#             return word
#     return None

# app = Flask(__name__)

# @app.route('/caption', methods=['POST'])
# def get_caption():
#     if 'image' not in request.files:
#         return jsonify({'error': 'No image found'})

#     image_file = request.files['image']
#     image_path = os.path.join('./Images', image_file.filename)
#     image_file.save(image_path)

#     caption = generate_caption(image_path, model, model_vgg, tokenizer, max_length)

#     os.remove(image_path)

#     return jsonify({'caption': caption})

# if __name__ == '__main__':
#     max_length = 35  # Use the same value you used during training
#     app.run(host='0.0.0.0', port=5000)  # Run the Flask app on port 5000

# # The API will listen on http://localhost:5000/caption and wait for POST requests containing images. 
# # The Node.js backend can make POST requests to this API endpoint to receive the image captions in response.

# # In your Node.js backend, you can use libraries like Axios or node-fetch to make HTTP POST requests to the Flask API. 
# # The Node.js backend will be responsible for interacting with the frontend and forwarding the image files to the Flask API for 
# # caption generation.