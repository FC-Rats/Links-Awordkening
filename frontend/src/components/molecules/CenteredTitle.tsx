import React, { useState } from "react";
import "../../assets/css/CenteredTitle.css"


export const CenteredTitle = (props:{text:string;}) => {

    return (
        <h1 className="h1-centered">{props.text}</h1>
    );
};
