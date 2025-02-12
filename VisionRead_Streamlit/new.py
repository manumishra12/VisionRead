import streamlit as st
import ollama
import base64
import json
from io import BytesIO

# Function to perform OCR using Llama 3.2 Vision
def perform_ocr(image_file):
    try:
        # Encode the uploaded image file as Base64
        encoded_image = base64.b64encode(image_file.read()).decode('utf-8')

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
            message = response['message']['content']
            return message
        else:
            return "No text could be extracted from the image."

    except Exception as e:
        return f"An error occurred: {e}"

# Function to format the extracted text
def format_extracted_text(raw_text):
    structured_data = ""
    lines = raw_text.split("\n")
    for line in lines:
        if ":" in line:
            parts = line.split(":", 1)
            key = parts[0].strip()
            value = parts[1].strip()
            structured_data += f"**{key}:** {value}\n\n"
        else:
            structured_data += f"{line.strip()}\n\n"
    return structured_data

# Initialize session state for file history
if "file_history" not in st.session_state:
    st.session_state.file_history = {}

# Streamlit App
def main():
    st.title("OCR with Llama 3.2 Vision")

    # Sidebar: Upload Section
    st.sidebar.header("Upload Section")
    uploaded_file = st.sidebar.file_uploader("Upload an image", type=["png", "jpg", "jpeg"])

    # Sidebar: File History
    st.sidebar.header("File History")
    if st.session_state.file_history:
        file_list = list(st.session_state.file_history.keys())
        selected_file = st.sidebar.selectbox("Select a file to view:", file_list, index=0)
    else:
        selected_file = None

    # Main Section: File Upload and OCR
    if uploaded_file is not None:
        file_name = uploaded_file.name
        file_bytes = uploaded_file.read()

        if file_name not in st.session_state.file_history:
            # Save file to history
            st.session_state.file_history[file_name] = {
                "content": file_bytes,
                "text": None
            }

        # Perform OCR
        st.image(uploaded_file, caption="Uploaded Image", use_column_width=True)
        st.write("Performing OCR...")
        extracted_text = perform_ocr(BytesIO(file_bytes))
        st.session_state.file_history[file_name]["text"] = extracted_text

        # Display formatted extracted text
        structured_text = format_extracted_text(extracted_text)
        st.markdown(structured_text, unsafe_allow_html=True)

    # Main Section: File History Viewer
    if selected_file and selected_file in st.session_state.file_history:
        st.header("File History: Extracted Text")
        file_data = st.session_state.file_history[selected_file]
        extracted_text = file_data["text"]
        if extracted_text:
            structured_text = format_extracted_text(extracted_text)
            st.markdown(f"### {selected_file}\n\n{structured_text}", unsafe_allow_html=True)
        else:
            st.write("No OCR result available for this file.")

# Run the app
if __name__ == "__main__":
    main()
