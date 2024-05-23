import { useContext, useEffect, useState } from "react";
import { FriendsListTemplate } from "../templates/FriendsListTemplate";
import { AlertBox } from "../molecules/AlertBox";
import { RequestFriends, acceptFriends, removeFriends, selectListFriends, selectPendingFriends, selectPublicFriends } from "../../services/FriendServices";
import { AppContext, useUserContext } from "../hooks/AppContext";
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

    /* Listes de users */
    useEffect(() => {
        const fetchPublicFriends = async () => {
          const data = await selectPublicFriends(user?.user?.id || 0);
          if (data.success) {
            setDataUsers(data.dataUser);
          }
        };
        const fetchPendingFriends = async () => {
          const data = await selectPendingFriends(user?.user?.id || 0);
          if (data.success){
            setDataPendingFriends(data.dataUser);
          }
        };
        const fetchFriends = async () => {
          const data = await selectListFriends(user?.user?.id || 0);
          if (data.success) {
            setDataFriends(data.dataUser);
          }
        };        
    
        fetchPublicFriends();
        fetchPendingFriends();
        fetchFriends();
      }, [user?.user?.id]);

      
    const handleSubmit = async () => {
        console.log("ADD");
        if(user?.user?.id !== undefined && search != 0){
          console.log(user?.user?.id,search);
          const data = await RequestFriends(user?.user?.id,search); // Fonction de connexion
          console.log(data);
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
              window.location.reload();
        }
      }
    };

    const handleInputChange = (value: number | undefined) => {
        if (value == undefined) {
          setSearch(0);
        } else {
          setSearch(value);
        }
    };

    const handleDeleteFriend = async (id: number) =>  {
        console.log("DELETE");
        console.log(id);
        if(user?.user?.id !== undefined){
          console.log(user?.user?.id,id);
          const data = await removeFriends(user?.user?.id,id); // Fonction de connexion
          console.log(data);
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
              window.location.reload();
        }
      }
    };

    const handleRefuseFriend  = async (id: number) => {
        console.log("REFUSE");
        console.log(id);
        if(user?.user?.id !== undefined){
          const data = await removeFriends(user?.user?.id,id); // Fonction de connexion
          console.log(data);
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
              window.location.reload();
        }
      }
    };

    const handleAcceptFriend = async (id: number) =>  {
        console.log("ACCEPT");
        console.log(id);
        if(user?.user?.id !== undefined){
          const data = await acceptFriends(user?.user?.id,id); // Fonction de connexion
          console.log(data);
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
              window.location.reload();
        }
      } 
    }

    return (
       <>
            <AlertBox severity={alertBox.severity} open={alertBox.open} message={alertBox.message} handleClose={handleAlert}></AlertBox>
            <FriendsListTemplate  
                onInputChange={handleInputChange} 
                onSubmit={handleSubmit} 
                deleteFriend={handleDeleteFriend}
                acceptFriend={handleAcceptFriend}
                refuseFriend={handleRefuseFriend}
                dataFriends={dataFriends} dataPendingFriends={dataPendingFriends} dataUsers={dataUsers}
            />
       </>
    );
}
