import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { InputForm } from './InputForm';
import '../../assets/css/AcceptRefuseFriendRequest.css';

function SubmitWord({ onSubmitWord, disabled,coupsRestants }: { onSubmitWord: (word: string) => void, disabled: boolean, coupsRestants:number}) {
    const [word, setWord] = useState("");

    const handleInputChange = (name: string, value: string) => {
        setWord(value);
    };

    const handleSendWord = () => {
        if (word !== "") {
            onSubmitWord(word); // Appeler la fonction de mise à jour avec le nouveau mot
            setWord(""); // Réinitialiser le champ du mot
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handleSendWord();
        }
    };

    return (
        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" flexWrap="wrap" justifyContent="center" alignItems="center">
            <InputForm name="submitWord" value={word} label="Mot" onInputChange={handleInputChange} onKeyDown={handleKeyPress} required />
            <Button
                onClick={handleSendWord}
                className="acceptRefuseFriendRequest acceptRefuseFriendRequest-accept"
                variant="contained"
                disabled={disabled || (coupsRestants <= 0)}
            >
                Envoyer
            </Button>
        </Stack>
    );
}

export default SubmitWord;
