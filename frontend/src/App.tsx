import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Error404Template } from './components/templates/Error404Template';

function App() {
  return (
    <Error404Template url={"fzoei"}/>
  );
}

export default App;
