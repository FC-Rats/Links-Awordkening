import { useState } from "react";
import { accountForgotPassword } from "../../services/PermissionsServices";
import { AlertBox } from "../molecules/AlertBox";
import { ForgotPasswordTemplate } from "../templates/ForgotPasswordTemplate";

export const ForgotPasswordPage = () => {

    /* SNACK BAR - ALERT HANDLING */
    const [alertBox, setAlertBox] = useState({
        severity: "success",
        open: false,
        message: '',
    });

    /**
     * @description Permet de fermer automatique l'Alertbox au bout de 4 secondes
     */
    const handleAlert = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertBox(prevState => ({
            ...prevState,
                open: false,
        }));        
    };

    /* ENVOI DU FORMULAIRE - ACTION PRINCIPALE */
    const [formData, setFormData] = useState({
        email: '',
    });

    const handleInputChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };
    
    const handleSubmit = async () => {
        console.log(formData);
        const data = await accountForgotPassword(formData.email); // Fonction de connexion
        console.log(data);
        if (!data.success) {
            setAlertBox(prevState => ({
                ...prevState,
                    severity : "error",
                    open: true,
                    message : data.message
            }));      
        } else {
            setAlertBox(prevState => ({
                ...prevState,
                    severity : 'success',
                    open: true,
                    message : data.message
            }));      
        }
    };

    return (
       <>
            <AlertBox severity={alertBox.severity} open={alertBox.open} message={alertBox.message} handleClose={handleAlert}></AlertBox>
            <ForgotPasswordTemplate onSubmit={handleSubmit} onInputChange={handleInputChange} />
       </>
    );
};
