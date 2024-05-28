import React from "react";
import { InputForm } from "../molecules/InputForm";
import { Link } from "../atoms/Link";
import { SubmitButton } from "../molecules/SubmitButton";
import "../../assets/css/Form.css"

interface ForgotFormProps {
    onSubmit: () => void;
    onInputChange: (name: string, value: string) => void;
}

export const ChangePasswordForm : React.FC<ForgotFormProps> = ({ onSubmit, onInputChange }) =>{

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
                <InputForm name="password" label={"Mot de passe"}  type="password" required onInputChange={handleInputChange}/>
                <InputForm name="passwordConfirmation" label={"Confirmez le mot de passe"}  type="password" required onInputChange={handleInputChange}/>
                <SubmitButton text={"Enregistrer le mot de passe"}/>
                <Link text="Annuler et revenir à l'accueil" url='/'/>
            </form>
        </div>
    );
};
