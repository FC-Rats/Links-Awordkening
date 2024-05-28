import { useContext, useEffect, useState } from "react";
import { FriendsListTemplate } from "../templates/FriendsListTemplate";
import { AlertBox } from "../molecules/AlertBox";
import { RequestFriends, acceptFriends, removeFriends, selectListFriends, selectPendingFriends, selectPublicFriends } from "../../services/FriendServices";
import { AppContext } from "../hooks/AppContext";
import { ContainerFriendRequestsProps } from "../types/ContainerFriendRequestsProps";

export const FriendsListPage = () => {
    /* SNACK BAR - ALERT HANDLING */
    const user = useContext(AppContext);
    const [dataFriends, setDataFriends] = useState<ContainerFriendRequestsProps['friends']>([]);
    const [dataPendingFriends, setDataPendingFriends] = useState<ContainerFriendRequestsProps['friends']>([]);
    const [dataUsers, setDataUsers] = useState<ContainerFriendRequestsProps['friends']>([]);
    const [alertBox, setAlertBox] = useState({
        severity: '',
        open: false,
        message: ''
    });
    const [search, setSearch] = useState(0);

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

    const fetchPublicFriends = async () => {
      const data = await selectPublicFriends(user?.user?.id || 0);
        setDataUsers(data.dataUser);
    };

    const fetchPendingFriends = async () => {
      const data = await selectPendingFriends(user?.user?.id || 0);
        setDataPendingFriends(data.dataUser);
    };

    const fetchFriends = async () => {
      const data = await selectListFriends(user?.user?.id || 0);
        setDataFriends(data.dataUser);
    };     

    /* Listes de users */
    useEffect(() => {
        fetchPublicFriends();
        fetchPendingFriends();
        fetchFriends();
    }, []);

    const refreshData = async () => {
        await fetchPublicFriends();
        await fetchPendingFriends();
        await fetchFriends();
    };

    const handleSubmit = async () => {
        if(user?.user?.id !== undefined && search !== 0){
            const data = await RequestFriends(user?.user?.id, search); // Fonction de connexion
            if (!data.success) {
                setAlertBox(prevState => ({
                    ...prevState,
                    severity : 'error',
                    open: true,
                    message : data.message
                }));      
            } else {
                setAlertBox(prevState => ({
                    ...prevState,
                    severity : 'success',
                    open: true,
                    message : data.message
                }));
                await refreshData();
            }
        }
    };

    const handleInputChange = (value: number | undefined) => {
        if (value === undefined) {
            setSearch(0);
        } else {
            setSearch(value);
        }
    };

    const handleDeleteFriend = async (id: number) =>  {
        if(user?.user?.id !== undefined){
            const data = await removeFriends(user?.user?.id,id); // Fonction de connexion
            if (!data.success) {
                setAlertBox(prevState => ({
                    ...prevState,
                    severity : 'error',
                    open: true,
                    message : data.message
                }));      
            } else {
                setAlertBox(prevState => ({
                    ...prevState,
                    severity : 'success',
                    open: true,
                    message : data.message
                }));
                await refreshData();
            }
        }
    };

    const handleRefuseFriend  = async (id: number) => {
        if(user?.user?.id !== undefined){
            const data = await removeFriends(user?.user?.id,id); // Fonction de connexion
            if (!data.success) {
                setAlertBox(prevState => ({
                    ...prevState,
                    severity : 'error',
                    open: true,
                    message : data.message
                }));      
            } else {
                setAlertBox(prevState => ({
                    ...prevState,
                    severity : 'success',
                    open: true,
                    message : data.message
                }));
                await refreshData();
            }
        }
    };

    const handleAcceptFriend = async (id: number) =>  {
        if(user?.user?.id !== undefined){
            const data = await acceptFriends(user?.user?.id,id); // Fonction de connexion
            if (!data.success) {
                setAlertBox(prevState => ({
                    ...prevState,
                    severity : 'error',
                    open: true,
                    message : data.message
                }));      
            } else {
                setAlertBox(prevState => ({
                    ...prevState,
                    severity : 'success',
                    open: true,
                    message : data.message
                }));
                await refreshData();
            }
        } 
    };

    return (
        <>
            <AlertBox severity={alertBox.severity} open={alertBox.open} message={alertBox.message} handleClose={handleAlert}></AlertBox>
            <FriendsListTemplate  
                onInputChange={handleInputChange} 
                onSubmit={handleSubmit} 
                deleteFriend={handleDeleteFriend}
                acceptFriend={handleAcceptFriend}
                refuseFriend={handleRefuseFriend}
                dataFriends={dataFriends} 
                dataPendingFriends={dataPendingFriends} 
                dataUsers={dataUsers}
            />
        </>
    );
};
