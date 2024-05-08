import React, { useState } from "react";
import { InputForm } from "../molecules/InputForm";
import { Link } from "../atoms/Link";
import { SubmitButton } from "../molecules/SubmitButton";
import "../../assets/css/Form.css"


export const SignInForm = () => {
    const [formData, setFormData] = useState({
        pseudo: '',
        password: '',
    });

    const handleInputChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };
    

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log(formData);
    };

    return (
        <div className="form-container">
            <form className="form" method="post" onSubmit={handleSubmit}>
                <img src="/img/LARectPA.png" alt="logo Links Awordkening" />
                <InputForm name="pseudo" label={"Pseudo"} required onInputChange={handleInputChange}/>
                <InputForm name="password" label={"Mot de passe"} type="password" required onInputChange={handleInputChange}/>
                <SubmitButton text={"Se connecter"}/>
                <Link text='Pas de compte ? S’inscrire' url=''/>
            </form>
        </div>
    );
};
