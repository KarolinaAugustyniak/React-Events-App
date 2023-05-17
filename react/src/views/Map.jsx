import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import PinIcon from "../assets/img/pin_duotone_line.svg";
import { Icon, divIcon, point } from "leaflet";
import Layout from "../components/Layout";

import axios from "axios";
import { Link } from "react-router-dom";
import Price from "../components/Price";

// create custom icon
const customIcon = new Icon({
    iconUrl: PinIcon,
    iconSize: [38, 38],
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
    return new divIcon({
        html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
        className: "map__cluster",
        iconSize: point(33, 33, true),
    });
};

export default function Map() {
    const [markers, setMarkers] = useState([]);
    useEffect(() => {
        getMarkers();
    }, []);

    const getMarkers = () => {
        axios
            .get(
                `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=PL&size=200&apikey=${
                    import.meta.env.VITE_TICKETMASTER_API_KEY
                }`
            )
            .then((res) => {
                console.log(res.data._embedded.events);
                setMarkers(res.data._embedded.events);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const position = [52.240004, 21.022993];
    return (
        <Layout>
            <MapContainer
                center={position}
                zoom={13}
                style={{ minHeight: "700px", minWidth: "200px" }}
                className="map"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* map skin */}
                <TileLayer
                    attribution="CARTO"
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                <MarkerClusterGroup
                    chunkedLoading
                    iconCreateFunction={createClusterCustomIcon}
                >
                    {/* Mapping through the markers */}
                    {markers.map((marker) => (
                        <Marker
                            position={[
                                marker._embedded.venues[0].location.latitude,
                                marker._embedded.venues[0].location.longitude,
                            ]}
                            icon={customIcon}
                            key={marker.id}
                        >
                            <Popup>
                                <p className="marker__name">{marker.name}</p>
                                {marker.classifications[0].segment && (
                                    <p>
                                        {marker.classifications[0].segment.name}
                                    </p>
                                )}
                                <p className="marker__time">
                                    {marker.dates.start.localDate}
                                </p>
                                <Price price={marker.priceRanges} />
                                <Link
                                    to={"/event/" + marker.id}
                                    className="marker__btn btn btn--teal"
                                >
                                    More
                                </Link>
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
        </Layout>
    );
}
