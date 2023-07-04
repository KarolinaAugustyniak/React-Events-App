import React from "react";

export default function SizeAdjustedImage(props) {
    const { images, width } = props;

    let bestImage = images[0];
    let closestWidthDiff = Infinity;

    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const widthDiff = image.width - width;

        if (widthDiff >= 0 && widthDiff < closestWidthDiff) {
            bestImage = image;
            closestWidthDiff = widthDiff;
        }
    }
    return <img src={bestImage?.url} />;
}
