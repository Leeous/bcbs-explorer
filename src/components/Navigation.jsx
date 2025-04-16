import { NavLink } from "react-router";
import "../App.css";
import BCBSIcon from '../assets/BCBSE-icon-1024.png'
import SettingsIcon from '../assets/cog.png';
import BackIcon from '../assets/back-button.png';

// Toggle path
const toggleSettings = () => {
  if (window.location.pathname == "/search" || window.location.pathname == "/index.html" || window.location.pathname == "/") {
    return (
      <NavLink to="/settings">
        <img src={SettingsIcon} className="nav-icon" />
        <span>Settings</span>
      </NavLink>
    );
  } else {
    return (
      <NavLink to="/search">
        <img src={BackIcon} className="nav-icon" />
        <span>Back</span>
      </NavLink>
    );
  }
}

function Navigation() {
	return (
			<header className="navigation">
        <nav>
            {toggleSettings()}
            <div>
              <h1>BCBS Explorer</h1>
              <img src={BCBSIcon} className="nav-icon" />
            </div>
        </nav>
			</header>
	);
}

export default Navigation;
