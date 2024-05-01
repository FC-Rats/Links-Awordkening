import TextField from "@mui/material/TextField/TextField";
import React, { useState } from "react";
import "../../assets/css/InputForm.css"
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface InputFormProps {
    name: string;
    value?: string;
    setSearch?: (value: string) => void;
    label: string;
    required?: boolean;
    type?:string;
    min?: number;
    max?: number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Ajoutez cette ligne

}

export const InputForm = ({name, value, setSearch, label, required, type, min, max, onChange }: InputFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div>
            {type==="password" ? (
                <TextField
                label={required ? `${label}*` : label}
                className="input-form" 
                type={type}
                variant="outlined"
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
                onChange={onChange}
            />
            ) : (
                <>
                    <TextField 
                        className="input-form" 
                        label={required ? `${label}*` : label} 
                        type={type}
                        variant="outlined" 
                        inputProps={{ min, max }} // Ajout de min et max ici
                        onChange={onChange}
                        // onChange={setSearch ? ((e) => setSearch(e.target.value)) : ()}
                    />

                </>
            )}
        </div>
    );
};
