import React from 'react'
import { useState } from "react";
import { InputForm } from "../molecules/InputForm";
import { Link } from "../molecules/Link";
import { SubmitButton } from "../molecules/SubmitButton";
import "../../assets/css/Form.css"
import Typography from '@mui/material/Typography';

function ModifyUser() {
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
        <Typography component="h2" variant="h4">
          Modifer l'utilisateur
        </Typography>
        <InputForm name="pseudo" label={"Pseudo"} type="text" required onInputChange={handleInputChange} />
        <InputForm name="year" label={"Année de naissance"} type="number" min={1900} max={2024} required onInputChange={handleInputChange} />
        <InputForm name="email" label={"Email"} type="email" required onInputChange={handleInputChange} />

        <SubmitButton text={"Valider"} />
      </form>
    </div>
  );
}

export default ModifyUser