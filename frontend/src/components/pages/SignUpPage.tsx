import { useState } from "react";
import { SignUpTemplate } from "../templates/SignUpTemplate";
import { accountInscription } from "../../services/PermissionsServices";
import { AlertBox } from "../molecules/AlertBox";

export const SignUpPage = () => {

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
        username: '',
        birthYear: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });

    const handleSubmit = async () => {
        console.log(formData);
        const data = await accountInscription(formData); // Fonction de connexion
        console.log(data);
        if (!data.success) {
            setAlertBox(prevState => ({
                ...prevState,
                    severity : data.typeError != undefined ? data.typeError : "error",
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

    const handleInputChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    return (
       <>
            <AlertBox severity={alertBox.severity} open={alertBox.open} message={alertBox.message} handleClose={handleAlert}></AlertBox>
            <SignUpTemplate onSubmit={handleSubmit} onInputChange={handleInputChange} />
       </>
    );
};
