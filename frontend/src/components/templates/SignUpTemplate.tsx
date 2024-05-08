import React, { useState } from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { SignUpForm } from "../organisms/SignUpForm";


export const SignUpTemplate = () => {


    return (
       <>
       <CenteredTitle text="S'inscrire"/>
       <SignUpForm/>
       </>
    );
};
