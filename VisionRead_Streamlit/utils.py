import streamlit as st
import ollama
from PIL import Image
import io

# Function to perform OCR using Ollama
def perform_ocr(image):
    # Convert the image to raw bytes
    img_bytes = image.read()

    try:
        # Use Ollama model to extract text from image
        response = ollama.chat(
            model="llama3.2-vision", 
            messages=[{
                "role": "user", 
                "content": "Extract the text from this image.", 
                "images": [img_bytes]
            }]
        )
        return response
    except Exception as e:
        return f"An error occurred while processing the image: {str(e)}"

# Streamlit application
def main():
    st.title("OCR and Text Extraction Using Llama 3.2 Vision")
    
    # File uploader section
    uploaded_file = st.file_uploader("Upload an image", type=["jpg", "jpeg", "png"])

    if uploaded_file:
        try:
            # Open the uploaded image with PIL
            image = Image.open(uploaded_file)
            st.image(image, caption="Uploaded Image", use_column_width=True)

            # Perform OCR
            response = perform_ocr(uploaded_file)
            if 'error' in response:
                st.error(response['error'])
            else:
                st.subheader("Extracted Text:")
                st.text(response['content'])  # Show the extracted text
        except Exception as e:
            st.error(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()
