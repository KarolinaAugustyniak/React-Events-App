import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import SavedEvent from "./SavedEvent";

export default function SavedEvents() {
    const [events, setEvents] = useState([]);
    const { user, token, setUser, setToken } = useStateContext();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/favorite-events/${user.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error: " + response.status);
                }
                return response.json();
            })
            .then(data => {
                const eventIds = data.map(event => event.event_id);
                setEvents(eventIds);
                console.log(data);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="upcoming">
            <h2 className="title title--24"> Saved events</h2>
            {events ? (
                <ul>
                    {events.map(event => (
                        <SavedEvent key={event} id={event} />
                    ))}
                </ul>
            ) : (
                <div>No results</div>
            )}
        </div>
    );
}
