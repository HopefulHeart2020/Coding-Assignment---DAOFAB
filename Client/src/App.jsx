import './App.css';

// Importing Pages

import { Routes, Route } from 'react-router-dom'
import { Home } from './Pages';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />

      </Routes>
    </div>

  );
}

export default App;
