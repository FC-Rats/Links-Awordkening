import React, { useEffect, useState } from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { ContainerInfoPlayer } from "../organisms/ContainerInfoPlayer";
import { ContainerInfoGame } from "../organisms/ContainerInfoGame";
import { ComponentListWords } from "../molecules/ComponentListWords";
import ChatComponent from "../organisms/ChatComponent";
import SubmitWord from "../molecules/SubmitWord";
import Graph, { TestData } from "../molecules/Graph";
import { Stack, IconButton } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import "../../assets/css/GameTemplate.css";
import { Message } from "../types/Message";
import { PlayerInfo } from "../types/PlayerInfo";

interface GameTemplateProps {
    infoGame: {
        idJoin : string;
        nameGame: string;
        coupsRestants: string;
        idHost: number | undefined;
        type: string;
        nombreJoueurs: string;
    };
    players: PlayerInfo[];
    listwords : string[];
    updateGraphWithNewWord: (word: string) => void;
    toggleChatVisibility: () => void;
    isChatVisible: boolean;
    messages: Message[];
    onInputChangeChat: (name: string, value: string) => void;
    SumbitMessageChat: () => void;
    coupsRestants :number;
    graph: TestData,
}

export const GameTemplate: React.FC<GameTemplateProps> = ({
    graph,
    updateGraphWithNewWord,
    toggleChatVisibility,
    isChatVisible,
    messages,
    onInputChangeChat,
    SumbitMessageChat,
    players,
    infoGame,
    listwords,
    coupsRestants,
    }) => {

    return (
        <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <ContainerInfoPlayer players={players}/> 
                <ContainerInfoGame infoGame={infoGame} coupsRestants={coupsRestants}/>
            </Stack>
            <Stack direction="row" spacing={2} minHeight="50vh" width="100%">
                <div className="item-game">
                <ComponentListWords listwords={listwords}/>
                </div>
                <div className="graph">
                <Graph data={graph}/>
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
