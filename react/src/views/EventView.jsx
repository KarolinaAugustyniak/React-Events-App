import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import FavoriteButton from "../components/FavoriteButton";

function EventView() {
    let params = useParams();
    const [details, setDetails] = useState({});
    const { user, token, setUser, setToken } = useStateContext();

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    const fetchDetails = async () => {
        const data = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events/${params.eventID}.json?apikey=${
                import.meta.env.VITE_TICKETMASTER_API_KEY
            }`
        );
        const detailData = await data.json();
        setDetails(detailData);
    };

    useEffect(() => {
        fetchDetails();
    }, [params.eventID]);

    // console.log(details);

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
                <FavoriteButton eventId={params.eventID} userId={user.id} />
                {/* <img src={details.seatmap.staticUrl} /> */}
            </div>
        </Layout>
    );
}

export default EventView;
