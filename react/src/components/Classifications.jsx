import React from "react";

export default function Classifications({ categories }) {
    return (
        <div className="classifications">
            {categories.map((category, index) => (
                <p className="classification" key={index}>
                    {category}
                </p>
            ))}
        </div>
    );
}
