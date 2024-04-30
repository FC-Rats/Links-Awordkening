import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { InputForm } from './InputForm';
import { useState, useMemo } from 'react'

function SearchFriends() {
  const [search, setSearch] = useState('');
  useEffect(() => {
    console.log(search)
  }, [search])

  return (
    <Stack spacing={2} direction="row">
      <InputForm value={search} setSearch={setSearch} isAPasswordInput={false} />
      <Button variant="contained">Contained</Button>       {/* to replace with a component */}
    </Stack>
  )
}

export default SearchFriends