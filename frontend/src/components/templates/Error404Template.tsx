import React, { useState } from "react";
import { CenteredLogo } from "../atoms/CenteredLogo";
import Stack from "@mui/material/Stack/Stack";


export const Error404Template = (props:{url:string}) => {

    return (
       <>
        <Stack spacing={{ xs: 1, sm: 2 }} direction="column" flexWrap="wrap" justifyContent="center" alignItems="center">
            <CenteredLogo/>
            <p><b>404</b>. That's an error.</p>
            <p>The requested URL /{props.url} was not found on this server.<br></br> That's all we know.</p>       
       </Stack>
       </>
    );
};
