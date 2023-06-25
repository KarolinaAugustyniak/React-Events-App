import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

const Notifications = () => {
    const [friendRequests, setFriendRequests] = useState([]);
    const { token } = useStateContext();

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const response = await axiosClient.get(`/get-friend-requests`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setFriendRequests(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFriendRequests();
    }, []);

    const acceptFriendRequest = async friendRequestId => {
        try {
            await axiosClient.patch(`/accept-friend-request/${friendRequestId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Update the friend requests list after accepting
            setFriendRequests(prevFriendRequests =>
                prevFriendRequests.filter(request => request.id !== friendRequestId)
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Friend Requests</h2>
            {friendRequests.length == 0 ? (
                <p>No friend requests</p>
            ) : (
                <ul>
                    {friendRequests.map(request => (
                        <li key={request.id}>
                            <span>{request.friend_name}</span>
                            <button onClick={() => acceptFriendRequest(request.id)}>Accept</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notifications;
