import React from "react";

export default function Price({ priceRanges }) {
    const standardIncludingFeesRange = priceRanges.find(
        (range) => range.type === "standard including fees"
    );

    if (standardIncludingFeesRange) {
        const currency = " " + standardIncludingFeesRange.currency;
        //price range
        let minPrice = standardIncludingFeesRange.min.toString();
        let maxPrice = standardIncludingFeesRange.max.toString();
        //adding spaces
        minPrice = minPrice.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        maxPrice = maxPrice.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return (
            <div className="price">
                <p className="price__range">
                    {minPrice == maxPrice
                        ? minPrice + currency
                        : minPrice + " - " + maxPrice + currency}
                </p>
                <p className="price__info">(Standard including fees)</p>
            </div>
        );
    } else {
        return null;
    }
}
