import React, { useState } from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { ChangeParametersForm } from "../organisms/ChangeParametersForm";


export const ChangeParametersTemplate = () => {


    return (
       <>
       <CenteredTitle text="Paramètres du site"/>
       <ChangeParametersForm/>
       </>
    );
};
