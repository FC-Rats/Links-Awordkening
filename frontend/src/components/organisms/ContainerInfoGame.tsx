import React, { useEffect, useState } from "react";
import { ComponentInfoGame } from "../molecules/ComponentInfoGame";

interface ContainerInfoGameProps {
  infoGame: {
    idJoin : string,
    nameGame: string;
    idHost: number | undefined;
    type: string;
    nombreJoueurs: string;
  };
  coupsRestants : number;
}

export const ContainerInfoGame: React.FC<ContainerInfoGameProps> = ({ infoGame, coupsRestants }) => {
  const [isMulti, setIsMulti] = useState<boolean>();

  useEffect(() => {
    setIsMulti(infoGame.type === "multi");
  });

  return (
    <div className="wrapper-info-game">
      {isMulti ? (
        <div className="frame-info-game-multi">
          <div className="left-info-game">
            <ComponentInfoGame item={{ title: "Coups restants", info: coupsRestants }} />
          </div>
          <div className="right-info-game">
            <ComponentInfoGame item={{ title: "ID de la partie", info: infoGame.idJoin }} />
            <ComponentInfoGame item={{ title: "Nom de la partie", info: infoGame.nameGame }} />
          </div>
        </div>
      ) : (
        <div className="frame-info-game-solo">
          <ComponentInfoGame item={{ title: "Nom de la partie", info: infoGame.nameGame }} />
          <ComponentInfoGame item={{ title: "Coups restants", info: coupsRestants }} />
        </div>
      )}
    </div>
  );
};