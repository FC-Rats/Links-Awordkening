import React from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { SignInForm } from "../organisms/SignInForm";

interface SignInProps {
    onSubmit: () => void;
    onInputChange: (name: string, value: string) => void;
}

export const SignInTemplate : React.FC<SignInProps> = ({ onSubmit, onInputChange }) => {

    return (
       <>
       <CenteredTitle text="Se connecter"/>
       <SignInForm onSubmit={onSubmit} onInputChange={onInputChange}/>
       </>
    );
};
