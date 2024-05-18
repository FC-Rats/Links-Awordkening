import React from 'react';
import { Avatar, Grid, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { UserInfo } from '../types/UserInfo';

export const AccountViewMode = ({ formData, handleEdit }: { formData: UserInfo; handleEdit: () => void; }) => {
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
        <IconButton onClick={handleEdit}><EditIcon fontSize="large" /></IconButton>
      </Grid>
    </div>
  );
};
