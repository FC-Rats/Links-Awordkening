import TextField from "@mui/material/TextField/TextField";
import React, { useState } from "react";
import "../../assets/css/InputForm.css"
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface InputFormProps {
    isAPasswordInput?: boolean; // Prop facultative avec ? avant le :
    value?: string;
    setSearch: (value: string) => void;
    label: string;
    required?: boolean;
}

export const InputForm = ({ isAPasswordInput, value, setSearch, label, required }: InputFormProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div>
            {/*TODO: style, image, font */}
            {isAPasswordInput ? (
                <TextField
                label={label}
                className="input-form" 
                type={showPassword ? "text" : "password"}
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
            />
            ) : (
                <>
                    <TextField 
                        className="input-form" 
                        label={required ? `${label}*` : label} 
                        type="text" 
                        variant="outlined" 
                        value={value ? value : ""} 
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </>
            )}
        </div>
    );
};
