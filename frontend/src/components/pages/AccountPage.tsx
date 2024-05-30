import { AccountOverviewTemplate } from "../templates/AccountOverviewTemplate";
import { AccountStatProps } from "../types/AccountStatProps";
import { useEffect, useState } from "react";
import { getStats } from "../../services/UserServices";
import { Button, Stack } from "@mui/material";
import { useUserContext } from "../hooks/AppContext";
import { AccountParametersTemplate } from "../templates/AccountParametersTemplate";
import { UserInfo } from "../types/UserInfo";
import { accountUpdate } from "../../services/PermissionsServices";
import { PlayerInfo } from "../types/PlayerInfo";

const createAccountStatProps = (response: any[]): AccountStatProps => {
    const statGameCount = response.length;

    if (statGameCount === 0) {
        return {
            statGameCount,
            statBestScore: 0,
            statAverageScore: 0,
            statTotalScore: 0,
            words: [],
            table: [],
        };
    }

    const scores = response.map(item => item.score);
    const statBestScore = Math.max(...scores);
    const statTotalScore = scores.reduce((acc, score) => acc + score, 0);
    const statAverageScore = parseFloat((statTotalScore / statGameCount).toFixed(2));

    const wordOccurrences: { [key: string]: number } = {};
    response.forEach(item => {
        if (item.words) {
            const words = item.words.split(',').map((word: string) => word.trim());
            words.forEach((word: string) => {
                if (wordOccurrences[word]) {
                    wordOccurrences[word]++;
                } else {
                    wordOccurrences[word] = 1;
                }
            });
        }
    });

    const sortedWords = Object.entries(wordOccurrences)
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0]);

    const words = sortedWords.slice(0, 5);

    return {
        statGameCount,
        statBestScore,
        statAverageScore,
        statTotalScore,
        words,
        table: response,
    };
};

export const AccountPage = (props: {friendAccountId?: number}) => {
    const { user } = useUserContext();
    const [template, setTemplate] = useState<"overview" | "param">("overview");
    const [title, setTitle] = useState<"Voir mon profil" | "Voir mes stats">("Voir mon profil");

    const [data, setData] = useState<AccountStatProps | null>(null);
    const [status, setStatus] = useState<number | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const param = props.friendAccountId ? {idUser: props.friendAccountId} : { idUser: user?.id };
        const fetchDataStats = async () => {
            try {
                const response = await getStats(param);
                if (Array.isArray(response)) {
                    const responseModified = createAccountStatProps(response);
                    setData(responseModified);
                } else if (typeof response === 'number') {
                    setStatus(response);
                } else {
                    setError(new Error('Unknown response format'));
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des scores : ', error);
            }
        };

        if (template==="overview") {fetchDataStats();}
    }, [template]);

    const handleChangingTemplatePage = () => {
        if (template === "overview") {
            setTemplate("param");
            setTitle("Voir mes stats");
        } else {
            setTemplate("overview");
            setTitle("Voir mon profil");
        }
    };

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
        const data = await accountUpdate(formData, user || initialFormData); // Fonction de connexion
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
            {status !== null ? (
                <p>Statut de la réponse : {status}</p>
            ) : (error !== null) ? (
                <p>Erreur lors de la récupération des données : {error.toString()}</p>
            ) : (data === null) ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Stack direction="row" justifyContent="flex-end" alignItems="center">
                        {!props.friendAccountId && (
                        <Button variant="contained" className="button" size="large" onClick={() => handleChangingTemplatePage()}>{title}</Button>
                        )}
                    </Stack>
                    {template === "overview" && <AccountOverviewTemplate data={data} />}
                    {template === "param" && <AccountParametersTemplate
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
                    />}
                </>
            )}
        </>
    );
};