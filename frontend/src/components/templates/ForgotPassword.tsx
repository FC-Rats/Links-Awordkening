import React, { useState } from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { ForgotpasswordForm } from "../organisms/ForgotPasswordForm";


export const ForgotPassword = () => {


    return (
       <>
       <CenteredTitle text="Mot de passe oublié"/>
       <ForgotpasswordForm/>
       </>
    );
};
