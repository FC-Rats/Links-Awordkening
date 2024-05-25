import React, { useState } from "react";
import { ContainerEndGame } from "../organisms/ContainerEndGame";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { PlayerInfo } from "../types/PlayerInfo";

type EndGameTemplateProps = {
    playersInGame: PlayerInfo[];
};

export const EndGameTemplate: React.FC<EndGameTemplateProps> = ({ playersInGame }) => {
    return (
        <>
            <CenteredTitle text="Fin de la partie" />
            <ContainerEndGame playersInGame={playersInGame} />
        </>
    );
};
