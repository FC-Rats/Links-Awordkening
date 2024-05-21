import React, { useState } from "react";
import { InputForm } from "../molecules/InputForm";
import { Link } from "../atoms/Link";
import { SubmitButton } from "../molecules/SubmitButton";
import "../../assets/css/Form.css"

interface ForgotFormProps {
    onSubmit: () => void;
    onInputChange: (name: string, value: string) => void;
}

export const ForgotpasswordForm : React.FC<ForgotFormProps> = ({ onSubmit, onInputChange }) =>{

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
                <InputForm name="email" label={"Email"} required onInputChange={handleInputChange}/>
                <SubmitButton text={"Envoyer le mail"}/>
                <Link text='Je me souviens de mon mot de passe :)' url=''/>
            </form>
        </div>
    );
};
