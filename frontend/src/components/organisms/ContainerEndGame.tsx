import { useEffect, useState } from "react";
import { PlayerInfo } from "../types/PlayerInfo";
import "../../assets/css/ComponentEndGame.css";
import { ComponentEndGame } from "../molecules/ComponentEndGame";

// Define the props type
type ContainerEndGameProps = {
  playersInGame: PlayerInfo[];
};

// Accept props in a destructured format
export const ContainerEndGame: React.FC<ContainerEndGameProps> = ({ playersInGame }) => {
  console.log(playersInGame);

  return (
    <>
      {playersInGame.length === 1 ? (
        <div className="wrapper-end-game">
            <img className="img-end-game" src={"/img/swatches/LARectPA.png"} alt="Bravo" />
            <div className="title">Bravo !</div>
            {playersInGame[0].player_score !== null && <div className="info">Votre score : {playersInGame[0].player_score}</div>}
        </div>
      ) : (
        <div className="wrapper-end-game">
            <img className="img-end-game" src={"/img/swatches/LARectPA.png"} alt="Bravo" />
          <div className="frame-info-player-end-game">
            {playersInGame.map((player, index) => (
              <ComponentEndGame
                key={index}
                isMulti={true}
                item={player}
                winner={index===0}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
