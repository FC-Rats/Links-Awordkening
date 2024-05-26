import { CenteredLogo } from "../atoms/CenteredLogo";
import { SubmitButton } from "../molecules/SubmitButton";
import Stack from "@mui/material/Stack/Stack";
import { getLogs } from "../../services/LogServices";
import { CaseHomePageContainer } from "../organisms/CaseHomePageContainer";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../hooks/AppContext";

export const HomePageTemplate = () => {
    const [isgame, setisgame] = useState(false);
    const context = useContext(AppContext);

    useEffect(() => {
        if (context?.user) {
            setisgame(true);
        }
    }, [context?.user]);

    const navigate = useNavigate();
    
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (isgame){
            navigate("/game");
        } else {
            navigate("/sign-in");
        }

       return 
    };

    return (
        <Stack spacing={5} direction="column" flexWrap="wrap" justifyContent="center" alignItems="center">
            <CenteredLogo />
            <form onSubmit={handleSubmit}>
                <SubmitButton text={isgame ? "Jouer" : "Se connecter"} />
            </form>
            <CaseHomePageContainer />
        </Stack>
    );
};
