import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GetStarted from './pages/GetStarted';
import SelectionContainer from './pages/SelectionContainer';

function App() {
  console.log("APP")
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/selection-container" element={<SelectionContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
