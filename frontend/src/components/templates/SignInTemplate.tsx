import React, { useState } from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { SignInForm } from "../organisms/SignInForm";


export const SignInTemplate = () => {


    return (
       <>
       <CenteredTitle text="Se connecter"/>
       <SignInForm/>
       </>
    );
};
