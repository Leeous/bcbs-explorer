import { NavLink } from "react-router";
import BCBSIcon from '../assets/BCBSE-icon-1024.png'
import SettingsIcon from '../assets/cog.png';
import BackIcon from '../assets/back-button.png';
import AddIcon from '../assets/plus.png';
import ResetIcon from '../assets/reset.png';
import UpdateIcon from '../assets/update.png';
import { useNavigate } from "react-router";

// Toggle path
const ToggleSettings = () => {
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    let decision = confirm("CAUTION!!!\nThis will erase ALL user content, which includes notes, custom carriers, and overrides. It will be as if you installed BCBS Explorer for the first time.\n\nContinue?");

    if (decision) {
      localStorage.clear();
      navigate('/search');
    }
  }

  return (
    <>
      <div>
        {(window.location.pathname === "/search" || window.location.pathname === "/") &&
          <NavLink to="/settings">
            <img src={SettingsIcon} className="nav-icon" />
            <span>Settings</span>
          </NavLink>
        }

        {(window.location.pathname === "/search" || window.location.pathname === "/") &&
          <NavLink to="/add">
            <img src={AddIcon} className="nav-icon" />
            <span>Add carrier</span>
          </NavLink>
        }

        {!(window.location.pathname === "/search" || window.location.pathname === "/") &&
          <NavLink to={window.location.pathname === "/changelog" ? "/settings" : "/search"}>
            <img src={BackIcon} className="nav-icon" />
            <span>Back</span>
          </NavLink>
        }

        {window.location.pathname === "/settings" &&
          <a href="/search" onClick={(e) => handleReset(e)}>
            <img src={ResetIcon} className="nav-icon" />
            <span>Reset</span>
          </a>
        }

        {window.location.pathname === "/settings" &&
          <NavLink to="/changelog">
            <img src={UpdateIcon} className="nav-icon" />
            <span>Changelog</span>
          </NavLink>
        }
      </div>
    </>
  );
}

function Navigation() {
  return (
    <header className="navigation">
      <nav>
        {ToggleSettings()}
        <div>
          {window.location.pathname !== "/settings" &&
            <h3>BCBS Explorer</h3>
          }
          <img src={BCBSIcon} className="nav-icon" />
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
