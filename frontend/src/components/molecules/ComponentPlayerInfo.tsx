import React, { useEffect, useState } from "react";
import "../../assets/css/ComponentPlayerInfo.css";
import { PlayerInfo } from "../types/PlayerInfo";

export const ComponentPlayerInfo : React.FC<{ item: PlayerInfo, isMulti: boolean }> = ({ item, isMulti }) => {

    return (
        <>
        <div className={isMulti ? "wrapper-multi" : "wrapper-solo"}>
            <img className="img-player" src={item.player_url} alt="Compte" />
            <div className="player-info">
                <div className="name">{item.player_name}</div>
                <div className="score">Score: {item.player_score}</div>
            </div>
        </div>
        </>
    );
};
