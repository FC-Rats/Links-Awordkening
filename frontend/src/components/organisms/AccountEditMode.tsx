import React from 'react';
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SubmitButton } from '../molecules/SubmitButton';
import { InputForm } from '../molecules/InputForm';
import options from "../../assets/data/options.json";
import { UserInfo } from '../types/UserInfo';

export const AccountEditMode = ({ formData, handleInputChange, handleSubmit, handleCancel, selectedImage, setSelectedImage }: { 
    formData: UserInfo;
    handleInputChange: (name: string, value: string | boolean) => void;
    handleSubmit: (event: React.FormEvent) => void;
    handleCancel: () => void;
    selectedImage: string;
    setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
    }) => {  
    
    const imageOptions = [
    '/img/profilepictures/strawberry.jpg',
    '/img/profilepictures/cherry.jpg',
    '/img/profilepictures/coconut.jpg',
    '/img/profilepictures/kiwi.jpg',
    '/img/profilepictures/lemon.jpg',
    '/img/profilepictures/mushroom.jpg',
    '/img/profilepictures/broccoli.jpg',
    '/img/profilepictures/potato.jpg',
    '/img/profilepictures/peach.jpg',
    '/img/profilepictures/pineapple.jpg',
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} className="container-account-params-edit">
        <Grid item>
          <Select
            className='select-profile-pic'
            value={selectedImage}
            name="profilPicture"
            label="ProfilPicture"
            sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
            onChange={(e) => {
              setSelectedImage(e.target.value as string);
              handleInputChange("profilPicture", e.target.value);
            }}
          >
            {imageOptions.map((image, index) => (
              <MenuItem key={index} value={image}>
                <img src={image} alt={`Menu ${index}`} style={{ width: '200px', marginRight: '1px' }} />
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          <InputForm
            label="Name"
            value={formData.name}
            name="name"
            type="text"
            required
            onInputChange={handleInputChange}
          />
          <InputForm
            label="Email"
            value={formData.email}
            name="email"
            type="email"
            required
            onInputChange={handleInputChange}
          />
          <InputForm
            label="Birth Year"
            value={formData.birthYear}
            name="birthYear"
            type="number"
            min={1800}
            max={2024}
            required
            onInputChange={handleInputChange}
          />
          <div className="contour-input-form">
            <Autocomplete
              className='input-form'
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                },
                paddingY: 1,
                width: "90%"
              }}
              disablePortal
              options={options}
              getOptionLabel={(option) => option.label}
              value={options.find(option => option.value === formData.visibility) || null}
              onChange={(event, newValue) => {
                if (newValue) {
                  handleInputChange("visibility", newValue.value);
                }
              }}
              renderInput={(params) => <TextField {...params} label="Visibilité" />}
            />
          </div>
          <Button onClick={handleCancel}><CloseIcon fontSize="large" className="cross-ModifyUser" /></Button>
          <SubmitButton text="Enregistrer" />
        </Grid>
      </Grid>
    </form>
  );
};

export default AccountEditMode;
