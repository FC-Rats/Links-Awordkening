import { BrowserRouter as Router, Route, useLocation, useParams } from 'react-router-dom';
import { ChangePasswordTemplate } from "../templates/ChangePasswordTemplate";
import { useEffect } from 'react';

export const ChangePasswordPage = () => {

    const url = new URLSearchParams(useLocation().search);
    console.log(url.get('token'));
   

    return (
       <>
            <ChangePasswordTemplate />
       </>
    );
};
