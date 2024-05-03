import React, { useState } from "react";
import { CenteredLogo } from "../atoms/CenteredLogo";
import { CaseHomePageContainer } from "../organisms/CaseHomePageContainer";
import { SubmitButton } from "../molecules/SubmitButton";
import Stack from "@mui/material/Stack/Stack";


export const HomePage = () => {


    return (
        <>
            <Stack spacing={5} direction="column" flexWrap="wrap" justifyContent="center" alignItems="center">
                <CenteredLogo />
                <SubmitButton text={"Jouer"} />
                {/* TODO changer par un RedirectButton quand les routeurs seront fait  */}
                <CaseHomePageContainer />
            </Stack>
        </>
    );
};
