import React, { useEffect, useState } from "react";
import "../../assets/css/ComponentListWords.css";

export const ComponentListWords = () => {
    const [listwords, setListWords] = useState<string[]>([]);

    useEffect(() => {
        const words = ["mot1", "mot2", "mot3", "mot4"]; //mots récup
        setListWords(words);
    }, []);

    return (
        <>
            <div className="wrapper-list-words">
                <h3>Liste des mots entrés</h3>
                <ol>
                {listwords.map((word, index) => (
                        <li key={index}>{word}</li>

                ))}</ol>
            </div>
        </>
    );
};
