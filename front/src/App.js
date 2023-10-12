import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Parent from './Pages/Parent';
import Child from './Pages/Child';

function App() {
  return (
    <div>
      <div className='title'>
        <a href='http://localhost:3000'>
        Transaction Display

        </a>
      </div>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Parent />} />
            <Route path='/detail/:id' element={<Child />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>

  );
}

export default App;
