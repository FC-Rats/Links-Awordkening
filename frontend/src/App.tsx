import React from 'react';
import './App.css';
import { ContainerInfoGame } from './components/organisms/ContainerInfoGame';
import { ComponentEndGame } from './components/molecules/ComponentEndGame';
import AcceptRefuseFriendRequest from './components/molecules/AcceptRefuseFriendRequest';
import SearchFriends from './components/molecules/SearchFriends';
import { ContainerInfoPlayer } from './components/organisms/ContainerInfoPlayer';


function App() {
  return (
    <div className="App">
<div style={{ display: 'flex', flexDirection: 'row' }}>
      <ContainerInfoPlayer/>
      <ContainerInfoGame />
      </div>
{/*       <ComponentEndGame/>
      <AcceptRefuseFriendRequest isAcceptingButton={true} friend={{"id": 3, "username": "Lolo"}}/>
      <SearchFriends /> */}
    </div>
  );
}

export default App;
