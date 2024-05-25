import { CenteredTitle } from "../atoms/CenteredTitle";
import { CenteredLogo } from "../atoms/CenteredLogo";
import { PlayerInfo } from "../types/PlayerInfo";
import { SubmitButton } from "../molecules/SubmitButton";
import "../../assets/css/WaitingRoom.css"
import { ComponentPlayerInfo } from "../molecules/ComponentPlayerInfo";
import { UserInfo } from "../types/UserInfo";

export interface WaitingRoomProps {
  infoGame: {
      idJoin : string,
      nameGame: string;
      coupsRestants: string;
      nameHost: string | undefined;
      type: string;
      nombreJoueurs: string;
  };
  isHost: boolean
  players : UserInfo[];
  handleStartGame: (event: React.FormEvent) => void;
}

export const WaitingRoomTemplate : React.FC<WaitingRoomProps> = ({ infoGame, players, isHost, handleStartGame }) =>  {
    return (
        <>
        <CenteredTitle text={`Rejoindre la partie`} />
        <CenteredTitle text={`Code "${infoGame.idJoin}"`} />
        <div className="waitinginfo">
            <h1>Rejoindre la partie "{infoGame.nameGame}"</h1>
            <h2>{players.length} sur {infoGame.nombreJoueurs} joueurs</h2>
            <div className="frame-info-player" style={{ width: '60%' }}>
            {players.map((player, index) => (
                <p>{player.name}</p>
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

export {};