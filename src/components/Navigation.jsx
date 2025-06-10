import { NavLink } from "react-router";
import BCBSIcon from '../assets/BCBSE-icon-1024.png'
import SettingsIcon from '../assets/cog.png';
import BackIcon from '../assets/back-button.png';
import AddIcon from '../assets/plus.png';
import ResetIcon from '../assets/reset.png';

// Toggle path
const toggleSettings = () => {
  const handleReset = (e) => {
    e.preventDefault();
    let decision = confirm("This will erase ALL user content, which includes notes, custom carriers, and overrides. It will be as if you installed BCBS Explorer for the first time.\n\nContinue?");
  
    if (decision) {
      localStorage.clear()
      window.location.pathname = "/search";
    }
  }

  if (window.location.pathname == "/search" || window.location.pathname == "/index.html" || window.location.pathname == "/") {
    return (
      <>
        <div>
          <NavLink to="/settings">
            <img src={SettingsIcon} className="nav-icon" />
            <span>Settings</span>
          </NavLink>
          
          <NavLink to="/add">
            <img src={AddIcon} className="nav-icon" />
            <span>Add carrier</span>
          </NavLink>
        </div>
      </>
    );

  } else if (window.location.pathname == "/settings") {
    return (
      <div>
        <NavLink to="/search">
          <img src={BackIcon} className="nav-icon" />
          <span>Back</span>
        </NavLink>
        <a href="/search" onClick={(e) => handleReset(e)}>
          <img src={ResetIcon} className="nav-icon" />
          <span>Reset</span>
        </a>
      </div>
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
          <h3>BCBS Explorer</h3>
          <img src={BCBSIcon} className="nav-icon" />
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
