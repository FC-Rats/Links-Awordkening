import React, { useEffect, useState } from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { ContainerInfoPlayer } from "../organisms/ContainerInfoPlayer";
import { ContainerInfoGame } from "../organisms/ContainerInfoGame";
import { ComponentListWords } from "../molecules/ComponentListWords";
import SubmitWord from "../molecules/SubmitWord";
import Graph from "../molecules/Graph";
import { Stack } from "@mui/material";
import "../../assets/css/GameTemplate.css";

export const SoloGameTemplate = () => {
    const [newWord, setNewWord] = useState("");

    const updateGraphWithNewWord = (word: string) => {
        setNewWord(word);
    };
    return (
        <Stack direction="column" spacing={2}>
            <CenteredTitle text="Partie Solo" />
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <ContainerInfoPlayer />
                <ContainerInfoGame />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <ComponentListWords />
                <Stack id="container-graph-submit" direction="column" spacing={2} alignItems="center" justifyContent="center">
                    <Graph newWord={newWord}/>
                    <SubmitWord onSubmitWord={updateGraphWithNewWord} />
                </Stack>
            </Stack>
        </Stack>
    );
};
