import React, { useState } from "react";
import Stack from "@mui/material/Stack/Stack";
import GameType from "../molecules/GameType";
import { CenteredLogo } from "../atoms/CenteredLogo";
import { InputForm } from "../molecules/InputForm";
import { SubmitButton } from "../molecules/SubmitButton";
import Grid from '@mui/material/Grid';

export const SetUpGame = () => {
    const [soloSelected, setSoloSelected] = useState(false);
    const [multiSelected, setMultiSelected] = useState(true);

    const [formData, setFormData] = useState({
        type: '',
        nomPartie: '',
        nombreJoueurs: '',
    });

    const handleSoloClick = () => {
        setSoloSelected(true);
        setMultiSelected(false);
        setFormData({ ...formData, type: 'solo', nombreJoueurs: "1" });
    };

    const handleMultiClick = () => {
        setSoloSelected(false);
        setMultiSelected(true);
        setFormData({ ...formData, type: 'multi' });
    };

    const handleInputChange = (name: string, value: any) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log(formData);
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
                    <Grid item xs={12} sm={formData.type !== 'solo' ? 2 : 4}>
                        <InputForm name="nomPartie" label={"Nom de la partie"} required={true} onInputChange={handleInputChange} />
                    </Grid>
                    {formData.type !== 'solo' && (
                        <Grid item xs={12} sm={2}>
                            <InputForm name="nombreJoueurs" label={"Nombre de joueurs"} type={"number"} onInputChange={handleInputChange} min={2} max={4} defaultvalue={"2"}/>
                        </Grid>
                    )}
                </Grid>
                <SubmitButton text={"Jouer"} />
            </form>
        </>
    );
};
