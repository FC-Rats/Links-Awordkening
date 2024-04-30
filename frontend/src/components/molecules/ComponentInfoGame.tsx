import React from "react";
import "../../assets/css/ComponentInfoGame.css";

export interface Infogame {
  title: string;
  info: string;
}

export const ComponentInfoGame: React.FC<{ item: Infogame }> = ({ item }) => {
  return (
    <div className="component-info-game">
      <div className="title">{item.title}</div>
      <div className="info">{item.info}</div>
    </div>
  );
};

