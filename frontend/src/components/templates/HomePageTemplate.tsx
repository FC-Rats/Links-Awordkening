import { CenteredLogo } from "../atoms/CenteredLogo";
import { SubmitButton } from "../molecules/SubmitButton";
import { Stack, IconButton, Dialog, Button } from "@mui/material";
import { getLogs } from "../../services/LogServices";
import { CaseHomePageContainer } from "../organisms/CaseHomePageContainer";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../hooks/AppContext";
import CloseIcon from '@mui/icons-material/Close';
import { RulesTemplate } from "../templates/RulesTemplate";
interface Score {
    id: number;
    username: string;
    totalScore: string;
}

export const HomePageTemplate = ({ scores }: { scores: Score[]}) => {
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
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    return (
        <Stack spacing={5} direction="column" flexWrap="wrap" justifyContent="center" alignItems="center">
            <CenteredLogo />
            <form onSubmit={handleSubmit}>
                <SubmitButton text={isgame ? "Jouer" : "Se connecter"} />
            </form>
            <Dialog open={open} onClose={handleClose} PaperProps={{style: {width: '70%',maxWidth: '70%', backgroundColor:'#D2B48C'},}}>
                <IconButton aria-label="close" onClick={handleClose} style={{ position: 'absolute', right: '10px', top: '10px' }}> {/* Ajout d'un IconButton */}
                    <CloseIcon />
                </IconButton>
                <RulesTemplate />
            </Dialog>
                <Button onClick={handleOpen} className="submit-button" id={"rules"} variant="contained" sx={{ padding: '10px 20px', fontSize: '16px' }}>Règles du jeu</Button>
            <CaseHomePageContainer scores={scores} />
        </Stack>
    );
};
