import React, { useState } from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { ChangePasswordForm } from "../organisms/ChangePasswordForm";


export const ChangePasswordTemplate = () => {


    return (
       <>
       <CenteredTitle text="Modification du mot de passe"/>
       <ChangePasswordForm/>
       </>
    );
};
