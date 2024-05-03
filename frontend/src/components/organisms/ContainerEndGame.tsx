import React, { useEffect, useState } from "react";
import { PlayerInfo } from "../types/PlayerInfo";
import { ComponentPlayerInfo } from "../molecules/ComponentPlayerInfo";
import "../../assets/css/ComponentEndGame.css";
import { ComponentEndGame } from "../molecules/ComponentEndGame";

export const ContainerEndGame = () => {
  const ImgCompte = "/img/compte.png"; 
  const [playersInfos, setPlayersInfos] = useState<PlayerInfo[]>([]);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const playersolo: PlayerInfo[] = [
      { player_name: "Joueur 1", player_score: 78, player_url: ImgCompte },
    ];
  
    const players: PlayerInfo[] = [
      { player_name: "JoueurduDark77777", player_score: 78, player_url: ImgCompte },
      { player_name: "Joueur 2", player_score: 100, player_url: ImgCompte },
      { player_name: "Joueur 3", player_score: 15, player_url: ImgCompte },
      { player_name: "Joueur 4", player_score: 95, player_url: ImgCompte },
    ];

    const multi = true;

    console.log(playersolo.length);
    if (multi) {
      setScore(playersolo[0].player_score);
      setPlayersInfos(playersolo);
    } else {
        const sortedPlayers = [...players].sort((a, b) => b.player_score - a.player_score);
        setPlayersInfos(sortedPlayers);
    }
  }, []); 

  return (
    <>
      {playersInfos.length == 1 ? (
        <div className="wrapper-end-game">
            <img className="img-end-game" src={"/img/LARectPA.png"} alt="Bravo" />
            <div className="title">Bravo !</div>
            {score !== null && <div className="info">Votre score : {score}</div>}
        </div>
      ) : (
        <div className="wrapper-end-game">
            <img className="img-end-game" src={"/img/LARectPA.png"} alt="Bravo" />
          <div className="frame-info-player-end-game">
            {playersInfos.map((player, index) => (
              <ComponentEndGame
                key={index}
                isMulti={true}
                item={player}
                winner={index==0}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
