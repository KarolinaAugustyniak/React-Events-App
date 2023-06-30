import React, { useState } from "react";
import axios from "axios";
import axiosClient from "../axios-client";

const ProfilePictureUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState(null);

    const handleFileChange = event => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append("profile_picture", selectedFile);

        axiosClient
            .post(`/users/profile-picture`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                console.log(response.data.message);
                setMessage(response.data.message);
            })
            .catch(error => {
                console.error(error);
                setMessage("An error occurred. Try again later.");
            });
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Profile Picture</button>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ProfilePictureUpload;
