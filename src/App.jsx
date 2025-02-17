import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Disclaimer from './components/Disclaimer';
import NotFound404 from "./pages/404";
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';
import Cookies from 'universal-cookie';

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
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;