import React, { useEffect, useState } from "react";

export default function FavoriteEvent(props) {
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

    console.log(details);
    return (
        <li className="favorite-event">
            <div className="favorite-event__left">
                <p className="favorite-event__name">{details.name}</p>
                <p className="favorite-event__location">
                    {/* {details._embedded.venues[0]?.country?.name} - {details._embedded?.venues[0]?.city?.name} */}
                </p>
            </div>
            <div className="favorite-event__right">
                <p className="favorite-event__date"> {details.dates?.start?.localDate ?? ""} </p>
                <p className="favorite-event__time">{details.dates?.start?.localTime?.slice(0, 5)}</p>
            </div>
        </li>
    );
}
