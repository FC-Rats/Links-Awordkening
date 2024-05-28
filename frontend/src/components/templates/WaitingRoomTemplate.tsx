import { CenteredTitle } from "../atoms/CenteredTitle";
import { CenteredLogo } from "../atoms/CenteredLogo";
import { PlayerInfo } from "../types/PlayerInfo";
import { SubmitButton } from "../molecules/SubmitButton";
import "../../assets/css/WaitingRoom.css"
import { ComponentPlayerInfo } from "../molecules/ComponentPlayerInfo";
import { UserInfo } from "../types/UserInfo";
import { ComponentPlayerInfoWaiting } from "../molecules/ComponentPlayerInfoWaiting";
import { StatePage } from "../types/StatePage";
import { Button, Dialog, IconButton } from "@mui/material";
import { ReturnButton } from "../molecules/ReturnButton";
import { RulesTemplate } from "./RulesTemplate";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

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
    handlePreviousPage: () => void;
}

export const WaitingRoomTemplate: React.FC<WaitingRoomProps> = ({ infoGame, players, isHost, handleStartGame, handleNextPage, handlePreviousPage }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    return (
        <>
            <ReturnButton handlePreviousPage={handlePreviousPage} />
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
                <Dialog open={open} onClose={handleClose} PaperProps={{style: {width: '70%',maxWidth: '70%', backgroundColor:'#D2B48C'},}}>
                    <IconButton aria-label="close" onClick={handleClose} style={{ position: 'absolute', right: '10px', top: '10px' }}> {/* Ajout d'un IconButton */}
                        <CloseIcon />
                    </IconButton>
                    <RulesTemplate />
                </Dialog>
                <Button onClick={handleOpen} className="submit-button" id={"rules"} variant="contained" sx={{ padding: '10px 20px', fontSize: '16px' }}>Règles du jeu</Button>
                {isHost ? (
                    <form onSubmit={handleStartGame}>
                        <SubmitButton text={"Commencer la partie"} />
                    </form>
                ) : null}

            </div>
        </>

    );
};

export { };