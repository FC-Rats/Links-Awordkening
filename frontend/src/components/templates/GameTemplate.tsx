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
import { Message } from "../types/Message";

interface GameTemplateProps {
    newWord: string;
    updateGraphWithNewWord: (word: string) => void;
    toggleChatVisibility: () => void;
    isChatVisible: boolean;
    messages: Message[];
    onInputChangeChat: (name: string, value: string) => void;
    SumbitMessageChat: () => void;
}

export const SoloGameTemplate: React.FC<GameTemplateProps> = ({
    newWord,
    updateGraphWithNewWord,
    toggleChatVisibility,
    isChatVisible,
    messages,
    onInputChangeChat,
    SumbitMessageChat
    }) => {

    return (
        <Stack direction="column" spacing={2}>
            <CenteredTitle text="Partie Solo" />
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <ContainerInfoPlayer />
                <ContainerInfoGame />
            </Stack>
            <Stack direction="row" spacing={2} minHeight="50vh" width="100%">
                <div className="item-game">
                <ComponentListWords />
                </div>
                <div className="graph">
                <Graph newWord={newWord}/>
                </div>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <Stack id="container-graph-submit" direction="column" spacing={2} alignItems="center" justifyContent="center">
                    <SubmitWord onSubmitWord={updateGraphWithNewWord} />
                </Stack>
            </Stack>
            <IconButton className="chat-btn" size="large" onClick={toggleChatVisibility} style={{ position: 'fixed', bottom: '1rem', right: '1rem'}}>
                <ChatIcon />
            </IconButton>
            <div className={isChatVisible ? "slide-in" : "slide-out"} style={{ position: 'fixed', bottom: '5rem', right: '1rem'}}>
                <ChatComponent messages={messages} onInputChange={onInputChangeChat} onSubmit={SumbitMessageChat} />
            </div>
        </Stack>
    );
};
