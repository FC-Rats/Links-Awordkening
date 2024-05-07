import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { InputForm } from '../molecules/InputForm';
import { useState } from 'react'
import '../../assets/css/AcceptRefuseFriendRequest.css';
import { SubmitButton } from '../molecules/SubmitButton';

function SearchFriends() {
  const [formData, setFormData] = useState({
    codeRoom: '',
  });

  const handleInputChange = (name: string, value: any) => {
      setFormData({ ...formData, [name]: value });
  };

  return (
    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" flexWrap="wrap" justifyContent="center" alignItems="center">
      <InputForm name="codeRoom" label='Joindre la partie' onInputChange={handleInputChange} />
      <SubmitButton text="Valider" />
    </Stack>
  )
}

export default SearchFriends