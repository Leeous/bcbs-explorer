import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import NotFound404 from "./pages/404";
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';
import AddCarrier from './pages/AddCarrier';
import './assets/css/App.css';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={ <SearchPage /> } />
        <Route path="/" element={ <SearchPage /> } />
        <Route path="/settings" element={ <SettingsPage /> } />
        <Route path="/add" element={ <AddCarrier /> } />
        <Route path="/404" element={ <NotFound404/>} />
        <Route path="*" element={<Navigate replace to="/search" />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;