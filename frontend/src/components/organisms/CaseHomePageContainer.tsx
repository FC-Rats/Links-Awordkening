import React, { useContext } from "react";
import "../../assets/css/CaseHomePage.css";
import Stack from "@mui/material/Stack/Stack";
import { CaseHomePage } from "../molecules/CaseHomePage";
import { AppContext } from "../hooks/AppContext";

interface Score {
    username: string;
    visibility: string;
    totalScore: string;
}

export const CaseHomePageContainer = ({ scores }: { scores: Score[]}) => {
    const context = useContext(AppContext);
    return (
        <>
        <h2>Meilleurs Joueurs</h2>
        <Stack spacing={2} direction="row" flexWrap="wrap" justifyContent="center" alignItems="center">
            {scores.length > 0 && scores[0] && (
                <CaseHomePage title={"#1"} pseudo={context?.user?.name === scores[0].username ? scores[0].username : "PROFIL PRIVÉ" } value={scores[0].totalScore} color={'var(--asparagus)'} />
            )}
            {scores.length > 1 && scores[1] && (
                <CaseHomePage title={"#2"} pseudo={context?.user?.name === scores[1].username ? scores[1].username : "PROFIL PRIVÉ"} value={scores[1].totalScore} color={'var(--coffee)'} />
            )}
            {scores.length > 2 && scores[2] && (
                <CaseHomePage title={"#3"} pseudo={context?.user?.name === scores[2].username ? scores[2].username : "PROFIL PRIVÉ"} value={scores[2].totalScore} color={'var(--hunterGreen)'} />
            )}
        </Stack>
        </>
    );
};
