import React, { useState } from "react";
import "../../assets/css/SubmitButton.css"


export const CenteredTitle = (props:{text:string;}) => {

    return (
        <h1>{props.text}</h1>
    );
};
