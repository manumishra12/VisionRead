import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
} from "@mui/material";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setResponseText("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResponseText(response.data.extracted_text);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while processing the file.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewImage(null);
    setResponseText("");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" sx={{ fontWeight: "bold", color: "blue", mb: 4 }}>
        VisionRead 👀
      </Typography>
      
      <Grid container spacing={4}>
        {/* Image Upload Section */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              width: "150%",
              minHeight: "1200px",
              border: "2px dashed gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
              marginLeft: "-300px",
            }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {previewImage ? (
              <CardMedia
                component="img"
                image={previewImage}
                alt="Uploaded Preview"
                sx={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : (
              <Typography variant="h6" color="textSecondary">
                Click to upload an image
              </Typography>
            )}
          </Card>
          {previewImage && (
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 20 }}>
              <Button variant="contained" color="error" onClick={handleRemoveImage}>
                Remove Image
              </Button>
              <Button variant="contained" color="primary" onClick={handleUpload} disabled={loading}>
                {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "Extract Text"}
              </Button>
            </Box>
          )}
        </Grid>

        {/* Extracted Text Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ width: "150%", minHeight: "1200px",border: "2px dashed gray", backgroundColor: "#f9f9f9", p: 0 }}>
            <CardContent>
              <Typography variant="h6">Extracted Text</Typography>
              <Box
                sx={{
                  maxHeight: "1200px",
                  overflowY: "auto",
                  padding: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  mt: 2,
                }}
              >
                {loading ? "Extracting text..." : responseText || "No text extracted yet."}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;




// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Box,
//   Typography,
//   Button,
//   TextField,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   Card,
//   CardMedia,
//   CardContent,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   IconButton,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// function App() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [responseText, setResponseText] = useState("");
//   const [history, setHistory] = useState([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first!");
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setResponseText(response.data.extracted_text);
//       setHistory((prevHistory) => [
//         ...prevHistory,
//         { fileName: selectedFile.name, extractedText: response.data.extracted_text },
//       ]);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       alert("An error occurred while processing the file.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleHistoryClick = (item) => {
//     setResponseText(item.extractedText);
//   };

//   const handleDialogOpen = () => {
//     setIsDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setIsDialogOpen(false);
//   };

//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       <Typography
//         variant="h3"
//         align="center"
//         gutterBottom
//         style={{ fontWeight: "bold", color: "#3f51b5" }}
//       >
//         VisionRead 👀
//       </Typography>
//       <Typography variant="h6" align="center" gutterBottom>
//         Precision OCR for Printed and Handwritten Text, Simplified.
//       </Typography>

//       <Box mb={6} />

//       <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
//         {/* File Upload Section */}
//         <Card>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Upload an Image
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <TextField
//                 type="file"
//                 onChange={handleFileChange}
//                 InputLabelProps={{ shrink: true }}
//                 variant="outlined"
//                 fullWidth
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleUpload}
//                 disabled={loading}
//               >
//                 {loading ? <CircularProgress size={24} /> : "Upload & Extract"}
//               </Button>
//             </Box>
//           </CardContent>
//         </Card>

//         {/* Preview Section */}
//         {previewImage && (
//           <Card>
//             <CardMedia
//               component="img"
//               height="200"
//               image={previewImage}
//               alt="Uploaded Preview"
//             />
//             <CardContent>
//               <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <Typography variant="body2" color="textSecondary">
//                   Preview of the uploaded image.
//                 </Typography>
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   onClick={handleDialogOpen}
//                   size="small"
//                 >
//                   View Full Image
//                 </Button>
//               </Box>
//             </CardContent>
//           </Card>
//         )}

//         {/* Extracted Text Section */}
//         <Card>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Extracted Text
//             </Typography>
//             <Box
//               sx={{
//                 minHeight: "150px",
//                 p: 2,
//                 border: "1px solid #ddd",
//                 borderRadius: "4px",
//                 backgroundColor: "#f9f9f9",
//                 overflowY: "auto",
//               }}
//             >
//               {loading ? "Extracting text..." : responseText || "No text extracted yet."}
//             </Box>
//           </CardContent>
//         </Card>

//         {/* File History Section */}
//         <Card>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               File History
//             </Typography>
//             <List>
//               {history.map((item, index) => (
//                 <ListItem
//                   key={index}
//                   button
//                   onClick={() => handleHistoryClick(item)}
//                   sx={{ color: "primary.main" }}
//                 >
//                   <ListItemText primary={item.fileName} />
//                 </ListItem>
//               ))}
//             </List>
//           </CardContent>
//         </Card>
//       </Box>

