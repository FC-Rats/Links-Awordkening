import { CenteredTitle } from "../atoms/CenteredTitle";
import { CenteredLogo } from "../atoms/CenteredLogo";
import { PlayerInfo } from "../types/PlayerInfo";
import { SubmitButton } from "../molecules/SubmitButton";
import "../../assets/css/WaitingRoom.css"
import { ComponentPlayerInfo } from "../molecules/ComponentPlayerInfo";
import { UserInfo } from "../types/UserInfo";
import { ComponentPlayerInfoWaiting } from "../molecules/ComponentPlayerInfoWaiting";
import { StatePage } from "../types/StatePage";
import { Button } from "@mui/material";
import { ReturnButton } from "../molecules/ReturnButton";

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
    return (
        <>
            {/*             <Button
                onClick={() => handlePreviousPage()}>Retour</Button > */}
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