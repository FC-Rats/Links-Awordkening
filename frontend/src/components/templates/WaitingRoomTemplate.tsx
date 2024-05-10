import { CenteredTitle } from "../atoms/CenteredTitle";
import { CenteredLogo } from "../atoms/CenteredLogo";
import { PlayerInfo } from "../types/PlayerInfo";
import { SubmitButton } from "../molecules/SubmitButton";
import "../../assets/css/WaitingRoom.css"
import { ComponentPlayerInfo } from "../molecules/ComponentPlayerInfo";

export const WaitingRoomTemplate = () => {
    var ImgCompte = "/img/profilepictures/coconut.jpg";

    const gameinfo = [
        { "IDJoin": "1PV4" , "nameGame": "Game exe", "coupsRestants": "12", "nameHost" : "Lolo", "type" : "Multiplayer", 'nombremaxjoueurs' : 3  },
    ]
    
    const players: PlayerInfo[] = [
        {
          player_name: "InkyYuu", player_score: 88, player_url: ImgCompte,
          player_isHost: true
        },
        {
          player_name: "Léwow", player_score: 100, player_url: ImgCompte,
          player_isHost: false
        },        
      ];


    return (
        <>
        <CenteredTitle text={`Rejoindre la partie`} />
        <CenteredTitle text={`Code "${gameinfo[0].IDJoin}"`} />
        <div className="waitinginfo">
            <h1>Rejoindre la partie "{gameinfo[0].nameGame}"</h1>
            <h2>{players.length} sur {gameinfo[0].nombremaxjoueurs} joueurs</h2>
            <div className="frame-info-player" style={{ width: '60%' }}>
            {players.map((player, index) => (
                <ComponentPlayerInfo
                key={index}
                isMulti={true}
                item={player}
                />
            ))}
            </div>
            <SubmitButton text={"Commencer la partie"} />
        </div>
        </>

    );
};

export {};