import React, { useState } from "react";
import { ContainerEndGame } from "../organisms/ContainerEndGame";
import { CenteredTitle } from "../atoms/CenteredTitle";

export const EndGameTemplate = () => {

    return (
       <>
        <CenteredTitle text="Fin de la partie"/>
       <ContainerEndGame/>
       </>
    );
};
