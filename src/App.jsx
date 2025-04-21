import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Disclaimer from './components/Disclaimer';
import NotFound404 from "./pages/404";
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';
import Cookies from 'universal-cookie';
import './assets/css/blue-theme.css';
import './assets/css/App.css';

const cookies = new Cookies();

const disclaimerAccepted = () => {
  if (cookies.get("disclaimerAccepted")) {
    return <SearchPage />
  } else {
    return <Disclaimer />
  }
}

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={ <SearchPage /> } />
        <Route path="/" element={ disclaimerAccepted() } />
        <Route path="/settings" element={ <SettingsPage /> } />
        <Route path="/disclaimer" element={ <Disclaimer /> } />
        <Route path="/404" element={ <NotFound404/>} />
        <Route path="/index.html" element={disclaimerAccepted()} />
        <Route path="*" element={<Navigate replace to="/search" />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;