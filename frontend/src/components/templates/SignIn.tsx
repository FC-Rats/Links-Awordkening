import React, { useState } from "react";
import { CenteredTitle } from "../molecules/CenteredTitle";
import { SignInForm } from "../organisms/SignInForm";


export const SignIn = () => {


    return (
       <>
       <CenteredTitle text="Se connecter"/>
       <SignInForm/>
       </>
    );
};
