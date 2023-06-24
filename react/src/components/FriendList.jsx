import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";

const FriendList = () => {
    const [friendList, setFriendList] = useState([]);
    const { token } = useStateContext();

    useEffect(() => {
        const fetchFriendList = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/friend-list", {
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

    return (
        <div>
            <h2>Friend List</h2>
            {friendList.length === 0 ? (
                <p>No friends found</p>
            ) : (
                <ul>
                    {friendList.map(friend => (
                        <li key={friend.id}>{friend.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FriendList;
