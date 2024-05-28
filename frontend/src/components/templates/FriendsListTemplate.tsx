import React from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import SearchFriends from "../molecules/SearchFriends";
import ContainerFriendRequests from "../organisms/ContainerFriendRequests";
import ContainerFriend from "../organisms/ContainerFriend";
import "../../assets/css/FriendsLists.css";
import { Stack } from "@mui/material";
import { ContainerFriendRequestsProps } from "../types/ContainerFriendRequestsProps";


interface FriendsPagesProps {
    onSubmit: () => void;
    onInputChange: (value: number | undefined) => void;
    deleteFriend : (id :number) => void;
    acceptFriend : (id :number) => void;
    refuseFriend : (id :number) => void;
    dataUsers : ContainerFriendRequestsProps['friends'],
    dataPendingFriends : ContainerFriendRequestsProps['friends'],
    dataFriends : ContainerFriendRequestsProps['friends'],
}

export const FriendsListTemplate : React.FC<FriendsPagesProps> = ({ onInputChange, onSubmit, deleteFriend, acceptFriend, refuseFriend, dataFriends, dataPendingFriends, dataUsers }) =>  {
    return (
       <>
        <CenteredTitle text="Liste d'amis"/>
        <Stack className="searchbar">
            <SearchFriends friends={dataUsers} onInputChange={onInputChange} onSubmit={onSubmit}/>
        </Stack>
        <div className="waiting-friends">
            <ContainerFriendRequests friends={dataPendingFriends} acceptFriend={acceptFriend} refuseFriend={refuseFriend}/>
        </div>
        <div className="list-friends">
            <ContainerFriend friends={dataFriends} deleteFriend={deleteFriend}/>
        </div>
       </>
    );
};
