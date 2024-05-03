import React, { useState } from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { SignInForm } from "../organisms/SignInForm";


export const SignIn = () => {


    return (
       <>
       <CenteredTitle text="Se connecter"/>
       <SignInForm/>
       </>
    );
};
