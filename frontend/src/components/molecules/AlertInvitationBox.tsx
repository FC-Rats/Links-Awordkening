import { Alert, Button, Snackbar } from "@mui/material";
import React from "react";

interface AlertBoxProps {
    open: boolean;
    message: string;
    handleRefuse: () => void;
    handleAccept: () => void;
    handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
}

export const AlertInvitationBox : React.FC<AlertBoxProps> = ({ open, message, handleRefuse, handleAccept, handleClose }) => {
    return (
        <Snackbar 
            open={open} 
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity = "info"
                    sx={{ width: '100%' }}
                >
                    {message}
                    <Button color="inherit" size="small" className="invitationbutton acceptRefuseFriendRequest-accept" onClick={handleAccept}>
                        Accepter
                    </Button>
                    <Button color="inherit" size="small" className="invitationbutton acceptRefuseFriendRequest-refuse" onClick={handleRefuse}>
                        Refuser
                    </Button>
                </Alert>
        </Snackbar>
    );
};