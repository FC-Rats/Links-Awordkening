import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { InputForm } from './InputForm';
import { useState } from 'react'

function SearchFriends() {
  const [search, setSearch] = useState('');
  useEffect(() => {
    console.log(search)
  }, [search])

  return (
    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" flexWrap="wrap" justifyContent="center" alignItems="center">
      <InputForm value={search} setSearch={setSearch} isAPasswordInput={false} label='SearchFriend' />
      <Button variant="contained">Contained</Button>       {/* to replace with a component */}
    </Stack>
  )
}

export default SearchFriends