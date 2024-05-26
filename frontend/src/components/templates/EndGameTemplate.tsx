import React, { useState } from "react";
import { ContainerEndGame } from "../organisms/ContainerEndGame";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { PlayerInfo } from "../types/PlayerInfo";
import { Button, Stack } from "@mui/material";

type EndGameTemplateProps = {
    playersInGame: PlayerInfo[];
    handleFinishPage: () => void;
};

export const EndGameTemplate: React.FC<EndGameTemplateProps> = ({ playersInGame, handleFinishPage }) => {
    return (
        <>
            <CenteredTitle text="Fin de la partie" />
            <ContainerEndGame playersInGame={playersInGame} />
            <Stack direction="row" justifyContent="center" alignItems="center">
                <Button variant="contained" className="return-button" size="large" onClick={() => handleFinishPage()}>Retour à l'accueil</Button>
            </Stack>
        </>
    );
};
