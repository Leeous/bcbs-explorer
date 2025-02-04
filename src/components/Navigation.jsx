import { NavLink } from "react-router";
import "../App.css";
import BCBSIcon from '../assets/BCBSPEicon.png'
import SettingsIcon from '../images/cog.png';
import BackIcon from '../images/back-button.png';

const toggleSettings = () => {
  if (window.location.pathname == "/search" || window.location.pathname == "/") {
    return (
      <NavLink to="/settings">
        <img src={SettingsIcon} className="icon" />
        <span>Settings</span>
      </NavLink>
    );
  } else {
    return (
      <NavLink to="/search">
        <img src={BackIcon} className="icon" />
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
              <img src={BCBSIcon} className="icon" />
            </div>
        </nav>
			</header>
	);
}

export default Navigation;
