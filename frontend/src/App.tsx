import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GetStarted from './pages/GetStarted';
import SelectionContainer from './pages/SelectionContainer';
import KeySelection from './pages/KeySelection'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/selection-container" element={<SelectionContainer />} />
        <Route path="/key-selection" element={<KeySelection />} />
      </Routes>
    </Router>
  );
}

export default App;
