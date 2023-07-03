import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../assets/img/guestAvatar.svg";
export default function UserCard({ user }) {
    const { id, name, username, profile_image } = user;
    console.log(user);
    const imageUrl = `${import.meta.env.VITE_API_BASE_URL}/storage/${profile_image}`;

    return (
        <li className="user-card">
            <Link to={`/user/${id}`} className="user-card__link">
                {profile_image ? (
                    <img src={imageUrl} alt={name} className="user-card__img" width="50" height="50" />
                ) : (
                    <img src={Avatar} alt={name} className="user-card__img" width="50" height="50" />
                )}
                <div>
                    <p className="user-card__name">{name}</p>
                    <p className="user-card__username">{username}</p>
                </div>
            </Link>
        </li>
    );
}
