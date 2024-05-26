import React, { useEffect, useState } from "react";
import "../../assets/css/CaseHomePage.css";
import Stack from "@mui/material/Stack/Stack";
import { CaseHomePage } from "../molecules/CaseHomePage";
import { getMaxScores } from "../../services/ScoreServices";

interface Score {
    username: string;
    totalScore: string;
}

export const CaseHomePageContainer = ({ scores }: { scores: Score[]}) => {

    return (
        <>
        <h2>Meilleurs Joueurs</h2>
        <Stack spacing={2} direction="row" flexWrap="wrap" justifyContent="center" alignItems="center">
            {scores.length > 0 && scores[0] && (
                <CaseHomePage title={"#1"} pseudo={scores[0].username} value={scores[0].totalScore} color={'var(--asparagus)'} />
            )}
            {scores.length > 1 && scores[1] && (
                <CaseHomePage title={"#2"} pseudo={scores[1].username} value={scores[1].totalScore} color={'var(--coffee)'} />
            )}
            {scores.length > 2 && scores[2] && (
                <CaseHomePage title={"#3"} pseudo={scores[2].username} value={scores[2].totalScore} color={'var(--hunterGreen)'} />
            )}
        </Stack>
        </>
    );
};
