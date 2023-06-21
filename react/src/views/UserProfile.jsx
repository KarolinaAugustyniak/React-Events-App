import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import FriendRequestButton from "../components/FriendRequestButton";

export default function UserProfile() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserProfile();
    }, [userId]);
    console.log(userId);

    if (!user) {
        return (
            <Layout>
                <div>Loading...</div>
            </Layout>
        );
    }
    return (
        <Layout>
            <h1>User Profile</h1>
            <p>Name: {user.name}</p>
            <p>Username: {user.username}</p>
            <FriendRequestButton userId={userId} />
        </Layout>
    );
}
