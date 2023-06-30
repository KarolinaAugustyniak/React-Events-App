import React from "react";
import { Link, useLocation } from "react-router-dom";
import SettingsIcon from "../assets/img/Setting_line_duotone_line.svg";
import MapIcon from "../assets/img/Map_light.svg";
import HomeIcon from "../assets/img/Home_light.svg";
import TicketIcon from "../assets/img/Ticket_light.svg";

function AsideLinks() {
    const location = useLocation();

    const links = [
        { to: "/dashboard", label: "Dashboard", icon: HomeIcon },
        { to: "/", label: "Events", icon: TicketIcon },
        { to: "/map", label: "Map", icon: MapIcon },
        { to: "/settings", label: "Settings", icon: SettingsIcon }
    ];

    return (
        <nav className="aside__nav">
            {links.map(link => (
                <Link
                    key={link.to}
                    to={link.to}
                    className={`aside__link ${location.pathname === link.to ? "aside__link--active" : ""}`}
                >
                    <img src={link.icon} alt={`${link.label} Icon`} />
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}

export default AsideLinks;
