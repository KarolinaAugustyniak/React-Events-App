import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import Layout from "../components/Layout";

function EventView() {
    let params = useParams();
    const [details, setDetails] = useState({});

    const fetchDetails = async () => {
        const data = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events/${
                params.eventID
            }.json?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}`
        );
        const detailData = await data.json();
        setDetails(detailData);
    };

    useEffect(() => {
        fetchDetails();
    }, [params.eventID]);

    console.log(details);

    //cut seconds from time
    // let startTime = details.dates.start.localTime;
    // startTime = startTime.substring(0, startTime.length - 3);

    return (
        <Layout>
            <div className="event">
                {/* <img
                src={details.images[5].url}
                alt={details.attribution ? details.attribution : ""}
            /> */}
                <h1 className="event__title">{details.name}</h1>
                {/* <p>{details.dates.start.localDate}</p>
            <p>{startTime}</p> */}
                <a href={details.url} className="btn btn--teal" target="_blank">
                    Get the tickets
                </a>
                {/* <img src={details.seatmap.staticUrl} /> */}
            </div>
        </Layout>
    );
}

export default EventView;
