import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import UserList from "./UserList";

const FriendList = () => {
    const [friendList, setFriendList] = useState([]);
    const { token } = useStateContext();
    const [modal, setModal] = useState(false);
    const modalRef = useRef(null);

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

    const handleClick = () => {
        setModal(!modal);
    };

    const handleModalClick = event => {
        if (!modalRef.current.contains(event.target)) {
            setModal(false);
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
            <button onClick={handleClick}>Add a new friend</button>
            {modal && (
                <div className="modal" onClick={handleModalClick}>
                    <div className="modal__content" ref={modalRef}>
                        <button onClick={handleClick} className="modal__close">
                            close
                        </button>
                        <UserList />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FriendList;