//       {/* Full Image Dialog */}
//       <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth="lg">
//         <DialogTitle>
//           Full Image Preview
//           <IconButton
//             aria-label="close"
//             onClick={handleDialogClose}
//             sx={{ position: "absolute", right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <img src={previewImage} alt="Full Preview" style={{ width: "100%" }} />
//         </DialogContent>
//       </Dialog>
//     </Container>
//   );
// }

// export default App;


// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Box,
//   Typography,
//   Button,
//   TextField,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   Card,
//   CardMedia,
//   CardContent,
// } from "@mui/material";

// function App() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [responseText, setResponseText] = useState("");
//   const [history, setHistory] = useState([]);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first!");
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setResponseText(response.data.extracted_text);
//       setHistory((prevHistory) => [
//         ...prevHistory,
//         { fileName: selectedFile.name, extractedText: response.data.extracted_text },
//       ]);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       alert("An error occurred while processing the file.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleHistoryClick = (item) => {
//     setResponseText(item.extractedText);
//   };

//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       <Typography variant="h3" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
//         VisionRead 👀
//       </Typography>
//       <Typography variant="h6" align="center" gutterBottom>
//         VisionRead by Ollama: Precision OCR for Printed and Handwritten Text, Simplified.
//       </Typography>

//       <Box mb={10} />

//       <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
//         {/* File Upload Section */}
//         <Card>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Upload an Image
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <TextField
//                 type="file"
//                 onChange={handleFileChange}
//                 InputLabelProps={{ shrink: true }}
//                 variant="outlined"
//                 fullWidth
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleUpload}
//                 disabled={loading}
//               >
//                 {loading ? <CircularProgress size={24} /> : "Upload & Extract"}
//               </Button>
//             </Box>
//           </CardContent>
//         </Card>

//         {/* Preview Section */}
//         {previewImage && (
//           <Card>
//             <CardMedia
//               component="img"
//               height="200"
//               image={previewImage}
//               alt="Uploaded Preview"
//             />
//             <CardContent>
//               <Typography variant="body2" color="textSecondary">
//                 Preview of the uploaded image.
//               </Typography>
//             </CardContent>
//           </Card>
//         )}

//         {/* Extracted Text Section */}
//         <Card>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Extracted Text
//             </Typography>
//             <Box
//               sx={{
//                 minHeight: "150px",
//                 p: 2,
//                 border: "1px solid #ddd",
//                 borderRadius: "4px",
//                 backgroundColor: "#f9f9f9",
//               }}
//             >
//               {loading ? "Extracting text..." : responseText || "No text extracted yet."}
//             </Box>
//           </CardContent>
//         </Card>

//         {/* File History Section */}
//         <Card>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               File History
//             </Typography>
//             <List>
//               {history.map((item, index) => (
//                 <ListItem
//                   key={index}
//                   button
//                   onClick={() => handleHistoryClick(item)}
//                   sx={{ color: "primary.main" }}
//                 >
//                   <ListItemText primary={item.fileName} />
//                 </ListItem>
//               ))}
//             </List>
//           </CardContent>
//         </Card>
//       </Box>
//     </Container>
//   );
// }

// export default App;



// import React, { useState } from "react";
// import axios from "axios";
// import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// function App() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [responseText, setResponseText] = useState("");
//   const [history, setHistory] = useState([]);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first!");
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setResponseText(response.data.extracted_text);
//       setHistory((prevHistory) => [
//         ...prevHistory,
//         { fileName: selectedFile.name, extractedText: response.data.extracted_text },
//       ]);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       alert("An error occurred while processing the file.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleHistoryClick = (item) => {
//     setResponseText(item.extractedText);
//   };

//   return (
//     <Container className="mt-4">
//       <Row>
//         <Col>
//           <h1 className="text-center">OCR with Llama 3.2 Vision</h1>
//         </Col>
//       </Row>
//       <Row className="mt-4">
//         <Col md={6}>
//           <Form.Group>
//             <Form.Label>Upload Image</Form.Label>
//             <Form.Control type="file" onChange={handleFileChange} />
//           </Form.Group>
//           <Button className="mt-3" onClick={handleUpload} disabled={loading}>
//             {loading ? <Spinner animation="border" size="sm" /> : "Upload and Extract"}
//           </Button>
//         </Col>
//         <Col md={6}>
//           <h4>Extracted Text</h4>
//           <div className="border p-3" style={{ minHeight: "200px", backgroundColor: "#f8f9fa" }}>
//             {loading ? "Extracting text..." : responseText || "No text extracted yet."}
//           </div>
//         </Col>
//       </Row>
//       <Row className="mt-4">
//         <Col>
//           <h4>File History</h4>
//           <ul>
//             {history.map((item, index) => (
//               <li key={index} onClick={() => handleHistoryClick(item)} style={{ cursor: "pointer", color: "blue" }}>
//                 {item.fileName}
//               </li>
//             ))}
//           </ul>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default App;
