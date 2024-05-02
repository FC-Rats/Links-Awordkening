import React from "react";
import "../../assets/css/GifBox.css";

export const GifBox = (props: {gifUrl:string; altText: string; color: string;}) => {
    return (
        <div className="gif-box-rule" style={{ backgroundColor: props.color }}>
            <img className="gif" src={props.gifUrl} alt={props.altText} />
        </div>
    );
};
