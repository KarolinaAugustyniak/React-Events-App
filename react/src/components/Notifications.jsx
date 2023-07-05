import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import UserCard from "./UserCard";

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

    console.log(friendRequests);
    return (
        <div className="section notifications">
            <h2 className="notifications__title">Notifications</h2>
            <p className="notifications__subtitle">
                {friendRequests.length} {friendRequests.length === 1 ? "notification" : "notifications"}
            </p>
            <h3 className="notifications__heading">Friend Requests</h3>
            {friendRequests.length == 0 ? (
                <p>No friend requests</p>
            ) : (
                <ul className="user-list">
                    {friendRequests.map(request => (
                        <UserCard
                            key={request.id}
                            user={request.friend}
                            acceptFriendRequest={acceptFriendRequest}
                            request={request}
                        />
                    ))}
                </ul>
            )}
            <h3 className="notifications__heading">Event invites</h3>
            <p>No invitations to events</p>
        </div>
    );
};

export default Notifications;
