import React, { useEffect, useState } from "react";
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
                <img className="img-end-game" src={"../../../public/img/LARectPA.png"} alt="Bravo" />
                <div className="title">Bravo !</div>
                {score !== null && <div className="info">Votre score : {score}</div>}
            </div>
        </>
    );
};
