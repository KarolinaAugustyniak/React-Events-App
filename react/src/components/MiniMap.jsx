import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import PinIcon from "../assets/img/pin_duotone_line.svg";
import { Icon } from "leaflet";

// create custom icon
const customIcon = new Icon({
    iconUrl: PinIcon,
    iconSize: [38, 38]
});

export default function MiniMap({ location }) {
    const marker = [location?.latitude, location?.longitude];

    return (
        <MapContainer center={marker} zoom={14} style={{ minHeight: "540px", minWidth: "200px" }} className="mini-map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* map skin */}
            <TileLayer attribution="CARTO" url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
            <Marker position={marker} icon={customIcon}></Marker>
        </MapContainer>
    );
}
