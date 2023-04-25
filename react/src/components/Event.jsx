import React from "react";
import styled from "styled-components";

const Event = (props) => {
    const { name, images, classifications, _embedded, dates, url } =
        props.event;

    return (
        <div className="event">
            <img
                className="event__img"
                height="182"
                width="324"
                src={images[1].url}
                alt={name}
            />
            <div className="event__content">
                <div className="event__info">
                    <p>{dates.start.localDate}</p>
                    <p>
                        {_embedded.venues[0].country.name},{" "}
                        {_embedded.venues[0].city.name}
                    </p>
                </div>
                <h3 className="event__title">{name}</h3>
                <div className="event__classifications">
                    <p className="event__genre">
                        {classifications[0].segment.name}
                    </p>

                    {classifications.map((classification, index) => (
                        <p key={index} className="event__genre">
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
                <a href={url} className="btn btn--ocean" target="_blank">
                    More
                </a>
            </div>
        </div>
    );
};

export default Event;
