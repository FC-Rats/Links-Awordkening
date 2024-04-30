import React, { useEffect, useState } from "react";
import ImgLA from "../../assets/img/LARectPA.png";
import "../../assets/css/ComponentEndGame.css";

export const ComponentEndGame = () => {
    const [score, setScore] = useState<number>();

    useEffect(() => {
        const ScoreData = 88;
        setScore(ScoreData);
    }, []);

    return (
        <>
            <div className="wrapper-end-game">
                <img className="img-end-game" src={ImgLA} alt="Bravo" />
                <div className="title">Bravo !</div>
                {score !== null && <div className="info">Votre score : {score}</div>}
            </div>
        </>
    );
};
