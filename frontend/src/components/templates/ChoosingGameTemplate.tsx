import React from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { Button, Stack, Typography } from "@mui/material";
import { StatePage } from "../types/StatePage";

interface ChooseProps {
    handleNextPage: (newPage: StatePage) => void;
}

export const ChoosingGameTemplate: React.FC<ChooseProps> = ({ handleNextPage }) => {

/*     const ChoosePage = (join: boolean) => () => {
        if (join) {
            setStatePage("joining");
        } else {
            setStatePage("creating");
        }
    }; */

    return (
        <>
            <Stack sx={{ minHeight: '100vh' }} direction="column" spacing={2} justifyContent="center" alignItems="center">
                <CenteredTitle text="Jouez !" />
                <Typography variant="h6" sx={{ paddingTop: '50px' }}>
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
