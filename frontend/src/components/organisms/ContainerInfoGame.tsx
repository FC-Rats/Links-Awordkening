import React, { useEffect, useState } from "react";
import { ComponentInfoGame, GameInfo } from "../molecules/ComponentInfoGame";
import gameData from "../../assets/data/GameInfo.json";

export const ContainerInfoGame = () => {
  const [gameinfos, setGameInfos] = useState<GameInfo[]>([]);
  const [isMulti, setIsMulti] = useState<boolean>();

  useEffect(() => {
    let game = gameData[1]; //0 = Multi  1=Solo
    const gamesData: GameInfo[] = [
      { title: "ID de la partie", info: game.IDJoin }, //IDJOIN DE LA_GAME
      { title: "Nom de la partie", info: game.nameGame }, //NAME DE LA_GAME
      { title: "Coups restants", info: game.coupsRestants }, // DE PHP 
      { title: "Nom hôte partie", info: game.nameHost } //IDUSER DE LA_GAME POUR HOST
      // On affiche pas si c'est solo ou multi mais on l'utilise pr le boolean
    ];
    setGameInfos(gamesData);
    setIsMulti(game.type === "Multiplayer");
  }, []);

  return (
    <div className="wrapper-info-game">
      {isMulti ? (
        <div className="frame-info-game-multi">
          <div className="left-info-game">
            <ComponentInfoGame item={gameinfos[2]} />
          </div>
          <div className="right-info-game">
            <ComponentInfoGame item={gameinfos[0]} />
            <ComponentInfoGame item={gameinfos[1]} />
          </div>
        </div>
      ) : (
        <div className="frame-info-game-solo">
          {gameinfos.map((game, index) => (
            <ComponentInfoGame key={index} item={game} />
          ))}
        </div>
      )}
    </div>
  );
};
