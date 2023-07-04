import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useStateContext } from "../contexts/ContextProvider";
import FavoriteButton from "../components/FavoriteButton";
import Classifications from "../components/Classifications";
import SizeAdjustedImage from "../components/SizeAdjustedImage";
import Price from "../components/Price";
import PinIcon from "../assets/img/Pin_light.svg";
import CalendarIcon from "../assets/img/Calendar_light.svg";
import MiniMap from "../components/MiniMap";

function EventView() {
    let params = useParams();
    const [details, setDetails] = useState({});
    const [images, setImages] = useState("");
    const { user } = useStateContext();
    const [categories, setCategories] = useState([]);

    const fetchDetails = async () => {
        const data = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events/${params.eventID}.json?apikey=${
                import.meta.env.VITE_TICKETMASTER_API_KEY
            }`
        );
        const detailData = await data.json();
        setImages(detailData.images);
        setCategories(
            detailData.classifications
                .map(classification => [classification.segment.name, classification.genre.name])
                .flat()
        );
        setDetails(detailData);
    };

    useEffect(() => {
        fetchDetails();
    }, [params.eventID]);

    return (
        <Layout>
            <div className="event container">
                <div className="event__left">
                    {images && <SizeAdjustedImage images={images} width={920} />}
                    <div className="event__content">
                        <div>
                            <h1 className="event__title title">{details.name}</h1>
                            <Classifications categories={categories} />
                            <div className="event__favorite">
                                Add this event to favorites <FavoriteButton eventId={params.eventID} userId={user.id} />
                            </div>
                            <button>Invite a friend</button>
                        </div>
                        {details.priceRanges && <Price priceRanges={details.priceRanges} />}
                    </div>
                </div>
                <div className="event__right">
                    {details._embedded?.venues && (
                        <div className="event__details">
                            <img src={PinIcon} alt="pin" />
                            <div>
                                <p>{details._embedded.venues[0].name}</p>
                                <p>
                                    {details._embedded.venues[0].country?.name}
                                    {", "}
                                    {details._embedded.venues[0].state?.name}
                                    {" - "}
                                    {details._embedded.venues[0].city?.name}
                                </p>
                                <p> {details._embedded.venues[0].address?.line1}</p>
                            </div>
                        </div>
                    )}
                    <div className="event__details">
                        <img src={CalendarIcon} alt="calendar" />
                        <div>
                            <p>{details.dates?.start?.localDate}</p>
                            <p>{details.dates?.start?.localTime?.slice(0, 5)}</p>
                        </div>
                    </div>
                    {details._embedded?.venues && <MiniMap location={details._embedded?.venues[0]?.location} />}
                </div>
            </div>
        </Layout>
    );
}

export default EventView;
