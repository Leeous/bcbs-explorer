import Settings from './components/Settings';
import Search from './components/Search';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Cookies from 'universal-cookie';
import Disclaimer from './components/Disclaimer';
import NotFound404 from "./pages/404";
import SearchPage from './pages/SearchPage';

const cookies = new Cookies();

function App() {
  return(
    <BrowserRouter>
    {cookies.get("disclaimerAccepted") ? <Navigate replace to="/404" /> : null }
      <Routes>
        <Route path="/" element={ <SearchPage /> } />
        <Route path="/settings" element={ <Settings /> } />
        <Route path="/disclaimer" element={ <Disclaimer /> } />
        <Route path="/404" element={ <NotFound404/>} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;