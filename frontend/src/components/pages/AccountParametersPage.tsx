import React, { useState, useEffect } from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import { useUserContext } from "../hooks/AppContext";
import { AccountParametersTemplate } from "../templates/AccountParametersTemplate";
import { UserInfo } from "../types/UserInfo";
import { accountUpdate } from "../../services/PermissionsServices";

export const AccountParametersPage: React.FC = () => {
    const { user } = useUserContext();
    const { updateUser } = useUserContext(); 
    const [editMode, setEditMode] = useState(false);
    const initialFormData: UserInfo = {
        id: 0,
        email: '',
        name: '',
        profilPicture: '',
        tokenR: '',
        visibility: 'PUBLIC',
        verified: false,
        admin: false,
        birthYear: ''
    };
    const [formData, setFormData] = useState<UserInfo>(user || initialFormData);
    const [selectedImage, setSelectedImage] = useState<string>(user?.profilPicture || '');

    /* SNACK BAR - ALERT HANDLING */
    const [alertBox, setAlertBox] = useState({
        severity: "success",
        open: false,
        message: '',
    });

    useEffect(() => {
        if (user) {
            setFormData(user);
            setSelectedImage(user.profilPicture);
        }
    }, [user]);

    /**
     * @description Permet de fermer automatique l'Alertbox au bout de 4 secondes
     */
    const handleAlert = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertBox(prevState => ({
            ...prevState,
            open: false,
        }));
    };

    const handleInputChange = (name: string, value: string | boolean) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Form submitted:', formData);
        const data = await accountUpdate(formData,user || initialFormData ); // Fonction de connexion
        console.log(data);
        if (!data.success) {
            setAlertBox(prevState => ({
                ...prevState,
                severity: 'error',
                open: true,
                message: data.message
            }));
        } else {
            setAlertBox(prevState => ({
                ...prevState,
                severity: 'success',
                open: true,
                message: data.message
            }));
            updateUser(data.dataUser);
        }
        setEditMode(false);
    };

    const handleCancel = () => {
        setEditMode(false);
    };

    const handleEdit = () => {
        setEditMode(true);
    };


    if (!user) {
        return <div>Loading...</div>; // ou un autre composant de chargement/erreur
    }

    return (
        <>
            <CenteredTitle text={"Votre compte"} />
            <AccountParametersTemplate
                user={user}
                editMode={editMode}
                formData={formData}
                selectedImage={selectedImage}
                alertBox={alertBox}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                handleAlert={handleAlert}
                setSelectedImage={setSelectedImage}
                handleEdit={handleEdit}
            />
        </>
    );
};
