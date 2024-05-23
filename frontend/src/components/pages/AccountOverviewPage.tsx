import { AccountOverviewTemplate } from "../templates/AccountOverviewTemplate";
import { AccountStatProps } from "../types/AccountStatProps";
import table from "../../assets/data/historique.json";
import { useContext, useEffect, useState } from "react";
import { getStats } from "../../services/UserServices";
import { AppContext } from "../hooks/AppContext";

const createAccountStatProps = (response: any[]): AccountStatProps => {
    // Calculer le nombre de jeux
    const statGameCount = response.length;

    // Extraire les scores
    const scores = response.map(item => item.score);
    const statBestScore = Math.max(...scores);
    const statTotalScore = scores.reduce((acc, score) => acc + score, 0);
    const statAverageScore = parseFloat((statTotalScore / statGameCount).toFixed(2));

    // Compter les occurrences de chaque mot
    const wordOccurrences: { [key: string]: number } = {};
    response.forEach(item => {
        if (item.words) {
            const words = item.words.split(',').map((word:string) => word.trim());
            words.forEach((word:string) => {
                if (wordOccurrences[word]) {
                    wordOccurrences[word]++;
                } else {
                    wordOccurrences[word] = 1;
                }
            });
        }
    });

    // Trier les mots par fréquence et en prendre les 5 premiers
    const sortedWords = Object.entries(wordOccurrences)
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0]);

    const words = sortedWords.slice(0, 5);

    return {
        statGameCount,
        statBestScore,
        statAverageScore,
        statTotalScore,
        words,
        table: response,
    };
};

export const AccountOverviewPage = () => {
    const user = useContext(AppContext);

    const [scores, setScores] = useState<AccountStatProps | null>(null);
    const [status, setStatus] = useState<number | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const param = { idUser: user?.user?.id };
        const fetchData = async () => {
            try {
                const response = await getStats(param);
                if (Array.isArray(response)) {
                    console.log(response);
                    const responseModified = createAccountStatProps(response);
                    console.log(responseModified);
                    setScores(responseModified);
                } else if (typeof response === 'number') {
                    setStatus(response);
                } else {
                    setError(new Error('Unknown response format'));
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des scores : ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {status !== null ? (
                <p>Statut de la réponse : {status}</p>
            ) : (error !== null) ? (
                <p>Erreur lors de la récupération des scores : {error.toString()}</p>
            ) : (scores === null) ? (
                <p>Loading...</p>
            ) : (
                <AccountOverviewTemplate data={scores} />
            )}
        </>
    );
};
