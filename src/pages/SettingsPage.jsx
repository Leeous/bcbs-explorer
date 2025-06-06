import { useState } from "react";
import Navigation from "../components/Navigation";

let theme = localStorage.getItem('theme');


function clearNoteStorage() {
  // Clear storage
  localStorage.clear();
  // Reload page
  window.location.reload();
}

function Settings() {
  const [savedNotes, setSavedNotes] = useState([]);

  const handleNotes = () => {
    let localStorageKeys = Object.keys(localStorage);
    let notes = [];

    localStorageKeys.forEach((key) => {
      console.log(key)
      if (key.length == 3) {
        notes.push(key)
      }
    })
    
    setSavedNotes(notes);
  }

  const handleDeleteNote = (key) => {
    localStorage.removeItem(key);
    console.info(`Note removed for ${key.toUpperCase()} prefix.`);
  }

  const handleThemeChange = (e) => {
    document.documentElement.setAttribute("data-theme", e.target.value);
    localStorage.setItem("theme", e.target.value);
  }

  return (
    <>
      <Navigation />
      <details className="settings-cat">
        <summary>Appearance</summary>
        <div className="appearance">
          <p>Theme:</p>
          <select name="theme" defaultValue={theme} onChange={handleThemeChange} id="theme">
            <option value="blue">Blue (default)</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </details>
      <details className="settings-cat" onClick={handleNotes}>
        <summary>Saved Notes</summary>
        <div style={{ maxHeight: "50vh", overflow: "auto" }}>
          {savedNotes.length != 0 ? savedNotes.map(key => (
            <>
              <div className="carrier-note">
                <div>
                  <h4 key={localStorage[key]}>{JSON.parse(localStorage[key]).carrierName} - <span style={{ fontWeight: "400" }}>{key.toUpperCase()}</span></h4>
                  <p onClick={() => handleDeleteNote(key)}>X</p>
                </div>
                <p key={key} className="saved-note-text">{JSON.parse(localStorage[key]).note}</p>
              </div>
            </>
          )) : <p className="no-notes">No notes saved yet.</p>}
        </div>
      </details>

      {/* <button className="button-normal">Reset all</button>
      <button className="button-normal" onClick={clearNoteStorage}>Reset notes</button>
      <button className="button-normal">Reset settings</button> */}
      <div className="footer">
        <p>Suggestions? Issues? Compliments?<br/><span style={{fontSize: ".8em"}}>Reach me at <a href="mailto:contact@leeous.com">contact@leeous.com</a>.</span></p>
        <p>Made with ❤️ by <a href="https://leeous.com" target="_blank">Leeous</a>.</p>
      </div>
    </>
  );
}

// TODO: add abbirution to settings page - <a target="_blank" href="https://icons8.com/icon/59782/error">Warning</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

export default Settings