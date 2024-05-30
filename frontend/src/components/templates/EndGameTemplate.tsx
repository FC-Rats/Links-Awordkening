import React from "react";
import { ContainerEndGame } from "../organisms/ContainerEndGame";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { PlayerInfo } from "../types/PlayerInfo";
import { Button, Stack } from "@mui/material";
import { TestData } from "../molecules/Graph";

type EndGameTemplateProps = {
    playersInGame: PlayerInfo[];
    handleFinishPage: () => void;
    handlePlayAgain: () => void;
    graphs: { [key: string]: TestData };
};

export const EndGameTemplate: React.FC<EndGameTemplateProps> = ({ playersInGame, handleFinishPage, handlePlayAgain, graphs }) => {
    return (
        <>
            <CenteredTitle text="Fin de la partie" />
            <ContainerEndGame playersInGame={playersInGame} graphs={graphs} />
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Button variant="contained" className="return-button" size="large" onClick={() => handlePlayAgain()}>Rejouer</Button>
                <Button variant="contained" className="return-button" size="large" onClick={() => handleFinishPage()}>Retour à l'accueil</Button>
            </Stack>
        </>
    );
};
