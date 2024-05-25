import React, { useState } from "react";
import Stack from "@mui/material/Stack/Stack";
import GameType from "../molecules/GameType";
import { CenteredLogo } from "../atoms/CenteredLogo";
import { InputForm } from "../molecules/InputForm";
import { SubmitButton } from "../molecules/SubmitButton";
import Grid from '@mui/material/Grid';

export interface SetUpGameProps {
    infoGame: {
        nameGame: string;
        coupsRestants: string;
        idHost: number | undefined;
        type: string;
        nombreJoueurs: string;
    };
    handleInputChange: (name: string, value: any) => void;
    handleSubmit: (event: React.FormEvent) => void;
    handleTypeGame : (name: string) => void;
}

export const SetUpGameTemplate: React.FC<SetUpGameProps> = ({ infoGame, handleInputChange, handleSubmit, handleTypeGame }) => {
    const { nameGame, coupsRestants, type, nombreJoueurs } = infoGame;
    const [soloSelected, setSoloSelected] = useState(type == 'solo');
    const [multiSelected, setMultiSelected] = useState(type == 'multi');

    const handleSoloClick = () => {
        setSoloSelected(true);
        setMultiSelected(false);
        handleTypeGame('solo');
    };

    const handleMultiClick = () => {
        setSoloSelected(false);
        setMultiSelected(true);
        handleTypeGame('multi');
    };

    const onInputChange = (name: string, value: any) => {
        handleInputChange(name,value);
    };

    return (
        <>
            <CenteredLogo/>
            <form method="post" onSubmit={handleSubmit}>
            <Stack spacing={{ xs: 0, sm: 10, md: 10 }} direction="row" flexWrap="wrap" justifyContent="center" alignItems="center">
                <GameType type='solo' isSelected={soloSelected} onClick={handleSoloClick} />
                <GameType type='multi' isSelected={multiSelected} onClick={handleMultiClick} />
            </Stack>

            <Grid container spacing={{ xs: 1, sm: 2, md: 4 }} justifyContent="center">
                    <Grid item xs={12} sm={4}>
                        <InputForm name="nameGame" label={"Nom de la partie"} required={true} onInputChange={onInputChange} />
                    </Grid>
                    {multiSelected && (
                        <Grid item xs={12} sm={2}>
                            <InputForm name="nombreJoueurs" label={"Nombre de joueurs"} type={"number"} onInputChange={onInputChange} min={2} max={4} defaultvalue={"2"}/>
                        </Grid>
                    )}
                </Grid>
                <div style={{ textAlign: "center" }} >
                <SubmitButton text={"Jouer"} />
                </div>
            </form>
        </>
    );
};
