import React from "react";
import "../../assets/css/style.css";
import "../../assets/css/infogames.css";

export interface Infogame {
  title: string;
  info: string;
}

export const ComponentInfoGame: React.FC<{ item: Infogame }> = ({ item }) => {
  return (
    <div className="component">
      <div className="title">{item.title}</div>
      <div className="info">{item.info}</div>
    </div>
  );
};

