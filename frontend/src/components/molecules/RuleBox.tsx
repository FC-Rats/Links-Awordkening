import React from "react";
import "../../assets/css/RuleBox.css";
import Typography from "@mui/material/Typography/Typography";
import { Stack } from "@mui/system";

export const RuleBox = (props: {textRule:string; title:string;}) => {
    return (
        <Stack direction="column" className="box-rule" spacing={2}>
            <Typography component="h3" variant="h4">
                {props.title}
            </Typography>
            <Typography component="p" variant="h6" textAlign="center">
                {props.textRule}
            </Typography>
        </Stack>
    );
};
