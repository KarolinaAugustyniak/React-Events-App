import React from "react";
import styled from "styled-components";
import { Outlet, Link } from "react-router-dom";

const Event = (props) => {
    const { id, name, images, classifications, _embedded, dates, url } =
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

                    {classifications.map((classification, index) => (
                        <p key={index} className="card__genre">
                            {classification.genre && classification.genre.name
                                ? classification.genre.name + ", "
                                : ""}
                            {classification.subGenre &&
                            classification.subGenre.name
                                ? classification.subGenre.name
                                : ""}
                        </p>
                    ))}
                </div>
                <a href={url} className="btn btn--teal" target="_blank">
                    More
                </a>
            </div>
        </Link>
    );
};

export default Event;
