import React, { useState } from 'react';
import './MergePDF.css';

export default function MergePDF() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [downloadLink, setDownloadLink] = useState(null);

    const host = 'http://localhost:5000/api/conversion/merge';

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };


    const downloadMergedPDF = async (formData) => {
        try {
            // Make a POST request to the server to merge and download the files
            const response = await fetch(host,
                {
                    method: 'POST',
                    body: formData, // Assuming formData is already defined with the files to upload
                });

            console.log(response)

            // Check if the response is successful
            if (!response.ok) {
                throw new Error('File merge request failed');
            }

            console.log('response ', response);

            // Convert response to blob
            const blob = await response.blob();
            console.log('blob ', blob);

            // Create a URL for the blob
            const blobUrl = URL.createObjectURL(blob);

            // Set the Download button in state
            setDownloadLink(blobUrl);

        } catch (error) {
            console.error('Error in home.jsx:', error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }

        // Make a POST request to your backend endpoint
        downloadMergedPDF(formData);

        document.getElementById('file-input').value = '';
    };

    return (
        <>
            <div className="container merge-text">
                <h1>Merge PDF files</h1>
            </div>

            <div className="container merge-pdf-card">

                <form onSubmit={handleSubmit}>
                    <input type="file" accept='.pdf' id="file-input" name='files' multiple onChange={handleFileChange} />
                    <button type="submit" disabled={selectedFiles.length === 0}>Upload</button>
                </form>
                {downloadLink &&
                    <div className="download-button">
                        <button onClick={() => {
                            const link = document.createElement('a');
                            link.href = downloadLink;
                            link.setAttribute('download', 'mergedPDF.pdf');
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            setDownloadLink(null);
                        }}>
                            Download file
                        </button>
                    </div>
                }
            </div>
        </>
    );
}
