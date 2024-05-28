import React from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { ChangePasswordForm } from "../organisms/ChangePasswordForm";

interface FormProps {
    onSubmit: () => void;
    onInputChange: (name: string, value: string) => void;
}

export const ChangePasswordTemplate : React.FC<FormProps> = ({ onSubmit, onInputChange }) => {

    return (
       <>
       <CenteredTitle text="Modification du mot de passe"/>
       <ChangePasswordForm onInputChange={onInputChange} onSubmit={onSubmit}/>
       </>
    );
};
