import React, { useEffect, useState } from "react";
import { ComponentInfoGame, Infogame } from "../molecules/ComponentInfoGame";
import "../../assets/css/style.css";
import gameData from "../../assets/data/GameInfo.json";

export const ContainerInfoGame = () => {
  const [gameinfos, setGameInfos] = useState<Infogame[]>([]);

  useEffect(() => {
    const gamesData: Infogame[] = [
        { title: "ID de la partie", info: gameData[0].info },
        { title: "Nom de la partie", info: gameData[1].info },
        { title: "Coups restants", info: gameData[2].info },
        { title: "Nom hôte partie", info: gameData[3].info }
      ];
      setGameInfos(gamesData);
  }, []);

  return (
    <div className="wrapper">
        <div className="frame">
        {gameinfos.map((game, index) => (
            <ComponentInfoGame key={index} item={game} />
        ))}
        </div>
    </div>
  );
};

