import React from "react";
import "../../assets/css/ReturnButton.css"
import Button from "@mui/material/Button/Button";

export const ReturnButton = ({
    handlePreviousPage,
  }: {
    handlePreviousPage: () => void;
  }) => {
    return (
        <Button variant="contained" className="return-button" size="large" onClick={() => handlePreviousPage()}>Retour en arrière</Button>
    );
};