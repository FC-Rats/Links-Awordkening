import React, { useState, useEffect } from "react";
import { InputForm } from "../molecules/InputForm";
import { SubmitButton } from "../molecules/SubmitButton";
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Stack } from "@mui/material";
import { FormData } from '../types/ModifyUserFormData';
import ModifyUserRadioGroup from "../molecules/ModifyUserRadioGroup";

function ModifyUser() {
  const [formData, setFormData] = useState<FormData>({
    pseudo: '',
    year: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    admin: false,
    verified: false
  });

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const handleInputChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(formData);
  };

  /*   const handleChangeAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, admin: event.target.value });
    };
  
    const handleChangeVerfied = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, verified: event.target.value });
    }; */

  return (
    <div className="form-container">
      <form className="form" method="post" onSubmit={handleSubmit}>
        <Typography component="h2" variant="h4">
          Modifer l'utilisateur
        </Typography>
        <InputForm name="pseudo" label="Pseudo" type="text" required onInputChange={handleInputChange} />
        <InputForm name="year" label="Année de naissance" type="number" min={1900} max={2024} required onInputChange={handleInputChange} />
        <InputForm name="email" label="Email" type="email" required onInputChange={handleInputChange} />
        <Stack spacing={2} direction="column" flexWrap="wrap" justifyContent="center" alignItems="center">
          <ModifyUserRadioGroup title="Admin" name="admin" value={formData.admin} onInputChange={handleInputChange} />
          <ModifyUserRadioGroup title="Vérifié" name="verified" value={formData.verified} onInputChange={handleInputChange} />
        </Stack>
        <SubmitButton text="Valider" />
      </form>
    </div>
  );
}

export default ModifyUser;
