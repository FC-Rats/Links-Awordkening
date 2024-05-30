import React, { useEffect, useState } from "react";
import { ComponentInfoGame } from "../molecules/ComponentInfoGame";
import { Stack } from "@mui/material";

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
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center" justifyContent={{ xs: 'center', lg: 'space-evenly' }} sx={{ height: '100%' }}>
          <Stack direction="column" spacing={2} alignItems="center" justifyContent="center">
            <ComponentInfoGame item={{ title: "Coups restants", info: coupsRestants }} />
          </Stack>
          <Stack direction="column" spacing={2} alignItems="center" justifyContent="center">
            <ComponentInfoGame item={{ title: "ID de la partie", info: infoGame.idJoin }} />
            <ComponentInfoGame item={{ title: "Nom de la partie", info: infoGame.nameGame }} />
          </Stack>
        </Stack>
      ) : (
        <div className="frame-info-game-solo">
          <ComponentInfoGame item={{ title: "Nom de la partie", info: infoGame.nameGame }} />
          <ComponentInfoGame item={{ title: "Coups restants", info: coupsRestants }} />
        </div>
      )}
    </div>
  );
};