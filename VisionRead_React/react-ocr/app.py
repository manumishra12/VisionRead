from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import ollama
from io import BytesIO

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if not file:
        return jsonify({"error": "File is empty"}), 400

    try:
        # Read the file and convert it to Base64
        encoded_image = base64.b64encode(file.read()).decode('utf-8')

        # Send the image to Llama 3.2 Vision model
        response = ollama.chat(
            model='llama3.2-vision',
            messages=[{
                'role': 'user',
                'content': 'Extract the text from this image.',
                'images': [encoded_image]
            }]
        )

        # Extract the message content
        if 'message' in response:
            extracted_text = response['message']['content']
            return jsonify({"extracted_text": extracted_text})
        else:
            return jsonify({"error": "Failed to extract text."}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
