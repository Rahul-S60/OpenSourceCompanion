// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function App() {
  return (
    <Router>
      <div className="container">
        <header className="my-4">
          <h1>OpenSource Companion</h1>
          <p>Frontend alive! Ready to build.</p>
        </header>
      </div>
    </Router>
  );
}

export default App;