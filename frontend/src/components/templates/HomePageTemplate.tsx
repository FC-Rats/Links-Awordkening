import React from "react";
import { CenteredLogo } from "../atoms/CenteredLogo";
import { CaseHomePageContainer } from "../organisms/CaseHomePageContainer";
import { SubmitButton } from "../molecules/SubmitButton";
import Stack from "@mui/material/Stack/Stack";

export const HomePageTemplate = () => {
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const url = 'http://localhost/Links-Awordkening/api/Log/testClass.php'; // Correction de l'URL
        const data = { "idUser": 145, "dateTime": "11-11-1999 12:02:00", "log": "Testing", "ip": "12.0.0.2" };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( {log : data})
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Réponse du serveur : ', responseData);
            } else {
                console.error('Erreur lors de la requête : ', response.status);
            }
        } catch (error) {
            console.error('Une erreur s\'est produite : ', error);
        }
    };

    return (
        <Stack spacing={5} direction="column" flexWrap="wrap" justifyContent="center" alignItems="center">
            <CenteredLogo />
            <form onSubmit={handleSubmit}>
                <SubmitButton text={"Jouer"} />
            </form>
            {/* TODO changer par un RedirectButton quand les routeurs seront faits */}
            {/* <CaseHomePageContainer /> */}
        </Stack>
    );
};
