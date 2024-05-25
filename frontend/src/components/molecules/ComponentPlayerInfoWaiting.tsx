import React from "react";
import "../../assets/css/ComponentPlayerInfo.css";
import { Avatar } from "@mui/material";
import { UserInfo } from "../types/UserInfo";

export const ComponentPlayerInfoWaiting : React.FC<{ player: UserInfo }> = ({ player }) => {

    return (
        <>
        <div className="wrapper-multi">
            <Avatar
            sx={{ width: 80, height: 80 }}
            alt="image de profil"
            src= {player.profilPicture}
            />
            <div className="player-info-waiting">
                <div className="name">{player.name}</div>
            </div>
        </div>
        </>
    );
};