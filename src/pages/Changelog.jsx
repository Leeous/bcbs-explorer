import Navigation from "../components/Navigation";
import { NavLink } from "react-router";

export default function Changelog() {
  return(
    <>
      <Navigation/>
      <div style={{margin: "0 1rem"}}>
        <h2 style={{textAlign: "center"}}>Changelog</h2>
        <section>
          
          <h4>v1.0.2</h4>
          <ul>
            <li><b>Added <NavLink to="/add">carrier overrides</NavLink></b></li>
            <li><b>Added import and export options to <NavLink to="/settings">Settings</NavLink></b></li>
            <li>Added a changelog to document updates</li>
            <li>Convert cookies to localStorage entries</li>
            <li>Greatly simplify Navigation&apos;s (top bar) rendering logic</li>

          </ul>
        </section>
      </div>
    </>
  );
}