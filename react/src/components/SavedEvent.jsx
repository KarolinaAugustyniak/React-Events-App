import React, { useEffect, useState } from "react";

export default function SavedEvent(props) {
    const [details, setDetails] = useState({});

    const fetchDetails = async () => {
        const data = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events/${props.id}.json?apikey=${
                import.meta.env.VITE_TICKETMASTER_API_KEY
            }`
        );
        const detailData = await data.json();
        setDetails(detailData);
        console.log("fetch" + detailData.name);
    };

    useEffect(() => {
        fetchDetails();
    }, [props.id]);

    console.log(details);
    return (
        <li className="saved-event">
            <div className="saved-event__left">
                <p className="saved-event__name">{details.name}</p>
                <p className="saved-event__location">
                    {/* {details._embedded.venues[0]?.country?.name} - {details._embedded?.venues[0]?.city?.name} */}
                </p>
            </div>
            <div className="saved-event__right">
                <p className="saved-event__date"> {details.dates?.start?.localDate ?? "N/A"} </p>
                <p className="saved-event__time">{details.dates?.start?.localTime?.slice(0, 5)}</p>
            </div>
        </li>
    );
}
