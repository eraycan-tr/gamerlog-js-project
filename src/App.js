import React from 'react';
import Home from './Pages/Home';

function App() {
  return (
    <div>
      <nav className="navbar">
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900' }}>GamerLog</h1>
      </nav>
      <Home />
    </div>
  );
}

export default App;