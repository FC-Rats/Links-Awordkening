import React, { useState } from "react";
import { InputForm } from "../molecules/InputForm";
import { Link } from "../atoms/Link";
import { SubmitButton } from "../molecules/SubmitButton";
import "../../assets/css/Form.css"


export const ForgotpasswordForm = () => {
    const [formData, setFormData] = useState({
        email: '',
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
                <InputForm name="email" label={"Email"} required onInputChange={handleInputChange}/>
                <SubmitButton text={"Envoyer le mail"}/>
                <Link text='Je me souviens de mon mot de passe :)' url=''/>
            </form>
        </div>
    );
};
