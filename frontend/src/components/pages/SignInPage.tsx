import { useEffect, useState } from "react";
import { accountConnection, accountVerify } from "../../services/PermissionsServices";
import { SignInTemplate } from "../templates/SignInTemplate";
import { AlertBox } from "../molecules/AlertBox";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/AppContext";
import { UserInfo } from "../types/UserInfo";

export const SignInPage : React.FC = () => {
    const navigate = useNavigate();
    const { logIn } = useUserContext(); 
    const url = new URLSearchParams(useLocation().search);
    const [hasVerified, setHasVerified] = useState(false); // State to track if verification has been done
    /* SNACK BAR - ALERT HANDLING */
    const [alertBox, setAlertBox] = useState({
        severity: "success",
        open: false,
        message: '',
    });

    useEffect(() => {
        const verifyAccount = async () => {
          const token = url.get('token');
          if (token && !hasVerified) {
            console.log(token);
            const data = await accountVerify(token);
            if (!data.success) {
              setAlertBox(prevState => ({
                ...prevState,
                severity: 'error',
                open: true,
                message: data.message
              }));
            }
            setHasVerified(true); // Set to true after verification
          }
        };
    
        verifyAccount();
      }, [url, hasVerified]);

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
        password: '',
    });

    const handleSubmit = async () => {
        console.log(formData);
        const data = await accountConnection(formData); // Fonction de connexion
        console.log(data);
        if (!data.success) {
            setAlertBox(prevState => ({
                ...prevState,
                 severity : 'error',
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
            handleSuccessfulLogin(data.data);
        }
    };

    const handleSuccessfulLogin = (userData: UserInfo) => {
        logIn(userData);
        navigate("/account-param");
    };

    const handleInputChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    return (
       <>
            <AlertBox severity={alertBox.severity} open={alertBox.open} message={alertBox.message} handleClose={handleAlert}></AlertBox>
            <SignInTemplate onSubmit={handleSubmit} onInputChange={handleInputChange} />
       </>
    );
};
