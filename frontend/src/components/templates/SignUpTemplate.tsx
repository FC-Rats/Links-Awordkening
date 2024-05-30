import React from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { SignUpForm } from "../organisms/SignUpForm";

interface FormProps {
    onSubmit: () => void;
    onInputChange: (name: string, value: string) => void;
    reset: boolean;
}

export const SignUpTemplate : React.FC<FormProps> = ({ onSubmit, onInputChange, reset }) =>  {
    return (
       <>
       <CenteredTitle text="S'inscrire"/>
       <SignUpForm onSubmit={onSubmit} onInputChange={onInputChange} reset={reset}/>
       </>
    );
};
