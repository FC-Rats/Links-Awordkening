import React from "react";
import "../../assets/css/RuleBox.css";

export const RuleBox = (props: {textRule:string;}) => {
    return (
        <div className="box-rule">
            <p>{props.textRule}</p>
        </div>
    );
};
