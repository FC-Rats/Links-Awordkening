import React, { useState } from "react";
import { CenteredTitle } from "../atoms/CenteredTitle";
import SearchFriends from "../molecules/SearchFriends";
import ContainerFriendRequests from "../organisms/ContainerFriendRequests";
import ContainerFriend from "../organisms/ContainerFriend";
import "../../assets/css/FriendsLists.css";
import { Stack } from "@mui/material";


export const FriendsList = () => {
    return (
       <>
        <CenteredTitle text="Liste d'amis"/>
        <Stack className="searchbar">
            <SearchFriends/>
        </Stack>
        <div className="waiting-friends">
            <ContainerFriendRequests friends={[{ "id": 3, "username": "Lolo" }, { "id": 10, "username": "Keke" }]}/>
        </div>
        <div className="list-friends">
            <ContainerFriend friends={[{ "id": 3, "username": "Lolo" }, { "id": 4, "username": "Lna" }, { "id": 5, "username": "Léo" }, { "id": 10, "username": "Keke" }]}/>
        </div>
       </>
    );
};
