import TextField from "@mui/material/TextField/TextField";
import React, { useState } from "react";
import "../../assets/css/InputForm.css"
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputFormProps } from "../types/InputFormProps";


export const InputForm = ({name, value, setSearch, label, required, type, min, max, onInputChange }: InputFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onInputChange) {
            onInputChange(event.target.name, event.target.value);
        }
    };

    return (
        <div>
            {type==="password" ? (
                <TextField
                label={required ? `${label}*` : label}
                className="input-form" 
                type={type}
                variant="outlined"
                value={value}
                name={name}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleTogglePasswordVisibility}
                                onMouseDown={(e) => e.preventDefault()}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                onChange={handleChange}
            />
            ) : (
                <>
                    <TextField 
                    
                        className="input-form" 
                        label={required ? `${label}*` : label} 
                        type={type}
                        variant="outlined" 
                        inputProps={{ min, max }} // Ajout de min et max ici
                        onChange={handleChange}
                        value={value}
                        name={name}
                        // onChange={setSearch ? ((e) => setSearch(e.target.value)) : ()}
                    />

                </>
            )}
        </div>
    );
};
