import React, { useState } from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { ForgotpasswordForm } from "../organisms/ForgotPasswordForm";

interface FormProps {
    onSubmit: () => void;
    onInputChange: (name: string, value: string) => void;
}

export const ForgotPasswordTemplate : React.FC<FormProps> = ({ onSubmit, onInputChange }) => {

    return (
       <>
       <CenteredTitle text="Mot de passe oublié"/>
       <ForgotpasswordForm onInputChange={onInputChange} onSubmit={onSubmit}/>
       </>
    );
};
