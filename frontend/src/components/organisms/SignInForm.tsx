import React, { useState } from "react";
import { InputForm } from "../molecules/InputForm";
import { Link } from "../molecules/Link";
import { SubmitButton } from "../molecules/SubmitButton";
import "../../assets/css/Form.css"


export const SignInForm = () => {
    const [formData, setFormData] = useState({
        pseudo: '',
        password: '',

    });
    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="form-container">
            <form className="form" method="post" action="">
                <img src="/img/LARectPA.png" alt="logo Links Awordkening" />
                <InputForm name="pseudo" label={"Pseudo"} required onChange={handleInputChange}/>
                <InputForm name="password" label={"Mot de passe"} type="password" required onChange={handleInputChange}/>
                <SubmitButton text={"Se connecter"}/>
                <Link text='Pas de compte ? S’inscrire' url=''/>
            </form>
        </div>
    );
};
