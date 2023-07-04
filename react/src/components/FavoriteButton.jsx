import React, { useEffect, useState } from "react";
import Icon from "../assets/img/favorite_light.svg";
import IconFilled from "../assets/img/favorite_filled.svg";
import axios from "axios";

export default function FavoriteButton(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const [favorite, setFavorite] = useState(false);
    const { eventId, userId } = props;

    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/favorite-event/${userId}/${eventId}`);
                setFavorite(response.data);
            } catch (error) {
                console.error("Error fetching favorite status:", error);
            }
        };

        fetchFavoriteStatus();
    }, [userId]);

    const handleClick = () => {
        if (favorite) {
            // If already marked as favorite, send a DELETE request to remove it
            fetch(`http://127.0.0.1:8000/api/favorite-events/${userId}/${eventId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    if (res.ok) {
                        setErrorMessage("");
                        setFavorite(false);
                    } else {
                        throw new Error(res);
                    }
                })
                .catch(error => {
                    console.error(error);
                    setErrorMessage("An error occurred while removing from favorites");
                });
        } else {
            fetch("http://127.0.0.1:8000/api/favorite-events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_id: userId, event_id: eventId })
            })
                .then(res => {
                    console.log(res);
                    if (res.ok) {
                        setFavorite(true);
                        setErrorMessage("");
                        return res.json();
                    } else {
                        throw new Error("An error occurred while saving");
                    }
                })
                .then(result => {
                    console.log(result);
                })
                .catch(error => {
                    console.error(error);
                    setErrorMessage("An error occurred while saving");
                });
        }
    };

    return (
        <div>
            <button className="favorite" onClick={handleClick}>
                {favorite ? <img src={IconFilled} alt="heart icon filled" /> : <img src={Icon} alt="heart icon" />}
            </button>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}
