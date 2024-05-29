import { Chip } from "@mui/material";
import { useEffect, useState } from "react";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

export const ChipsValidationPassword = ({ password } : {password : string}) => {
    const [isValid, setIsValid] = useState({
        length: false,
        digit: false,
        specialChar: false,
        uppercase: false,
    });

    useEffect(() => {
        const lengthValid = password.length >= 12;
        const digitValid = /\d/.test(password);
        const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const uppercaseValid = /[A-Z]/.test(password);

        setIsValid({
            length: lengthValid,
            digit: digitValid,
            specialChar: specialCharValid,
            uppercase: uppercaseValid,
        });
    }, [password]);

    return (
        <div>
            <Chip
                icon={isValid.length ? <DoneIcon /> : <CloseIcon />}
                label="Au moins 12 caractères"
                color={isValid.length ? "success" : "warning"}
                style={{ marginBottom: 8 , marginRight: 5}}
                size="small"
            />
            <Chip
                icon={isValid.digit ? <DoneIcon /> : <CloseIcon />}
                label="Au moins un chiffre"
                color={isValid.digit ? "success" : "warning"}
                style={{ marginBottom: 8 }}
                size="small"
            />
            <Chip
                icon={isValid.specialChar ? <DoneIcon /> : <CloseIcon />}
                label="Au moins un caractère spécial"
                color={isValid.specialChar ? "success" : "warning"}
                style={{ marginBottom: 8, marginRight: 5 }}
                size="small"
            />
            <Chip
                icon={isValid.uppercase ? <DoneIcon /> : <CloseIcon />}
                label="Au moins une majuscule"
                color={isValid.uppercase ? "success" : "warning"}
                style={{ marginBottom: 8 }}
                size="small"
            />
        </div>
    );
};
