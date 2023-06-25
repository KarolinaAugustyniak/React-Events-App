import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import FavoriteEvent from "./FavoriteEvent";

export default function FavoriteEvents() {
    const [events, setEvents] = useState([]);
    const { user, token, setUser, setToken } = useStateContext();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/favorite-events`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error: " + response.status);
                }
                return response.json();
            })
            .then(data => {
                const eventIds = data.map(event => event.event_id).slice(0, 3);
                setEvents(eventIds);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2 className="title title--24"> Favorite events</h2>
            {events ? (
                <ul>
                    {events.map(event => (
                        <FavoriteEvent key={event} id={event} />
                    ))}
                </ul>
            ) : (
                <div>No results</div>
            )}
        </div>
    );
}
