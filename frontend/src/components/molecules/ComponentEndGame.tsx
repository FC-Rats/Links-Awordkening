import React, { useState } from "react";
import "../../assets/css/ComponentPlayerInfo.css";
import { PlayerInfo } from "../types/PlayerInfo";
import { Avatar, Badge, Button, Dialog, DialogTitle, IconButton } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Graph, { TestData } from "./Graph";
import CloseIcon from '@mui/icons-material/Close';

export const ComponentEndGame: React.FC<{ item: PlayerInfo; isMulti: boolean; winner?: boolean;graphs: { [key: string]: TestData }; }> = ({ item, isMulti, winner, graphs }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className={isMulti ? "wrapper-multi-end-game" : "wrapper-solo"}>
        <div className="badge-avatar">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            badgeContent={winner ? <EmojiEventsIcon sx={{ color: "gold"}} /> : null}
          >
            <Avatar sx={{ width: 80, height: 80 }} alt="image de profil" src={item.player_url} />
          </Badge>
        </div>
        <div className="player-info-end-game">
          <div className="name">{item.player_name}</div>
          <div className="score">Score : {item.player_score}</div>
          <Button onClick={handleOpen} id={"see-graph"+item.player_id} sx={{ backgroundColor: '#2B5C4A', color: 'white', '&:hover': { backgroundColor: '#3e6d5b' } }}>Voir le graph</Button>
          <Dialog open={open} onClose={handleClose} PaperProps={{style: {width: '70%',maxWidth: '70%', backgroundColor:'#D2B48C'},}}>
              <IconButton aria-label="close" onClick={handleClose} style={{ position: 'absolute', right: '10px', top: '10px' }}>
                <CloseIcon />
              </IconButton>
            <DialogTitle>Graphe de {item.player_name}</DialogTitle>
            <Graph data={graphs[item.player_id]} />
          </Dialog>
        </div>
      </div>
    </>
  );
};
