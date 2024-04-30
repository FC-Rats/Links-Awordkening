import React from 'react';
import './App.css';
import { ContainerInfoGame } from './components/organisms/ContainerInfoGame';
import { ComponentEndGame } from './components/molecules/ComponentEndGame';
import AcceptRefuseFriendRequest from './components/molecules/AcceptRefuseFriendRequest';


function App() {
  return (
    <div className="App">
      <ContainerInfoGame />
      <ComponentEndGame/>
      <AcceptRefuseFriendRequest isAcceptingButton={true} friend={{"id": 3, "username": "Lolo"}}/>
    </div>
  );
}

export default App;
