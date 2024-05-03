import React from "react";
import "../../assets/css/RuleBox.css";
import Typography from "@mui/material/Typography/Typography";
import { Box } from "@mui/material";

export const RuleBox = (props: {textRule:string;}) => {
    return (
        <Box className="box-rule">
            <Typography component="p" variant="h6">
                {props.textRule}
            </Typography>
        </Box>
    );
};
