import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EventCard(props) {
    const [details, setDetails] = useState({});

    const fetchDetails = async () => {
        const data = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events/${props.id}.json?apikey=${
                import.meta.env.VITE_TICKETMASTER_API_KEY
            }`
        );
        const detailData = await data.json();
        setDetails(detailData);
    };

    useEffect(() => {
        fetchDetails();
    }, [props.id]);

    return (
        <li className="event-card">
            <Link to={"/event/" + details.id} className="event-card__link">
                <div className="event-card__left">
                    <p className="event-card__name">{details.name}</p>
                    <p className="event-card__location">
                        {details._embedded?.venues[0]?.country?.name}, {details._embedded?.venues[0]?.city?.name}{" "}
                        {" • "}
                        {details._embedded?.venues[0]?.name}
                    </p>
                </div>
                <div className="event-card__right">
                    <p className="event-card__date"> {details.dates?.start?.localDate ?? ""} </p>
                    <p className="event-card__time">{details.dates?.start?.localTime?.slice(0, 5)}</p>
                </div>
            </Link>
        </li>
    );
}
