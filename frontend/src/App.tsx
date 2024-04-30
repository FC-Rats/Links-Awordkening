import React from 'react';
import './App.css';
import { ContainerInfoGame } from './components/organisms/ContainerInfoGame';
import { ComponentEndGame } from './components/molecules/ComponentEndGame';

function App() {
  return (
    <div className="App">
      <ContainerInfoGame />
      <ComponentEndGame/>
    </div>
  );
}

export default App;
