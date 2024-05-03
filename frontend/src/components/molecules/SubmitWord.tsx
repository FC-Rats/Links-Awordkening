import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { InputForm } from './InputForm';
import { useState } from 'react'
import '../../assets/css/AcceptRefuseFriendRequest.css';

function SubmitWord() {
    const [word, setWord] = useState("");

    const handleInputChange = (name: string, value: any) => {
        setWord(value);
    };

    return (
        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" flexWrap="wrap" justifyContent="center" alignItems="center">
            <InputForm name="submitWord" value={word} label={"Mot"} onInputChange={handleInputChange} />
            <Button onClick={(e) => console.log(word)} className="acceptRefuseFriendRequest acceptRefuseFriendRequest-accept" variant="contained">Envoyer</Button>
        </Stack>
    )
}

export default SubmitWord