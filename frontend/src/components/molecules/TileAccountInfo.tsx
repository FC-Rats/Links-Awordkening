import React from "react";
import "../../assets/css/TileAccountInfo.css";

export const TileAccountInfo = (props: {title:string; value:number; subTitle:string; imgUrl:string; imgAlt:string;}) => {
    return (
        <div className="tile-account-info">
            <div className="text-content">
                <h2>{props.title}</h2>
                <p className="value">{props.value}</p>
                <p className="sub-title">{props.subTitle}</p>
            </div>
            <img  src={props.imgUrl} alt={props.imgAlt}  className="responsive-image"/>
        </div>
    );
};
