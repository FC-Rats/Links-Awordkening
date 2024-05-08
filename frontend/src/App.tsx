import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Error404 } from './components/templates/Error404';

function App() {
  return (
    <Error404 url={"fzoei"}/>
  );
}

export default App;
