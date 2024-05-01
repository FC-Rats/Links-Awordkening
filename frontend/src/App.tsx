import React from 'react';
import './App.css';
import { ContainerInfoGame } from './components/organisms/ContainerInfoGame';
import { ComponentEndGame } from './components/molecules/ComponentEndGame';
import AcceptRefuseFriendRequest from './components/molecules/AcceptRefuseFriendRequest';
import SearchFriends from './components/molecules/SearchFriends';
import { ContainerInfoPlayer } from './components/organisms/ContainerInfoPlayer';
import { ComponentListWords } from './components/molecules/ComponentListWords';
import StateFriendRequest from './components/molecules/StateFriendRequest';
import Stack from '@mui/material/Stack';


function App() {
  return (
    <div className="App">
      {/*       <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ContainerInfoPlayer />
        <ContainerInfoGame />
      </div>
      <ComponentListWords />
      <ComponentEndGame /> */}
      <AcceptRefuseFriendRequest isAcceptingButton={true} friend={{ "id": 3, "username": "Lolo" }} />
      <SearchFriends />
      <Stack spacing={2}>
        <StateFriendRequest friend={{ "id": 3, "username": "Lolo" }} />
        <StateFriendRequest friend={{ "id": 4, "username": "Lna" }} />
        <StateFriendRequest friend={{ "id": 5, "username": "Léo" }} />
        <StateFriendRequest friend={{ "id": 10, "username": "Keke" }} />
      </Stack>
    </div>
  );
}

export default App;
