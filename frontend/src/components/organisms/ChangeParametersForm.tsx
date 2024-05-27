import { useState } from "react";
import { InputForm } from "../molecules/InputForm";
import { SubmitButton } from "../molecules/SubmitButton";
import "../../assets/css/Form.css"
import Stack from "@mui/material/Stack/Stack";


export const ChangeParametersForm = () => {
    const [formData, setFormData] = useState({
        parametre1: '',
        parametre2: '',
    });

    const handleInputChange = (name: string, value: any) => {
        setFormData({ ...formData, [name]: value });
    };
    

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };

    return (
        <Stack spacing={5} direction="column" flexWrap="wrap" justifyContent="center" alignItems="center">
        <form className="form" method="post" onSubmit={handleSubmit}>
            <InputForm name="parametre1" label={"parametre1"} onInputChange={handleInputChange}/>
            <InputForm name="parametre2" label={"parametre2"} onInputChange={handleInputChange}/>
            <SubmitButton text={"Enregistrer"}/>
        </form>
        </Stack>
    );
};
