import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";

const Notifications = () => {
    const [friendRequests, setFriendRequests] = useState([]);
    const { token } = useStateContext();

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/get-friend-requests`, {
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
            await axios.patch(`http://localhost:8000/api/accept-friend-request/${friendRequestId}`, null, {
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
