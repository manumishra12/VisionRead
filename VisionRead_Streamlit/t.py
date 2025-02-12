import streamlit as st
import ollama
import base64
import json

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
    # Parse the structured text
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

# Streamlit App
def main():
    st.title("OCR with Llama 3.2 Vision")

    # Upload section
    st.sidebar.header("Upload Section")
    uploaded_file = st.sidebar.file_uploader("Upload an image", type=["png", "jpg", "jpeg"])

    # Extracted text display
    st.header("Extracted Text")
    if uploaded_file is not None:
        st.image(uploaded_file, caption="Uploaded Image", use_column_width=True)
        st.write("Performing OCR...")
        raw_text = perform_ocr(uploaded_file)
        
        # Format and display structured text
        structured_text = format_extracted_text(raw_text)
        st.markdown(structured_text, unsafe_allow_html=True)
    else:
        st.write("Upload an image to start the OCR process.")

# Run the app
if __name__ == "__main__":
    main()


# import streamlit as st
# import ollama
# import base64

# # Function to perform OCR using Llama 3.2 Vision
# def perform_ocr(image_file):
#     try:
#         # Encode the uploaded image file as Base64
#         encoded_image = base64.b64encode(image_file.read()).decode('utf-8')

#         # Send the image to Llama 3.2 Vision model
#         response = ollama.chat(
#             model='llama3.2-vision',
#             messages=[{
#                 'role': 'user',
#                 'content': 'Extract the text from this image.',
#                 'images': [encoded_image]
#             }]
#         )

#         # Debug: Display the full response for troubleshooting
#         st.write("Response from Llama:", response)

#         # Extract text from response
#         if 'choices' in response and len(response['choices']) > 0:
#             extracted_text = response['choices'][0]['message']['content']
#             return extracted_text
#         else:
#             return "No text could be extracted from the image."
#     except Exception as e:
#         return f"An error occurred: {e}"

# # Streamlit App
# def main():
#     st.title("OCR with Llama 3.2 Vision")

#     # Upload section
#     st.sidebar.header("Upload Section")
#     uploaded_file = st.sidebar.file_uploader("Upload an image", type=["png", "jpg", "jpeg"])

#     # Extracted text display
#     st.header("Extracted Text")
#     if uploaded_file is not None:
#         st.image(uploaded_file, caption="Uploaded Image", use_column_width=True)
#         st.write("Performing OCR...")
#         extracted_text = perform_ocr(uploaded_file)
#         st.text_area("Extracted Text", extracted_text, height=300)
#     else:
#         st.write("Upload an image to start the OCR process.")

# # Run the app
# if __name__ == "__main__":
#     main()
