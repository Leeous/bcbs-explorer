import Navigation from './components/Navigation';
import Settings from './components/Settings';
import Search from './components/Search';
import { Routes, Router } from 'react-router';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='search' element={ <Search /> } />
        <Route exact path='settings' element={ <Settings /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;