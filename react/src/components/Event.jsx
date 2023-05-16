import React from "react";
import styled from "styled-components";
import { Outlet, Link } from "react-router-dom";
import Price from "./Price";

const Event = (props) => {
    const { id, name, images, classifications, _embedded, dates, priceRanges } =
        props.event;

    return (
        <Link to={"/event/" + id} className="card">
            <img
                className="card__img"
                height="182"
                width="324"
                src={images[1].url}
                alt={name}
            />
            <div className="card__content">
                <div className="card__info">
                    <p>{dates.start.localDate}</p>
                    <p>
                        {_embedded.venues[0].country.name},{" "}
                        {_embedded.venues[0].city.name}
                    </p>
                </div>
                <h3 className="card__title">{name}</h3>
                <div className="card__classifications">
                    <p className="card__genre">
                        {classifications[0].segment.name}
                    </p>
                    <p className="card__genre">
                        {classifications[0].genre.name}
                    </p>
                </div>
                <div className="card__wrapper">
                    <button className="btn btn--teal" target="_blank">
                        More
                    </button>
                    {priceRanges && <Price priceRanges={priceRanges} />}
                </div>
            </div>
        </Link>
    );
};

export default Event;
