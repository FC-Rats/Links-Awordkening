import React from "react";

interface InputFormProps {
    isAPasswordInput?: boolean; // Prop facultative avec ? avant le :
}

export const InputForm = ({ isAPasswordInput }: InputFormProps) => {
    return (
        <div>
            
            {/* Utilisation de la prop isAPasswordInput pour déterminer le type de l'input */}
            {/*TODO: style, image, font */}
            {isAPasswordInput ? (
                <input type="password" />
            ) : (
                <input type="text"/>
            )}
        </div>
    );
};
