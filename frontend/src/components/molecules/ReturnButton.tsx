import React from "react";
import "../../assets/css/ReturnButton.css"
import Button from "@mui/material/Button/Button";

export const ReturnButton = ({
    handlePreviousPage,
    handleQuit,
  }: {
    handlePreviousPage: () => void;
    handleQuit?: (event: React.FormEvent) => void;
  }) => {

  const handleClick = (event: React.FormEvent) => {
    if (handleQuit) {
        handleQuit(event);
    } else {
        handlePreviousPage();
    }
  };
  const buttonText = handleQuit ? "Quitter la partie " : "Retour en arrière";
  const buttonSx = handleQuit
      ? { backgroundColor: "#912D2D", color: "white", "&:hover": { backgroundColor: "#a24343" } }
      : { backgroundColor: "#6A5138", color: "white", "&:hover": { backgroundColor: "#7a604b" } };

  return (
      <Button variant="contained" sx={buttonSx} className="return-button" size="large" onClick={handleClick}>
          {buttonText}
      </Button>
  );
};