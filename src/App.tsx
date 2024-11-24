import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import Content from './layout/Content';
import Footer from './layout/Footer';

function App() {
  return (
    <div className="App">
      <Content></Content>
      <Footer></Footer>
    </div>
  );
}

export default App;
