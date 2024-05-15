import { useState } from "react";
import { accountConnection } from "../../services/PermissionsServices";
import { SignInTemplate } from "../templates/SignInTemplate";

export const SignInPage : React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleSubmit = async () => {
        console.log(formData);
        const data = await accountConnection(formData);
    };

    const handleInputChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    return (
       <>
            <SignInTemplate onSubmit={handleSubmit} onInputChange={handleInputChange} />
       </>
    );
};
