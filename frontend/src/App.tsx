import React from 'react';
import './App.css';
import { ContainerInfoGame } from './components/organisms/ContainerInfoGame';
import { ComponentEndGame } from './components/molecules/ComponentEndGame';
import AcceptRefuseFriendRequest from './components/molecules/AcceptRefuseFriendRequest';
import SearchFriends from './components/molecules/SearchFriends';


function App() {
  return (
    <div className="App">
      <ContainerInfoGame />
      <ComponentEndGame/>
      <AcceptRefuseFriendRequest isAcceptingButton={true} friend={{"id": 3, "username": "Lolo"}}/>
      <SearchFriends />
    </div>
  );
}

export default App;
