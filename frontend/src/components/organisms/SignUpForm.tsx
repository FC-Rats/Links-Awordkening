import React, { useEffect, useState } from "react";
import { InputForm } from "../molecules/InputForm";
import { Link } from "../atoms/Link";
import { SubmitButton } from "../molecules/SubmitButton";
import "../../assets/css/Form.css";
import { ChipsValidationPassword } from "../molecules/ChipsValidationPassword";

interface FormsProps {
    onSubmit: () => void;
    onInputChange: (name: string, value: string) => void;
}

export const SignUpForm: React.FC<FormsProps> = ({ onSubmit, onInputChange }) => {
    const [password, setPassword] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit();
    };

    const handleInputChange = (name: string, value: string) => {
        if (name === "password") {
            setPassword(value);
        }
        onInputChange(name, value);
    };

    useEffect(() => {
        console.log(password);
    }, [password]);

    return (
        <div className="form-container">
            <form className="form" method="post" onSubmit={handleSubmit}>
                <img src="/img/swatches/LARectPA.png" alt="logo Links Awordkening" />
                <InputForm name="username" label={"Pseudo"} type="text" required onInputChange={handleInputChange} />
                <InputForm name="birthYear" label={"Année de naissance"} type="number" min={1900} max={2024} required onInputChange={handleInputChange} />
                <InputForm name="email" label={"Email"} type="email" required onInputChange={handleInputChange} />
                <InputForm name="password" label={"Mot de passe"} type="password" required onInputChange={handleInputChange} />
                <ChipsValidationPassword password={password} />
                <InputForm name="passwordConfirmation" label={"Confirmez le mot de passe"} type="password" required onInputChange={handleInputChange} />
                <SubmitButton text={"S'inscrire"} />
                <Link text='Vous possédez un compte ? Se connecter' url="/sign-in" />
            </form>
        </div>
    );
};
