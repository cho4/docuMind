import React, { useState } from 'react';
import axios from 'axios';

const FileDropZone = ({ callback }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];

    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed');
      return;
    }

    try {
        const formData = new FormData();
        formData.append('file', file);

        const res = axios.post('http://localhost:5000/upload_pdf/', formData);

        res.then((response) => {
            if (response.data.success) {
                callback();
            } else {
                alert('File upload failed');
            }
        }).catch((error) => {
            console.error(error);
            alert('File upload failed');
        })
    } catch(e) {
        console.error(e);
    }
}

  return (
    <div
      style={{
        border: '3px solid white',
        borderRadius: '10px',
        margin: '30px',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDragging ? '#c3c3c3' : 'grey',
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
        transition: 'background-color 0.2s ease-in-out',
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      Drag & Drop a PDF file to start chatting.
    </div>
  );
};

export default FileDropZone;
