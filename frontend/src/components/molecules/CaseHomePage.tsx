import React from "react";
import "../../assets/css/CaseHomePage.css";

export const CaseHomePage = (props: { title: string; pseudo: string; value: string; color: string; }) => {
    const renderIcon = () => {
        switch (props.title) {
            case '#1':
                return "/img/icons/gold.png";
            case '#2':
                return "/img/icons/silver.png";
            case '#3':
                return "/img/icons/bronze.png";
            default:
                return "";
        }
    };
    return (
        <div className="case-home-page" style={{ backgroundColor: props.color }} >
            {renderIcon() && <img src={renderIcon()} alt="icon" className="title-icon" />}
            <p className="title-case">{props.pseudo}</p>
            <h2 className="value-case">{props.value}</h2>
        </div>
    );
};
