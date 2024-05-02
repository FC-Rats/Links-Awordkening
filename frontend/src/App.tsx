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
import GameType from './components/molecules/GameType';
import {CenteredTitle} from './components/molecules/CenteredTitle';
import {Link} from './components/molecules/Link';
import {SignIn} from './components/templates/SignIn';
import { SignUp } from './components/templates/SignUp';
import { CaseHomePage } from './components/molecules/CaseHomePage';
import { CaseHomePageContainer } from './components/organisms/CaseHomePageContainer';


function App() {
  return (
    <div className="App">
 <CenteredTitle text="Links Awordkening"/>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ContainerInfoPlayer />
        <ContainerInfoGame />
      </div>
      <ComponentListWords />
      <ComponentEndGame />
      <AcceptRefuseFriendRequest isAcceptingButton={true} friend={{ "id": 3, "username": "Lolo" }} />
      <SearchFriends />
      <Stack spacing={2}>
        <StateFriendRequest friend={{ "id": 3, "username": "Lolo" }} />
        <StateFriendRequest friend={{ "id": 4, "username": "Lna" }} />
        <StateFriendRequest friend={{ "id": 5, "username": "Léo" }} />
        <StateFriendRequest friend={{ "id": 10, "username": "Keke" }} />
      </Stack>
      <Stack spacing={2} direction="row" flexWrap="wrap" justifyContent="center" alignItems="center">
        < GameType type='solo' />
        < GameType type='multi' />
      </Stack>
      <SignIn/>
      <SignUp/>
      <CaseHomePageContainer/>
    </div>
  );
}

export default App;
