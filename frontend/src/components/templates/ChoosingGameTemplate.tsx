import React from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { Button } from "@mui/material";
import { StatePage } from "../types/StatePage";

interface ChooseProps {
    setStatePage: (choose: StatePage) => void;
}

export const ChoosingGameTemplate: React.FC<ChooseProps> = ({ setStatePage }) => {

    const ChoosePage = (join: boolean) => () => {
        if (join) {
            setStatePage("joining");
        } else {
            setStatePage("creating");
        }
    };

    return (
        <>
            <CenteredTitle text="Jouez !" />
            <p>Voulez-vous rejoindre une partie ou créer votre partie ?</p>
            <Button onClick={ChoosePage(true)}>Rejoindre une partie</Button>
            <Button onClick={ChoosePage(false)}>Créer une partie</Button>
        </>
    );
};
