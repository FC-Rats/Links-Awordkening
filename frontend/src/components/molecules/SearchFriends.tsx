import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { InputForm } from './InputForm';
import { useState } from 'react'
import '../../assets/css/AcceptRefuseFriendRequest.css';
import { ContainerFriendRequestsProps } from '../types/ContainerFriendRequestsProps';
import { Autocomplete, TextField } from '@mui/material';
import { SubmitButton } from './SubmitButton';

interface SearchFriendsProps {
  onSubmit: () => void;
  onInputChange: (value: number | undefined) => void;
  friends: ContainerFriendRequestsProps['friends'];
}

const SearchFriends: React.FC<SearchFriendsProps> = ({ onSubmit, onInputChange, friends }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  const handleInputChange = (value: number | undefined) => {
    onInputChange(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        marginBottom="15px"
      >
        <Autocomplete
          className='autocomplete'
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "15px",
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: "1px solid #6A5138"
            }
          }}
          disablePortal
          id="autocomplete-friends"
          options={friends}
          getOptionLabel={(friend) => friend.username}
          onChange={(e, value) => handleInputChange(value?.id)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => <TextField {...params} label="Chercher un ami" />}
        />
        <SubmitButton text="Chercher"></SubmitButton>
      </Stack>
    </form>
  );
}

export default SearchFriends;
