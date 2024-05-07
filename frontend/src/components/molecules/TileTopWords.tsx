import React from "react";
import "../../assets/css/TileTopWords.css";

export const TileTopWords = (props: { words : string[]}) => {
    let opacity = 100;

    return (
        <div className="tile-topwords-info">
            <div className="text-content">
                <h2>Top 5 de vos mots</h2>
                <ul>
                {props.words.map((game, index) => {
                    opacity -= 9;
                    const marge = Math.floor(Math.random() * (50 - 2 + 1)) + 2;
                    const style = {
                        color: `#58492e${String(opacity)}`,
                        margin: `0 ${marge}px 25px ${marge}px`
                    };
                    return (
                        <li className="value" style={style}>
                            {game}
                        </li>
                    );
                })}    
                </ul>          
            </div>
        </div>
    );
};