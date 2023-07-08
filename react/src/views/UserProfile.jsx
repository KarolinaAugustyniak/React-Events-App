import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import FriendRequestButton from "../components/FriendRequestButton";
import FriendList from "../components/FriendList";
import FavoriteEvents from "../components/FavoriteEvents.jsx";
import PinIcon from "../assets/img/Pin_light.svg";
import Avatar from "../assets/img/guestAvatar.svg";

export default function UserProfile() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}`);
                setUser(response.data);
                setImageUrl(`${import.meta.env.VITE_API_BASE_URL}/storage/${response.data.profile_image}`);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserProfile();
    }, [userId]);

    if (!user) {
        return (
            <Layout>
                <div>Loading...</div>
            </Layout>
        );
    }

    console.log(user);

    return (
        <Layout>
            <div className="container">
                <div className="user">
                    <div className="section user__profile">
                        {user.profile_image ? (
                            <img src={imageUrl} alt={user.name} className="user__img" width="400" height="400" />
                        ) : (
                            <img src={Avatar} alt="default avatar" className="user__img" width="400" height="400" />
                        )}
                        <div className="user__info">
                            <div className="user__wrapper">
                                <div>
                                    <h1>{user.name}</h1>
                                    <p> {user.username}</p>
                                    {user.location && (
                                        <div className="user__location">
                                            <img src={PinIcon} alt="location" />
                                            {user.location}
                                        </div>
                                    )}
                                </div>
                                {parseInt(userId) !== user.id && <FriendRequestButton userId={userId} />}
                            </div>
                            <p className="user__bio"> {user.description}</p>
                        </div>
                    </div>
                    <FriendList userId={user.id} />
                </div>
                <FavoriteEvents userId={user.id} />
            </div>
        </Layout>
    );
}
