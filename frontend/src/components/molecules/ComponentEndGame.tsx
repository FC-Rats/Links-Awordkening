import React, { useEffect, useState } from "react";
import "../../assets/css/ComponentPlayerInfo.css";
import { PlayerInfo } from "../types/PlayerInfo";
import { Avatar, Badge } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export const ComponentEndGame: React.FC<{ item: PlayerInfo; isMulti: boolean; winner?: boolean }> = ({ item, isMulti, winner }) => {
  return (
    <>
      <div className={isMulti ? "wrapper-multi-end-game" : "wrapper-solo"}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          badgeContent={winner ? <EmojiEventsIcon sx={{ color: "gold"}} /> : null}
        >
          <Avatar sx={{ width: 80, height: 80 }} alt="image de profil" src={item.player_url} />
        </Badge>
        <div className="player-info-end-game">
          <div className="name">{item.player_name}</div>
          <div className="score">Score : {item.player_score}</div>
        </div>
      </div>
    </>
  );
};
