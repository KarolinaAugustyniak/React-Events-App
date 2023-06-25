import React, { useState } from "react";
import axios from "axios";
import axiosClient from "../axios-client";

const ProfilePictureUpload = ({ userId }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = event => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append("profile_picture", selectedFile);

        axiosClient
            .post(`/users/${userId}/profile-picture`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Profile Picture</button>
        </div>
    );
};

export default ProfilePictureUpload;
