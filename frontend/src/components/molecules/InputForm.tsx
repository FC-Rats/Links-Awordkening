import React from "react";

interface InputFormProps {
    isAPasswordInput?: boolean; // Prop facultative avec ? avant le :
    value?: string;
    setSearch: (value: string) => void;
}

export const InputForm = ({ isAPasswordInput, value, setSearch }: InputFormProps) => {
    return (
        <div>
            
            {/* Utilisation de la prop isAPasswordInput pour déterminer le type de l'input */}
            {/*TODO: style, image, font */}
            {isAPasswordInput ? (
                <input type="password"/>
            ) : (
                <input type="text" value={value ? value : ""} onChange={(e) => setSearch(e.target.value)}/>
            )}
        </div>
    );
};
