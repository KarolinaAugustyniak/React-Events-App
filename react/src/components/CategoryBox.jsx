import React from "react";

const CategoryBox = ({ label, imgSrc, handleCategoryChange }) => {
    return (
        <label className="categories__box">
            <p className="categories__title ">{label}</p>
            <input
                type="checkbox"
                name="category"
                className="categories__checkbox"
                value={label}
                onChange={handleCategoryChange}
            />
            <img src={imgSrc} alt={label} className="categories__img" />
        </label>
    );
};

export default CategoryBox;
