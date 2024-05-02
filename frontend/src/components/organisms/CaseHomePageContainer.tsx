import React from "react";
import "../../assets/css/CaseHomePage.css";
import Stack from "@mui/material/Stack/Stack";
import { CaseHomePage } from "../molecules/CaseHomePage";

export const CaseHomePageContainer = () => {
    return (
        <Stack spacing={2} direction="row" flexWrap="wrap" justifyContent="center" alignItems="center">
            <CaseHomePage title={"Mot du jour"} value={'Test'} color={'var(--asparagus'}/>
            <CaseHomePage title={"Nombre de partie jouées aujourd'hui"} value={'32'} color={'var(--coffee'}/>
            <CaseHomePage title={"Meilleur score du jour"} value={'96'} color={'var(--hunterGreen'}/>
        </Stack>
    );
};
