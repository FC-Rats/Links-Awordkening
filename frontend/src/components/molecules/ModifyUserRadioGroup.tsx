import React from 'react';
import { FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { ModifyUserRadioGroupProps } from '../types/ModifyUserRadioGroupProps';
import '../../assets/css/ModifyUserRadioGroup.css';

const ModifyUserRadioGroup = ({ title, name, value, onInputChange }: ModifyUserRadioGroupProps) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onInputChange) {
            onInputChange(event.target.name, event.target.value);
        }
    };


    return (
        <FormControl>
            <FormLabel className='white-ModifyUserRadioGroup'>{title}</FormLabel>
            <RadioGroup
                sx={{ display: 'flex', flexDirection: 'row' }}
                aria-labelledby="admin-radio-buttons-group"
                name={name}
                value={value}
                className='white-ModifyUserRadioGroup'
                onChange={handleChange}
            >
                <FormControlLabel className='active-ModifyUserRadioGroup' value="true" control={<Radio />} label="Oui" />
                <FormControlLabel className='active-ModifyUserRadioGroup' value="false" control={<Radio />} label="Non" />
            </RadioGroup>
        </FormControl>
    );
};

export default ModifyUserRadioGroup;
