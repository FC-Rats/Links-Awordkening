import React from "react";
import "../../assets/css/ComponentInfoGame.css";
import { GameInfo } from "../types/GameInfo";

export const ComponentInfoGame: React.FC<{ item: GameInfo }> = ({ item }) => {
  return (
    <div className="component-info-game">
      <div className="title">{item.title}</div>
      <div className="info">{item.info}</div>
    </div>
  );
};

export type { GameInfo };

