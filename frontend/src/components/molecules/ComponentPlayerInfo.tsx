import React, { useEffect, useState } from "react";
import "../../assets/css/ComponentPlayerInfo.css";
import { PlayerInfo } from "../types/PlayerInfo";
import { Avatar } from "@mui/material";

export const ComponentPlayerInfo : React.FC<{ item: PlayerInfo, isMulti: boolean }> = ({ item, isMulti }) => {

    return (
        <>
        <div className={isMulti ? "wrapper-multi" : "wrapper-solo"}>
            <Avatar
            sx={{ width: 80, height: 80 }}
            alt="image de profil"
            src= {item.player_url}
            />
            <div className="player-info">
                <div className="name">{item.player_name}</div>
                <div className="score">Score: {item.player_score}</div>
            </div>
        </div>
        </>
    );
};
