import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
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
  const [selectedFriend, setSelectedFriend] = useState<{ id: number; username: string } | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
    setSelectedFriend(null); 
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
          clearOnEscape={true}
          className='autocomplete'
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "15px",
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: "1px solid #6A5138",
            },
          }}
          disablePortal
          id="autocomplete-friends"
          options={friends}
          getOptionLabel={(friend) => friend.username}
          value={selectedFriend}
          onChange={(e, value) => {
            setSelectedFriend(value);
            handleInputChange(value?.id);
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => <TextField {...params} label="Chercher un ami" />}
        />
        <SubmitButton text="Ajouter" />
      </Stack>
    </form>
  );
}

export default SearchFriends;
