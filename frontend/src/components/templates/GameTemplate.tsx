import React, { useEffect, useState } from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { ContainerInfoPlayer } from "../organisms/ContainerInfoPlayer";
import { ContainerInfoGame } from "../organisms/ContainerInfoGame";
import { ComponentListWords } from "../molecules/ComponentListWords";
import ChatComponent from "../organisms/ChatComponent";
import SubmitWord from "../molecules/SubmitWord";
import Graph from "../molecules/Graph";
import { Stack, IconButton } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import "../../assets/css/GameTemplate.css";

export const SoloGameTemplate = () => {
    const [newWord, setNewWord] = useState("");
    const [isChatVisible, setIsChatVisible] = useState(false);

    const updateGraphWithNewWord = (word: string) => {
        setNewWord(word);
    };

    const toggleChatVisibility = () => {
        setIsChatVisible(!isChatVisible);
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
            <IconButton onClick={toggleChatVisibility} style={{ position: 'fixed', bottom: '1rem', right: '1rem', backgroundColor: "#547E5E"}}>
                <ChatIcon />
            </IconButton>
            <div style={{ position: 'fixed', bottom: '5rem', right: '1rem', display: isChatVisible ? 'block' : 'none'}}>
                <ChatComponent />
            </div>
        </Stack>
    );
};
