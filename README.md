# VisionRead 👀
VisionRead application built using Python (with Streamlit) and React.js to perform Optical Character Recognition (OCR) leveraging the Llama 3.2 Vision model. These applications can extract text from both printed and handwritten images with exceptional accuracy, providing advanced features like file history for revisiting uploaded images.
<br>


### React Appliction:
<img src="https://github.com/manumishra12/VisionRead/blob/main/VisionRead.gif" alt="Alt text" width="1000" height="550">

<br>
<br>

### Streamlit Appliction:
<img src="https://github.com/manumishra12/VisionRead/blob/main/screen-capture.gif" alt="Alt text" width="1000" height="500">

---

<br>

## About Llama 3.2 Vision and Ollama

**Llama 3.2 Vision** is a state-of-the-art multimodal AI model developed by **Ollama**, designed to process and understand both textual and visual inputs. With its advanced capabilities, Llama 3.2 Vision excels in extracting and interpreting information from images, including printed and handwritten text, making it a perfect fit for OCR tasks.

**Ollama** provides a robust platform to deploy and interact with models like Llama 3.2 Vision. It offers a CLI and libraries for Python and JavaScript, making integration simple and efficient for developers.

Learn more about Llama 3.2 Vision on the [Ollama blog](https://ollama.com/blog/llama3.2-vision).

<br>

<img src="https://github.com/manumishra12/VisionRead/blob/main/image.png" alt="Alt text" width="200" height="200">


---

## Key Features

- **Text Extraction:** Extracts text from printed and handwritten images with exceptional accuracy.
- **File History:** Automatically saves uploaded images and their results, allowing users to revisit previous files and outputs.
- **Handwriting Recognition:** Converts handwritten notes into editable text, enhancing accessibility and productivity.
- **Simple Interface:** User-friendly Streamlit interface for easy interaction.
- **Multi-format Support:** Accepts common image formats (e.g., PNG, JPG) for OCR processing.
- **Efficient Backend:** Utilizes the Llama 3.2 Vision model for fast and reliable text extraction.
- **Scalable Design:** Designed to handle multiple uploads and maintain a smooth user experience.

---

## Requirements

- Python 3.7+
- Ollama CLI and Llama 3.2 Vision model
- Streamlit
- ReactJS
- MaterialUI

---

## Installation for Streamlit

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/ocr-streamlit-app.git
   cd ocr-streamlit-app
   ```

2. Install the required Python libraries:
   ```bash
   pip install -r requirements.txt
   ```

3. Pull the Llama 3.2 Vision model using Ollama:
   ```bash
   ollama pull llama3.2-vision
   ```

---

<br>

## React.js Implementation

### Requirements
- Node.js and npm
- Ollama CLI and Llama 3.2 Vision model
- React.js


### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/ocr-app.git
   cd ocr-app/react
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```
   
3. Pull the Llama 3.2 Vision model using Ollama:
   ```bash
   ollama pull llama3.2-vision
   ```
      
4. Start the React app:
   ```bash
   npm start
   ```

Upload an image to extract text. The app will display the extracted text in a structured format, and users can navigate through the file history to revisit previous uploads.

Key React.js Features

- Responsive Design: Ensures a seamless user experience across devices.
- Interactive Dashboard: Provides a dynamic interface for managing uploads and viewing results.
- API Integration: Leverages the Ollama API to interact with the Llama 3.2 Vision model efficiently.
- Customization Options: Easily adaptable for additional features like language translation or text-to-speech.
- Real-time Feedback: Displays processing status to keep users informed.

<br>

<img src="https://github.com/manumishra12/VisionRead/blob/main/1.png" alt="Alt text" width="600" height="600">
<br>
<img src="https://github.com/manumishra12/VisionRead/blob/main/2.png" alt="Alt text" width="600" height="600">

---

## Usage

Running the Application

1. Start the Streamlit app:
   ```bash
   streamlit run app.py
   ```

2. Upload an image to extract text. The app will display the extracted text along with a history of previous uploads.
   
---

## Example Code: Using Llama 3.2 Vision

💡Python Library
To use Llama 3.2 Vision with the Ollama Python library:

 ```bash
  import ollama
  
  response = ollama.chat(
      model='llama3.2-vision',
      messages=[{
          'role': 'user',
          'content': 'What is in this image?',
          'images': ['image.jpg']
      }]
  )
  
  print(response)
```

💡JavaScript Library
To use Llama 3.2 Vision with the Ollama JavaScript library:

 ```bash
  import ollama from 'ollama';
  
  const response = await ollama.chat({
    model: 'llama3.2-vision',
    messages: [{
      role: 'user',
      content: 'What is in this image?',
      images: ['image.jpg']
    }]
  });
  
  console.log(response);

```

💡cURL
Using cURL to interact with the Ollama model:

 ```bash
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2-vision",
  "messages": [
    {
      "role": "user",
      "content": "what is in this image?",
      "images": ["<base64-encoded image data>"]
    }
  ]
}'
```

---

## Acknowledgments

- Ollama Team: For providing the Llama 3.2 Vision model.
- Streamlit: For the easy-to-use framework enabling rapid development of data applications.
