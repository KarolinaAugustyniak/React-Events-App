import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

const FriendList = () => {
    const [friendList, setFriendList] = useState([]);
    const { token } = useStateContext();

    useEffect(() => {
        const fetchFriendList = async () => {
            try {
                const response = await axiosClient.get("/friend-list", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setFriendList(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFriendList();
    }, [token]);

    const handleRemoveFriend = async friendId => {
        try {
            await axiosClient.delete(`/friends/${friendId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFriendList(prevList => prevList.filter(friend => friend.id !== friendId));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Friend List</h2>
            {friendList.length === 0 ? (
                <p>No friends found</p>
            ) : (
                <ul>
                    {friendList.map(friend => (
                        <li key={friend.id}>
                            {friend.name}
                            <button onClick={() => handleRemoveFriend(friend.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FriendList;
