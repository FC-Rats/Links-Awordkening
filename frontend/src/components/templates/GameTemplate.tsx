import React from "react";
import { ContainerInfoPlayer } from "../organisms/ContainerInfoPlayer";
import { ContainerInfoGame } from "../organisms/ContainerInfoGame";
import { ComponentListWords } from "../molecules/ComponentListWords";
import ChatComponent from "../organisms/ChatComponent";
import SubmitWord from "../molecules/SubmitWord";
import Graph, { TestData } from "../molecules/Graph";
import { Stack, IconButton, Badge } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import "../../assets/css/GameTemplate.css";
import { Message } from "../types/Message";
import { PlayerInfo } from "../types/PlayerInfo";
import { Timer } from "../atoms/Timer";

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
    toggleSound: () => void
    isChatVisible: boolean;
    messages: Message[];
    onInputChangeChat: (name: string, value: string) => void;
    SumbitMessageChat: () => void;
    coupsRestants :number;
    graph: TestData,
    hasNewMessage: boolean;
    isSoundEnabled: boolean;
    isBtnDisabled: boolean;
    setIsTimerFinished: (value: boolean) => void;
}

export const GameTemplate: React.FC<GameTemplateProps> = ({
    graph,
    updateGraphWithNewWord,
    toggleChatVisibility,
    toggleSound,
    isChatVisible,
    messages,
    onInputChangeChat,
    SumbitMessageChat,
    players,
    infoGame,
    listwords,
    coupsRestants,
    hasNewMessage,
    isSoundEnabled,
    isBtnDisabled,
    setIsTimerFinished
    }) => {

    return (
        <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <ContainerInfoPlayer players={players}/> 
                <ContainerInfoGame infoGame={infoGame} coupsRestants={coupsRestants}/>
                <Timer time={180} setIsTimerFinished={setIsTimerFinished}/>
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
                    <SubmitWord disabled={isBtnDisabled} onSubmitWord={updateGraphWithNewWord} coupsRestants={coupsRestants}/>
                </Stack>
            </Stack>
            <IconButton className="chat-btn" size="large" onClick={toggleChatVisibility} style={{ position: 'fixed', bottom: '1rem', right: '1rem'}}>
                <Badge color="error" variant="dot" invisible={isChatVisible || !hasNewMessage}>
                    <ChatIcon />
                </Badge>
            </IconButton>
            <IconButton className="sound-btn" size="large" onClick={toggleSound} style={{ position: 'fixed', top: '1rem', right: '1rem' }}>
                {isSoundEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
            </IconButton>
            <div className={isChatVisible ? "slide-in" : "slide-out"} style={{ position: 'fixed', bottom: '5rem', right: '1rem'}}>
                <ChatComponent messages={messages} onInputChange={onInputChangeChat} onSubmit={SumbitMessageChat} />
            </div>
        </Stack>
    );
};
