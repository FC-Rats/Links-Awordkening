import React, { useState } from "react";
import { InputForm } from "../molecules/InputForm";
import { SubmitButton } from "../molecules/SubmitButton";
import Typography from '@mui/material/Typography';
import { Stack } from "@mui/material";
import { UserInfo } from '../types/UserInfo';
import ModifyUserRadioGroup from "../molecules/ModifyUserRadioGroup";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "../../assets/css/ModifyUser.css"
import "../../assets/css/InputForm.css"
import options from "../../assets/data/options.json"
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { updateUser } from '../../services/UserServices';

function ModifyUser({ user, onClose, setUsers }: { user: UserInfo, onClose: () => void, setUsers: React.Dispatch<React.SetStateAction<UserInfo[]>> }) {
  const [formData, setFormData] = useState<UserInfo>(user);

  const handleInputChange = (name: string, value: any) => {
    if (name === "admin" || name === "verified") {
      value = value === "true";
    }
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleAutocompleteChange = (event: any, value: { label: string; value: string } | null) => {
    if (value) {
      setFormData(prevFormData => ({ ...prevFormData, visibility: value.value }));
    }
  };

  const transformUserInfoToRecord = (userInfo: UserInfo): Record<string, string | number | null> => {
    return {
      id: userInfo.id,
      email: userInfo.email,
      username: userInfo.name,
      tokenR: userInfo.tokenR,
      visibility: userInfo.visibility,
      verified: userInfo.verified ? 1 : 0, // Convertir boolean en number
      admin: userInfo.admin ? 1 : 0, // Convertir boolean en number
      birthYear: userInfo.birthYear,
      password: userInfo.password || null
    };
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const transformedData = transformUserInfoToRecord(formData);
    const response = await updateUser(transformedData);
    if (response.length === 0) {
      setUsers(prevUsers => prevUsers.map(user => user.id === transformedData.id ? formData : user));
    }
    onClose();
  };

  return (
    <div className="">
      <form className="form-ModifyUser" method="post" onSubmit={handleSubmit}>
        <Stack spacing={2} direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center">
          <Typography component="h2" variant="h5">
            Modifer l'utilisateur
          </Typography>
          <Button onClick={onClose}><CloseIcon fontSize="large" className="cross-ModifyUser" /></Button>
        </Stack>
        <InputForm name="name" value={formData.name} label="Pseudo" type="text" required onInputChange={handleInputChange} />
        <InputForm name="birthYear" value={formData.birthYear} label="Année de naissance" type="number" required onInputChange={handleInputChange} />
        <InputForm name="email" value={formData.email} label="Email" type="email" required onInputChange={handleInputChange} />
        <div className="contour-input-form">
          <Autocomplete
            className='input-form'
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent', // retire le bord en état normal
                },
                '&:hover fieldset': {
                  borderColor: 'transparent', // bord visible au survol
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'transparent', // bord plus visible quand l'input est focus
                },
              },
              paddingY: 1,
              width: "90%"
            }}
            disablePortal
            options={options}
            getOptionLabel={(option) => option.label}
            value={options.find(option => option.value === formData.visibility) || null}
            onChange={handleAutocompleteChange}
            renderInput={(params) => <TextField {...params} label="Visibilité" />}
          />
        </div>
        <Stack spacing={2} direction="column" flexWrap="wrap" justifyContent="center" alignItems="center">
          <ModifyUserRadioGroup title="Admin" name="admin" value={formData.admin} onInputChange={handleInputChange} />
          <ModifyUserRadioGroup title="Vérifié" name="verified" value={formData.verified} onInputChange={handleInputChange} />
        </Stack>
        <Stack display="flex" justifyContent="center" alignItems="center">
          <SubmitButton text="Valider" />
        </Stack>
      </form>
    </div>
  );
}


export default ModifyUser;
