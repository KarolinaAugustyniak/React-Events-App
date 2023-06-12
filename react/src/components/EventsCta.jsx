import React from "react";
import Image from "../assets/img/undraw_travel_plans.svg";
import { Link } from "react-router-dom";

export default function EventsCta() {
    return (
        <div className="events-cta">
            <div className="events-cta__content">
                <h1 className=" title title--30">Explore events</h1>
                <p className="events-cta__text">
                    Immerse in upcoming events: Explore festivals, concerts, sports, and more. Unleash your passion for
                    entertainment and adventure in a world of endless possibilities.
                </p>
                <Link to="/" className="btn btn--teal">
                    Explore events
                </Link>
            </div>
            <img className="events-cta__img" width="114" height="251" src={Image} alt="view all events" />
        </div>
    );
}
