import React, { useState } from "react";
import { InputForm } from "../molecules/InputForm";
import { Link } from "../atoms/Link";
import { SubmitButton } from "../molecules/SubmitButton";
import "../../assets/css/Form.css"

interface SignInProps {
    onSubmit: () => void;
    onInputChange: (name: string, value: string) => void;
}

export const SignInForm : React.FC<SignInProps> = ({ onSubmit, onInputChange }) =>{
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit();
    };

    const handleInputChange =  (name: string, value: string) => {
        onInputChange(name, value);
    };

    return (
        <div className="form-container">
            <form className="form" method="post" onSubmit={handleSubmit}>
                <img src="/img/swatches/LARectPA.png" alt="logo Links Awordkening" />
                <InputForm name="username" label={"Pseudo"} required onInputChange={handleInputChange}/>
                <InputForm name="password" label={"Mot de passe"} type="password" required onInputChange={handleInputChange}/>
                <SubmitButton text={"Se connecter"}/>
                <Link text='Pas de compte ? S’inscrire' url=''/>
            </form>
        </div>
    );
};
