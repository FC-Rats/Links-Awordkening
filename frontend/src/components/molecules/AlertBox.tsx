import { Alert, Snackbar } from "@mui/material";
import React from "react";

type Severity = "error" | "success" | "info" | "warning" | undefined;

interface AlertBoxProps {
    severity: string;
    open: boolean;
    message: string;
    handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
}

export const AlertBox : React.FC<AlertBoxProps> = ({ severity, open, message, handleClose }) => {
    let sev = severity as Severity;

    return (
        <Snackbar 
            open={open} 
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity = {sev}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
        </Snackbar>
    );
};