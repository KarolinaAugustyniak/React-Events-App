import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import UserCard from "./UserCard";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const { token } = useStateContext();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosClient.get(`http://localhost:8000/api/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data.users);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <h2>Add Friends</h2>
            {users.length === 0 ? (
                <p>No users available</p>
            ) : (
                <ul>
                    {users.map(user => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </ul>
            )}
        </>
    );
};

export default UserList;
