import { Alert, AlertColor, AlertPropsColorOverrides, Snackbar } from "@mui/material";
import React from "react";

type Severity = "error" | "success" | "info" | "warning" | undefined;

export const AlertBox = (props: { severity: Severity; open: boolean ; message: string; }) => {
    const [open, setOpen] = React.useState(props.open);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
    };

    return (
        <Snackbar 
            open={open} 
            autoHideDuration={8000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity = {props.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {props.message}
                </Alert>
        </Snackbar>
    );
};