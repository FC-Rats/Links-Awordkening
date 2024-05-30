import React, { useEffect, useState } from "react";
import { InputForm } from "../molecules/InputForm";
import { Link } from "../atoms/Link";
import { SubmitButton } from "../molecules/SubmitButton";
import "../../assets/css/Form.css";
import { ChipsValidationPassword } from "../molecules/ChipsValidationPassword";

interface FormsProps {
    onSubmit: () => void;
    onInputChange: (name: string, value: string) => void;
    reset: boolean;
}

export const SignUpForm: React.FC<FormsProps> = ({ onSubmit, onInputChange, reset }) => {
    const [formValues, setFormValues] = useState({
        username: '',
        birthYear: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });

    useEffect(() => {
        if (reset) {
            // Reset all fields
            setFormValues({
                username: '',
                birthYear: '',
                email: '',
                password: '',
                passwordConfirmation: ''
            });
        }
    }, [reset]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit();
    };

    const handleInputChange = (name: string, value: string) => {
        setFormValues({
            ...formValues,
            [name]: value
        });
        onInputChange(name, value);
    };

    const { username, birthYear, email, password, passwordConfirmation } = formValues;

    return (
        <div className="form-container">
            <form className="form" method="post" onSubmit={handleSubmit}>
                <img src="/img/swatches/LARectPA.png" alt="logo Links Awordkening" />
                <InputForm name="username" label={"Pseudo"} type="text" required value={username} onInputChange={handleInputChange} />
                <InputForm name="birthYear" label={"Année de naissance"} type="number" min={1900} max={2024} required value={birthYear} onInputChange={handleInputChange} />
                <InputForm name="email" label={"Email"} type="email" required value={email} onInputChange={handleInputChange} />
                <InputForm name="password" label={"Mot de passe"} type="password" required value={password} onInputChange={handleInputChange} />
                <ChipsValidationPassword password={password} />
                <InputForm name="passwordConfirmation" label={"Confirmez le mot de passe"} type="password" required value={passwordConfirmation} onInputChange={handleInputChange} />
                <SubmitButton text={"S'inscrire"} />
                <Link text='Vous possédez un compte ? Se connecter' url="/sign-in" />
            </form>
        </div>
    );
};
