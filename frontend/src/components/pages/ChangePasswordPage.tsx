import { BrowserRouter as Router, Route, useLocation, useParams } from 'react-router-dom';
import { ChangePasswordTemplate } from "../templates/ChangePasswordTemplate";
import { useEffect, useState } from 'react';
import { accountChangePassword } from '../../services/PermissionsServices';
import { AlertBox } from '../molecules/AlertBox';

export const ChangePasswordPage = () => {
    /* SNACK BAR - ALERT HANDLING */
    const [alertBox, setAlertBox] = useState({
        severity: "success",
        open: false,
        message: '',
    });

    const [formData, setFormData] = useState({
        token: '',
        password: '',
        passwordConfirmation: '',
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
    const url = new URLSearchParams(useLocation().search);
    const [hasVerified, setHasVerified] = useState(false); // State to track if verification has been done

    useEffect(() => {
        const verifyAccount = () => {
          const token = url.get('token');
          if (token && !hasVerified) {
            setFormData((prevFormData) => ({ ...prevFormData, token: token }));
            setHasVerified(true); // Set to true after verification
          }
        };
      
        verifyAccount();
      }, [url, hasVerified]);      
      
    const handleInputChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = async () => {
        const data = await accountChangePassword(formData); // Fonction de connexion
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
            <ChangePasswordTemplate onSubmit={handleSubmit} onInputChange={handleInputChange} />
       </>
    );
};

