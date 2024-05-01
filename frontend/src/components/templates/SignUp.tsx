import React, { useState } from "react";
import { CenteredTitle } from "../molecules/CenteredTitle";
import { SignUpForm } from "../organisms/SignUpForm";


export const SignUp = () => {


    return (
       <>
       <CenteredTitle text="S'inscrire"/>
       <SignUpForm/>
       </>
    );
};
