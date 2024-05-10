import React from 'react';
import { Avatar, Grid, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { UserInfo } from '../types/UserInfo';

export const AccountViewMode = ({ formData, setEditMode }: { formData: UserInfo; setEditMode: React.Dispatch<React.SetStateAction<boolean>>; }) => {
  return (
    <div>
      <Grid container spacing={2} className="container-account-params">
        <Grid item>
          <Avatar className="avatar-account" alt={formData.name} src={formData.profilPicture} />
        </Grid>
        <Grid item>
          <Typography className="h5-account">{formData.name}</Typography>
          <Typography className="p-account">Email: {formData.email}</Typography>
          <Typography className="p-account">Birth Year: {formData.birthYear}</Typography>
          <Typography className="p-account">Visibility: {formData.visibility}</Typography>
        </Grid>
        <IconButton onClick={() => setEditMode(true)}><EditIcon fontSize="large" /></IconButton>
      </Grid>
    </div>
  );
};
