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


function App() {
  return (
    <div className="App">
      <SignUp/>
    </div>
  );
}

export default App;
