import streamlit as st
import ollama
from PIL import Image
import io
import base64

# Define OCR function using Llama 3.2 Vision
def perform_ocr(image_file):
    try:
        # Convert image file to base64
        image_bytes = image_file.read()
        encoded_image = base64.b64encode(image_bytes).decode('utf-8')

        # Send the image to Llama 3.2 Vision model
        response = ollama.chat(
            model='llama3.2-vision',
            messages=[{
                'role': 'user',
                'content': 'Extract the text from this image.',
                'images': [encoded_image]
            }]
        )

        # Parse and return the response
        if 'choices' in response and len(response['choices']) > 0:
            extracted_text = response['choices'][0]['message']['content']
            return extracted_text
        else:
            return "No text could be extracted from the image."
    except Exception as e:
        return f"An error occurred: {e}"

# Streamlit App
def main():
    # App title
    st.title("OCR with Llama 3.2 Vision")

    # Sidebar for image upload
    with st.sidebar:
        st.header("Upload Section")
        uploaded_file = st.file_uploader("Upload an image file", type=["png", "jpg", "jpeg"])

    # Main content area
    st.header("Extracted Text")

    # Perform OCR if a file is uploaded
    if uploaded_file is not None:
        # Display uploaded image
        st.image(uploaded_file, caption="Uploaded Image", use_column_width=True)

        # Perform OCR
        st.write("Performing OCR...")
        extracted_text = perform_ocr(uploaded_file)

        # Display the extracted text
        st.text_area("Extracted Text", extracted_text, height=300)

# Run the app
if __name__ == "__main__":
    main()
