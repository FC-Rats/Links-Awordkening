import React from "react";
import { ContainerEndGame } from "../organisms/ContainerEndGame";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { PlayerInfo } from "../types/PlayerInfo";
import { Button, Stack } from "@mui/material";
import { TestData } from "../molecules/Graph";

type EndGameTemplateProps = {
    playersInGame: PlayerInfo[];
    handleFinishPage: () => void;
    graphs: { [key: string]: TestData };
};

export const EndGameTemplate: React.FC<EndGameTemplateProps> = ({ playersInGame, handleFinishPage, graphs }) => {
    return (
        <>
            <CenteredTitle text="Fin de la partie" />
            <ContainerEndGame playersInGame={playersInGame} graphs={graphs} />
            <Stack direction="row" justifyContent="center" alignItems="center">
                <Button variant="contained" className="return-button" size="large" onClick={() => handleFinishPage()}>Retour à l'accueil</Button>
            </Stack>
        </>
    );
};
