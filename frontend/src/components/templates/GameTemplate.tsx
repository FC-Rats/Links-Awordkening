import React from "react";
import { ContainerInfoPlayer } from "../organisms/ContainerInfoPlayer";
import { ContainerInfoGame } from "../organisms/ContainerInfoGame";
import { ComponentListWords } from "../molecules/ComponentListWords";
import { ComponentListWordsResponsive } from "../molecules/ComponentListWordsResponsive";
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
import ListIcon from '@mui/icons-material/List';
import Box from '@mui/material/Box';

interface GameTemplateProps {
    infoGame: {
        idJoin: string;
        nameGame: string;
        coupsRestants: string;
        idHost: number | undefined;
        type: string;
        nombreJoueurs: string;
    };
    players: PlayerInfo[];
    listwords: string[];
    updateGraphWithNewWord: (word: string) => void;
    toggleChatVisibility: () => void;
    toggleWordsListVisibility: () => void;
    isModalWordListVisible: boolean;
    toggleSound: () => void
    isChatVisible: boolean;
    messages: Message[];
    onInputChangeChat: (name: string, value: string) => void;
    SumbitMessageChat: () => void;
    coupsRestants: number;
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
    toggleWordsListVisibility,
    isModalWordListVisible,
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
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" justifyContent={{ xs: 'space-evenly', lg: 'center' }}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent={{ xs: 'space-evenly', lg: 'center' }} sx={{ width: { xs:'100%', lg:'80%'} }}>
                    <ContainerInfoPlayer players={players} />
                    <ContainerInfoGame infoGame={infoGame} coupsRestants={coupsRestants} />
                </Stack>
                <Stack direction="row" flexWrap="wrap" spacing={3} alignItems="center" justifyContent={{ xs: 'center', lg: 'flex-start' }}  sx={{ width: { xs:'100%', lg:'20%'} }}>
                    <Timer time={180} setIsTimerFinished={setIsTimerFinished} />
                    <IconButton className="sound-btn" size="large" onClick={toggleSound}>
                        {isSoundEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
                    </IconButton>
                </Stack>
            </Stack>
            <Stack direction="row" spacing={2} minHeight="50vh" width="100%" sx={{ maxHeight: 400 }}>
                <Box component="div" className="item-game" sx={{
                    visibility: { xs: 'hidden', md: 'visible' },
                    width: { xs: '0', md: 'auto' }
                }}>
                    <ComponentListWords listwords={listwords} />
                </Box>
                <Box component="div" className="graph" sx={{
                    width: { xs: '100%', md: 'auto' }
                }}>
                    <Graph data={graph} />
                </Box>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                <Stack id="container-graph-submit" direction="column" spacing={2} alignItems="center" justifyContent="center">
                    <SubmitWord disabled={isBtnDisabled} onSubmitWord={updateGraphWithNewWord} coupsRestants={coupsRestants} />
                </Stack>
            </Stack>
            <IconButton className="chat-btn" size="large" onClick={toggleWordsListVisibility}
                sx={{
                    position: 'fixed',
                    bottom: { xs: '1rem' },
                    left: { xs: '1rem' },
                    visibility: { xs: 'visible', md: 'hidden' }
                }}
            >
                <ListIcon />
            </IconButton>
            {players.length > 1 && (
                <IconButton className="chat-btn" size="large" onClick={toggleChatVisibility} style={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
                    <Badge color="error" variant="dot" invisible={isChatVisible || !hasNewMessage}>
                        <ChatIcon />
                    </Badge>
                </IconButton>
            )}
            {players.length > 1 && (
                <div className={isChatVisible ? "slide-in" : "slide-out"} style={{ position: 'fixed', bottom: '5rem', right: '1rem' }}>
                    <ChatComponent messages={messages} onInputChange={onInputChangeChat} onSubmit={SumbitMessageChat} />
                </div>
            )}
            <div className={isModalWordListVisible ? "slide-in" : "slide-out"} style={{ position: 'fixed', bottom: '5rem', left: '1rem' }}>
                <ComponentListWordsResponsive listwords={listwords} />
            </div>
        </Stack>
    );
};
