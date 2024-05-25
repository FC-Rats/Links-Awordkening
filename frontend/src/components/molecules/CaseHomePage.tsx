import React from "react";
import "../../assets/css/CaseHomePage.css";

export const CaseHomePage = (props: { title: string; pseudo: string; value: string; color: string; }) => {
    console.log("casehomepage"+ props.title+" "+props.pseudo+" "+props.value)
    return (
        <div className="case-home-page" style={{ backgroundColor: props.color }}>
            <p className="title-case">{props.title}</p>
            <p className="title-case">{props.pseudo}</p>
            <h2 className="value-case">{props.value}</h2>
        </div>
    );
};
