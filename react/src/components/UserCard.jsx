import React from "react";
import { Link, useLocation } from "react-router-dom";
import Avatar from "../assets/img/guestAvatar.svg";
import DeleteIcon from "../assets/img/Close_round_light.svg";
import FriendRequestButton from "./FriendRequestButton";
import AcceptIcon from "../assets/img/Add_square_light.svg";

export default function UserCard({ user, handleRemoveFriend, sendRequest, request, acceptFriendRequest }) {
    const { id, name, username, profile_image } = user;
    const imageUrl = `${import.meta.env.VITE_API_BASE_URL}/storage/${profile_image}`;

    const location = useLocation();
    const isUserProfilePage = location.pathname.startsWith("/user/");

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
            {!isUserProfilePage && handleRemoveFriend && (
                <button className="user-card__button" title="delete" onClick={() => handleRemoveFriend(friend.id)}>
                    <img src={DeleteIcon} alt="delete" />
                </button>
            )}
            {sendRequest && <FriendRequestButton userId={id} />}
            {acceptFriendRequest && (
                <button className="user-card__button" title="accept" onClick={() => acceptFriendRequest(request.id)}>
                    <img src={AcceptIcon} alt="accept" />
                </button>
            )}
        </li>
    );
}
