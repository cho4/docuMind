import React, { useState } from 'react';
import axios from 'axios';

function DragAndDrop({ callback }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);

    const file = event.dataTransfer.files[0];
    if (file.type === 'application/pdf') {
      const formData = new FormData();
      formData.append('pdf', file);

      axios.post('/upload_pdf', formData)
        .then(response => {
          if (response.data.success) {
            callback(true);
          } else {
            alert('Upload failed. Please try again later.');
          }
        })
        .catch(error => {
          console.error(error);
          alert('An error occurred while uploading the PDF. Please try again later.');
        });
    } else {
      alert('Please upload a PDF file.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: isDragOver ? '#f0f0f0' : '#ffffff',
        border: '1px solid #d0d0d0',
        borderRadius: '4px',
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      Drag &amp; Drop a PDF file to start chatting.
    </div>
  );
}

export default DragAndDrop;
