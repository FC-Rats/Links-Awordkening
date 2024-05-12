import React, { useState } from "react";
import { CenteredLogo } from "../atoms/CenteredLogo";
import { CaseHomePageContainer } from "../organisms/CaseHomePageContainer";
import { SubmitButton } from "../molecules/SubmitButton";
import Stack from "@mui/material/Stack/Stack";


export const HomePageTemplate = () => {
    
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        const url = 'http://localhost:3000/Links-Awordkening/api/Log/testClass.php';
        const data = {"idUser" : 145, "dateTime" : "11-11-1999 12:02:00", "log" : "Testing", "ip" : "12.0.0.2"};
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({ log : data })
        });
        const rep = await response.json();
        console.log(rep);
    };

    return (
        <>
            <Stack spacing={5} direction="column" flexWrap="wrap" justifyContent="center" alignItems="center">
                <CenteredLogo />
                <form method="post" onSubmit={handleSubmit}>
                    <div style={{ textAlign: "center" }} >
                    <SubmitButton text={"Jouer"} />
                    </div>
                </form>
                {/* TODO changer par un RedirectButton quand les routeurs seront fait  */}
                <CaseHomePageContainer />
            </Stack>
        </>
    );
};
