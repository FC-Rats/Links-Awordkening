import React, { useState } from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { SignInForm } from "../organisms/SignInForm";
import FormJoinRoom from "../organisms/FormJoinRoom";
import { CenteredLogo } from "../atoms/CenteredLogo";


export const JoinRoom = () => {


    return (
       <>
       <CenteredLogo></CenteredLogo>
       <CenteredTitle text="Rejoindre une partie"/>
       <FormJoinRoom/>
       </>
    );
};
