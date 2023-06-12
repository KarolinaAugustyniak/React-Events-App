import React from "react";
import { Link } from "react-router-dom";
import Price from "./Price";

const Event = props => {
    const { id, name, images, classifications, _embedded, dates, priceRanges } = props.event;

    //made an array out of categories
    let categories = classifications
        .map(classification => [classification.segment.name, classification.genre.name])
        .flat();

    //remove duplicates
    categories = [...new Set(categories)];

    return (
        <Link to={"/event/" + id} className="card">
            <img className="card__img" height="182" width="324" src={images[1].url} alt={name} />
            <div className="card__content">
                <div className="card__info">
                    <p>
                        {dates.start.localDate} {dates.start.localTime && dates.start.localTime.slice(0, 5)}
                    </p>
                    <p>
                        {_embedded.venues[0].country.name}, {_embedded.venues[0].city.name}
                    </p>
                </div>
                <h3 className="card__title">{name}</h3>
                <div className="card__classifications">
                    {categories.map((category, index) => (
                        <p className="card__classification" key={index}>
                            {category}
                        </p>
                    ))}
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
