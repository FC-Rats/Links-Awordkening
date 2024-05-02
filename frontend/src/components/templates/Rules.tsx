import React from "react";
import Stack from "@mui/material/Stack/Stack";
import { CenteredTitle } from '../molecules/CenteredTitle';
import { ContainerRules } from "../organisms/ContainerRules";

export const Rules = () => {
    return (
        <>
            <CenteredTitle text={"Rules"}/>
            <ContainerRules/>
            </>
    );
};
