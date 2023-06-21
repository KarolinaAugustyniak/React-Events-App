import React, { useState } from "react";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";

const FriendRequestButton = ({ userId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const { user, token, setUser, setToken } = useStateContext();

    const sendFriendRequest = async () => {
        setIsLoading(true);

        try {
            await axios.post(`http://127.0.0.1:8000/api/send-friend-request/${userId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setIsSent(true);
        } catch (error) {
            console.error(error);
        }

        setIsLoading(false);
    };

    if (isLoading) {
        return <button disabled>Sending...</button>;
    }

    if (isSent) {
        return <button disabled>Request Sent</button>;
    }

    return (
        <button onClick={sendFriendRequest} className="btn btn--teal">
            Send Friend Request
        </button>
    );
};

export default FriendRequestButton;
