import React, { useState } from "react";
import { InputForm } from "../molecules/InputForm";
import { Link } from "../molecules/Link";
import { SubmitButton } from "../molecules/SubmitButton";
import "../../assets/css/Form.css"


export const SignUpForm = () => {
    const [formData, setFormData] = useState({
        pseudo: '',
        year: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });

    const handleInputChange = (name: string, value: any) => {
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
                <InputForm name="pseudo" label={"Pseudo"} type="text" required onInputChange={handleInputChange}/>
                <InputForm name="year" label={"Année de naissance"} type="number" min={1900} max={2024} required onInputChange={handleInputChange}/>
                <InputForm name="email" label={"Email"} type="email" required onInputChange={handleInputChange}/>
                <InputForm name="password" label={"Mot de passe"} type="password" required onInputChange={handleInputChange}/>
                <InputForm name="passwordConfirmation" label={"Confirmez le mot de passe"} type="password" required onInputChange={handleInputChange}/>
                {/* <p>Doit contenir au moins: </p>
                <ul>
                    <li>12 caractères</li>
                    <li>1 majuscule</li>
                    <li>1 chiffre</li>
                    <li>1 caractère spécial</li>
                    <li>1Les mots de passe doivent être identiques</li>
                </ul> */}
                <SubmitButton text={"S'inscrire"}/>
                <Link text='Vous possésez un compte ? Se connecter' url=''/>
            </form>
        </div>
    );
};
