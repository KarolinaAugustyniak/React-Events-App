import React, { useState } from "react";

const CategoryBox = ({ label, imgSrc, handleCategoryChange, isActive }) => {
    return (
        <label
            className={`categories__box ${
                isActive ? "" : "categories__box--inactive"
            }`}
        >
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
