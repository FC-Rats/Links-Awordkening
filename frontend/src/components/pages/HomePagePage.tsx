import { Stack } from "@mui/system";
import { HomePageTemplate } from "../templates/HomePageTemplate";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ScoreBoardTemplate } from "../templates/ScoreBoardTemplate";
import { getMaxScores } from "../../services/ScoreServices";

interface Score {
    id: number;
    username: string;
    totalScore: string;
    visibility: string;
}

export const HomePagePage = () => {
    const [template, setTemplate] = useState<"homepage" | "classement">("homepage");
    const [title, setTitle] = useState<"Classement Global" | "Retour à l'accueil">("Classement Global");

    const handleChangingTemplatePage = () => {
        if (template === "homepage") {
            setTemplate("classement");
            setTitle("Retour à l'accueil");
        } else {
            setTemplate("homepage");
            setTitle("Classement Global");
        }
    };

    const [scores, setScores] = useState<Score[]>([]);

    useEffect(() => {
        const fetchMaxScores = async () => {
            try {
                const scoreResponse = await getMaxScores();
                setScores(scoreResponse);
            } catch (error) {
                console.error('Error fetching max scores:', error);
            }
        };
        fetchMaxScores();
    }, []);




    return (
        <>  
            <Stack direction="row" justifyContent="flex-end" alignItems="center">
                <Button variant="contained" className="return-button" size="large" onClick={() => handleChangingTemplatePage()}>{title}</Button>

            </Stack>
            {template === "homepage" && <HomePageTemplate scores={scores}/>}
            {template === "classement" && <ScoreBoardTemplate scores={scores}/>}
        </>
    );
};
