import { useEffect, useState } from "react";
import { PlayerInfo } from "../types/PlayerInfo";
import { ComponentPlayerInfo } from "../molecules/ComponentPlayerInfo";

export const ContainerInfoPlayer = () => {
  var ImgCompte = "/img/compte.png";
  const [playersInfos, setPlayersInfos] = useState<PlayerInfo[]>([]);
  useEffect(() => {
    const player: PlayerInfo[] = [
      {
        player_name: "Joueur 1", player_score: 100, player_url: ImgCompte,
        player_isHost: true
      },
    ];
    //setPlayersInfos(player);
  
    const players: PlayerInfo[] = [
      {
        player_name: "InkyYuu", player_score: 88, player_url: ImgCompte,
        player_isHost: true
      },
      {
        player_name: "Léwow", player_score: 100, player_url: ImgCompte,
        player_isHost: false
      },
      {
        player_name: "Lolooooooooooo", player_score: 15, player_url: ImgCompte,
        player_isHost: false
      },
      {
        player_name: "Dark_LNA_Du_77", player_score: 95, player_url: ImgCompte,
        player_isHost: false
      },
    ];
    setPlayersInfos(players);
  }, []);

  return (
    <>
      {playersInfos.length === 1 ? (
        <div className="wrapper-info-player-single">
          <div className="frame-info-player">
            <ComponentPlayerInfo
              item={playersInfos[0]}
              isMulti={false}
            />
          </div>
        </div>
      ) : (
        <div className="wrapper-info-player-multi">
          <div className="frame-info-player">
            {playersInfos.map((player, index) => (
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
