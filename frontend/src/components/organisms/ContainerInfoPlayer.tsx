import { useEffect, useState } from "react";
import { PlayerInfo } from "../types/PlayerInfo";
import { ComponentPlayerInfo } from "../molecules/ComponentPlayerInfo";

export const ContainerInfoPlayer = ({ players }: { players: PlayerInfo[] }) => {
  return (
    <>
      {players.length === 1 ? (
        <div className="wrapper-info-player-single">
          <div className="frame-info-player">
            <ComponentPlayerInfo
              item={players[0]}
              isMulti={false}
            />
          </div>
        </div>
      ) : (
        <div className="wrapper-info-player-multi">
          <div className="frame-info-player">
            {players.map((player, index) => (
              <ComponentPlayerInfo
                key={index}
                isMulti={true}
                item={player}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
