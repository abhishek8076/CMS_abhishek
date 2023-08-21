import React, { useState } from 'react';

function FileUploadPage() {
    // const [selectedFile, setSelectedFile] = useState();
    // const [isFilePicked, setIsFilePicked] = useState(false);

    // const changeHandler = (event) => {
    //     setSelectedFile(event.target.files[0]);
    //     setIsSelected(true);
    // };

    const handleSubmission = () => {
        const formData = new FormData();

        formData.append('File');

        fetch(
            'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <div>
            <input type="file" name="file"  />



          
            <div>
                <button >Submit</button>
            </div>
        </div>
    )
}
export default FileUploadPage;