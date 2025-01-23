import { NavLink } from 'react-router';
import '../App.css'

function Navigation() {
    return(
        <nav id="navigation">
                {/* <li><a onClick={() => {window.location.hash = "search"; window.location.reload()}} href="#search">Search<br/>&#x1F50E;</a></li> */}
                <NavLink className={"nav-button-normal"} to={"/search"}>
                  Search 🔎
                </NavLink>
                <NavLink className={"nav-button-normal"} to={"/settings"}>
                  Settings 🛠️
                </NavLink>
                {/* <li><a onClick={() => {window.location.hash = "settings"; window.location.reload()}} href="#settings">Settings<br/>&#9874;</a></li> */}
        </nav>
    )
}

export default Navigation