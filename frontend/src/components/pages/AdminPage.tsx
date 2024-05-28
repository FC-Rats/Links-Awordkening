import { useEffect, useState } from "react";
import AdminTemplate from "../templates/AdminTemplate";
import { UserInfo } from '../types/UserInfo';
import { getUsers } from "../../services/UserServices";
import { AlertBox } from "../molecules/AlertBox";

export const AdminPage = () => {
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [status, setStatus] = useState<number | null>(null);
    const [error, setError] = useState<Error | null>(null);

      /* SNACK BAR - ALERT HANDLING */
    const [alertBox, setAlertBox] = useState({
        severity: "success",
        open: false,
        message: "",
    });

    /**
     * @description Permet de fermer automatique l'Alertbox au bout de 4 secondes
     */
    const handleAlert = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
        return;
        }
        setAlertBox((prevState) => ({
        ...prevState,
        open: false,
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUsers();
                if (Array.isArray(response)) {
                    const responseModified = response.map(user => {
                        return {
                          ...user,
                          name: user.username, 
                          username: undefined,
                          verified: (user.verified === 1) ? true : false, 
                          admin: (user.admin === 1) ? true : false, 
                        };
                      });
                    setUsers(responseModified);
                } else if (typeof response === 'number') {
                    setStatus(response);
                } else {
                    setError(new Error('Unknown response format'));
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des users : ', error);
            }
        };

        fetchData();
    }, []);
    
    return (
        <>
            <AlertBox severity={alertBox.severity} open={alertBox.open} message={alertBox.message} handleClose={handleAlert}></AlertBox>
            {status !== null ? (
                <p>Statut de la réponse : {status}</p>
            ) : (error !== null) ? (
                <p>Erreur lors de la récupération des users : {error.toString()}</p>
            ) : (
                <AdminTemplate setUsers={setUsers} users={users} />
            )}
        </>
    )
}