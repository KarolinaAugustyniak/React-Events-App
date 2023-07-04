import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

const FriendRequestButton = ({ userId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const { user, token } = useStateContext();

    useEffect(() => {
        try {
            axiosClient
                .get(`/get-is-friend-request-send/${userId}`, null, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    setIsSent(response.data.isSent);
                });
        } catch (error) {
            console.error(error);
        }
    }, [user]);

    const sendFriendRequest = async () => {
        setIsLoading(true);

        try {
            await axiosClient.post(`/send-friend-request/${userId}`, null, {
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
        return (
            <button disabled className="btn btn--teal btn--disabled">
                Sending...
            </button>
        );
    }

    if (isSent) {
        return (
            <button disabled className="btn btn--teal btn--disabled">
                Request Sent
            </button>
        );
    }

    return (
        <button onClick={sendFriendRequest} className="btn btn--teal">
            Send Friend Request
        </button>
    );
};

export default FriendRequestButton;
