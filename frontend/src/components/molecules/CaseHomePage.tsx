import React from "react";
import "../../assets/css/CaseHomePage.css";

export const CaseHomePage = (props: { title: string; value: string; color: string; }) => {
    return (
        <div className="case-home-page" style={{ backgroundColor: props.color }}>
            <p className="title-case">{props.title}</p>
            <h2 className="value-case">{props.value}</h2>
        </div>
    );
};
