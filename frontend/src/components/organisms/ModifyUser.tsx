import React, { useState } from "react";
import { InputForm } from "../molecules/InputForm";
import { SubmitButton } from "../molecules/SubmitButton";
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function ModifyUser() {
  const [formData, setFormData] = useState({
    pseudo: '',
    year: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    admin: '',
    verified: ''
  });

  const handleInputChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(formData);
  };

  const handleChangeAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, admin: event.target.value });
  };

  const handleChangeVerfied = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, verified: event.target.value });
  };

  return (
    <div className="form-container">
      <form className="form" method="post" onSubmit={handleSubmit}>
        <Typography component="h2" variant="h4">
          Modifer l'utilisateur
        </Typography>
        <InputForm name="pseudo" label="Pseudo" type="text" required onInputChange={handleInputChange} />
        <InputForm name="year" label="Année de naissance" type="number" min={1900} max={2024} required onInputChange={handleInputChange} />
        <InputForm name="email" label="Email" type="email" required onInputChange={handleInputChange} />
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Admin</FormLabel>
          <RadioGroup sx={{ display: 'flex', flexDirection: 'row' }}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="admin"
            value={formData.admin}
            onChange={handleChangeAdmin}
          >
            <FormControlLabel value={true} control={<Radio />} label="Oui" />
            <FormControlLabel value={false} control={<Radio />} label="Non" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Vérifié</FormLabel>
          <RadioGroup sx={{ display: 'flex', flexDirection: 'row' }}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="verified"
            value={formData.verified}
            onChange={handleChangeVerfied}
          >
            <FormControlLabel value={true} control={<Radio />} label="Oui" />
            <FormControlLabel value={false} control={<Radio />} label="Non" />
          </RadioGroup>
        </FormControl>
        <SubmitButton text="Valider" />
      </form>
    </div>
  );
}

export default ModifyUser;
