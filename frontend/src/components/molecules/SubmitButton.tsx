import React from "react";
import "../../assets/css/SubmitButton.css"
import Button from "@mui/material/Button/Button";


export const SubmitButton = (props:{text:string;}) => {


    return (
        <Button variant="contained" className="submit-button" type="submit" size="large">{props.text}</Button>
    );
};
