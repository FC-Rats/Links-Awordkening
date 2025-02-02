import { CenteredTitle } from "../atoms/CenteredTitle";
import { SubmitButton } from "../molecules/SubmitButton";
import "../../assets/css/WaitingRoom.css"
import { UserInfo } from "../types/UserInfo";
import { ComponentPlayerInfoWaiting } from "../molecules/ComponentPlayerInfoWaiting";
import { StatePage } from "../types/StatePage";
import { Button, Dialog, IconButton } from "@mui/material";
import { ReturnButton } from "../molecules/ReturnButton";
import { RulesTemplate } from "./RulesTemplate";
import { SyntheticEvent, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { Badge } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import { Message } from "../types/Message";
import ChatComponent from "../organisms/ChatComponent";
import ContainerFriend from "../organisms/ContainerFriend";
import { ContainerFriendRequestsProps } from "../types/ContainerFriendRequestsProps";
import ContainerInviteFriend from "../organisms/ContainerInviteFriend";
import { AlertInvitationBox } from "../molecules/AlertInvitationBox";

export interface WaitingRoomProps {
    infoGame: {
        idJoin: string,
        nameGame: string;
        coupsRestants: string;
        idHost: number | undefined;
        type: string;
        nombreJoueurs: string;
    };
    isHost: boolean
    players: UserInfo[];
    handleStartGame: (event: React.FormEvent) => void;
    handleNextPage: (newPage: StatePage) => void;
    handlePreviousPage: (event: React.FormEvent) => void;
    toggleSound: () => void;
    toggleChatVisibility: () => void;
    isChatVisible: boolean;
    messages: Message[];
    onInputChangeChat: (name: string, value: string) => void;
    SumbitMessageChat: () => void;
    hasNewMessage: boolean;
    isSoundEnabled: boolean;
    dataFriends : ContainerFriendRequestsProps['friends'];
    inviteFriend : (id :number,nickname:string) => void;
}

export const WaitingRoomTemplate: React.FC<WaitingRoomProps> = ({ infoGame, players, isHost, handleStartGame, handleNextPage, handlePreviousPage, isChatVisible, messages,onInputChangeChat,SumbitMessageChat, isSoundEnabled, toggleSound, toggleChatVisibility, hasNewMessage, dataFriends, inviteFriend }) => {
    const [openRules, setOpenRules] = useState(false);

    const handleOpenRules = () => {
        setOpenRules(true);
    };
  
    const handleCloseRules = () => {
        setOpenRules(false);
    };

    const [openFriends, setOpenFriends] = useState(false);

    const handleOpenFriends = () => {
        setOpenFriends(true);
    };
  
    const handleCloseFriends = () => {
        setOpenFriends(false);
    };
    
    return (
        <>
            <ReturnButton handlePreviousPage={() => {}} handleQuit={handlePreviousPage} />
            <CenteredTitle text={`Rejoindre la partie`} />
            <CenteredTitle text={`Code "${infoGame.idJoin}"`} />
            <div className="waitinginfo">
                <h1>Rejoindre la partie "{infoGame.nameGame}"</h1>
                <h2>{players.length} sur {infoGame.nombreJoueurs} joueurs</h2>
                <div className="frame-info-player" style={{ width: '60%' }}>
                    {players.map((player, index) => (
                        <ComponentPlayerInfoWaiting player={player} key={index} />
                    ))}
                </div>
                
                <Dialog open={openRules} onClose={handleCloseRules} PaperProps={{style: {width: '70%',maxWidth: '70%', backgroundColor:'#D2B48C'},}}>
                    <IconButton aria-label="close" onClick={handleCloseRules} style={{ position: 'absolute', right: '10px', top: '10px' }}> {/* Ajout d'un IconButton */}
                        <CloseIcon />
                    </IconButton>
                    <RulesTemplate />
                </Dialog>
                <Button onClick={handleOpenRules} className="submit-button" id={"rules"} variant="contained" sx={{ padding: '10px 20px', fontSize: '16px' }}>Règles du jeu</Button>
                
                <Dialog open={openFriends} onClose={handleCloseFriends} PaperProps={{style: {width: '70%',maxWidth: '70%', backgroundColor:'#D2B48C'},}}>
                    <IconButton aria-label="close" onClick={handleCloseFriends} style={{ position: 'absolute', right: '10px', top: '10px' }}> {/* Ajout d'un IconButton */}
                        <CloseIcon />
                    </IconButton>
                    <ContainerInviteFriend friends={dataFriends} inviteFriends={inviteFriend} players={players}/> 
                </Dialog>
                <Button onClick={handleOpenFriends} className="submit-button" id={"friends"} variant="contained" sx={{ padding: '10px 20px', fontSize: '16px' }}>Inviter des amis</Button>
               
               {isHost ? (
                    <form onSubmit={handleStartGame}>
                        <SubmitButton text={"Commencer la partie"} />
                    </form>
                ) : null}
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
            </div>
            
        </>

    );
};

export { };