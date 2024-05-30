import React, { useState } from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { Button, Dialog, IconButton, Stack, Typography } from "@mui/material";
import { StatePage } from "../types/StatePage";
import { RulesTemplate } from "./RulesTemplate";
import CloseIcon from '@mui/icons-material/Close';

interface ChooseProps {
    handleNextPage: (newPage: StatePage) => void;
}

export const ChoosingGameTemplate: React.FC<ChooseProps> = ({ handleNextPage }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <>
            <Stack sx={{ minHeight: '100vh' }} direction="column" spacing={2} justifyContent="center" alignItems="center">
                <CenteredTitle text="Jouez !" />
                {/* A faire en composant */}
                <Dialog open={open} onClose={handleClose} PaperProps={{style: {width: '70%',maxWidth: '70%', backgroundColor:'#D2B48C'},}}>
                    <IconButton aria-label="close" onClick={handleClose} style={{ position: 'absolute', right: '10px', top: '10px' }}> {/* Ajout d'un IconButton */}
                        <CloseIcon />
                    </IconButton>
                    <RulesTemplate />
                </Dialog>
                <Button onClick={handleOpen} className="submit-button" id={"rules"} variant="contained" sx={{ padding: '10px 20px', fontSize: '16px' }}>Règles du jeu</Button>


                <Typography variant="h6" sx={{ paddingTop: '50px', textAlign: 'center' }}>
                    Voulez-vous rejoindre une partie ou créer votre partie ?
                </Typography>


                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" flexWrap="wrap">
                    <Button
                        variant="contained"
                        className="submit-button"
                        // onClick={ChoosePage(true)}
                        onClick={() => handleNextPage("joining")}
                        sx={{ padding: '10px 20px', fontSize: '16px' }}
                    >
                        Rejoindre une partie
                    </Button>
                    <Button
                        variant="contained"
                        className="submit-button"
                        // onClick={ChoosePage(false)}
                        onClick={() => handleNextPage("creating")}
                        sx={{ padding: '10px 20px', fontSize: '16px' }}
                    >
                        Créer une partie
                    </Button>
                </Stack>
            </Stack>
        </>
    );
};
