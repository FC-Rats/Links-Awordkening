import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { InputForm } from './InputForm';
import { useState } from 'react'
import '../../assets/css/AcceptRefuseFriendRequest.css';

function SearchFriends() {
  const [search, setSearch] = useState('');
  useEffect(() => {
    console.log(search)
  }, [search])

  const handleInputChange = (name: string, value: any) => {
    setSearch(value);
};

  return (
    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" flexWrap="wrap" justifyContent="center" alignItems="center">
      <InputForm name="searchFriend" value={search}  onInputChange={handleInputChange} label='Chercher des amis' />
      <Button onClick={(e) => console.log(e, search)} className="acceptRefuseFriendRequest acceptRefuseFriendRequest-accept" variant="contained">Chercher</Button>
    </Stack>
  )
}

export default SearchFriends