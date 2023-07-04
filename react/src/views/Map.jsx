import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import Event from "../components/Event";
import PinIcon from "../assets/img/pin_duotone_line.svg";
import { Icon, divIcon, point } from "leaflet";
import Layout from "../components/Layout";
import axios from "axios";

// create custom icon
const customIcon = new Icon({
    iconUrl: PinIcon,
    iconSize: [38, 38]
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
    return new divIcon({
        html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
        className: "map__cluster",
        iconSize: point(33, 33, true)
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
            .then(res => {
                console.log(res.data._embedded.events);
                setMarkers(res.data._embedded.events);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const position = [51.967809, 19.798757];
    return (
        <Layout>
            <MapContainer center={position} zoom={7} style={{ minHeight: "300px", minWidth: "200px" }} className="map">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* map skin */}
                <TileLayer attribution="CARTO" url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

                <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
                    {/* Mapping through the markers */}
                    {markers.map(marker => (
                        <Marker
                            position={[
                                marker._embedded.venues[0].location.latitude,
                                marker._embedded.venues[0].location.longitude
                            ]}
                            icon={customIcon}
                            key={marker.id}
                        >
                            <Popup>
                                <Event key={marker.id} event={marker} />
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
        </Layout>
    );
}
