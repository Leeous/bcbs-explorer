import { useState } from "react";
import Navigation from "../components/Navigation";

function clearNoteStorage() {
  // Clear storage
  localStorage.clear();
  // Reload page
  window.location.reload();
}

function Settings() {

  const [savedNotes, setSavedNotes] = useState([]);

  const handleNotes = (e) => {
    setSavedNotes(Object.keys(localStorage))
  }

  const handleDeleteNote = (key) => {
    localStorage.removeItem(key);
    console.log(`Note removed for prefix ${key}`);
  }

  return (
    <>
      <Navigation />
      <details className="settings-cat">
        <summary>Appearance</summary>
        <div className="appearance">
          <p>Theme:</p>
          <select name="theme" id="theme">
            <option value="dark">Blue (default)</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </details>
      <details className="settings-cat" onClick={handleNotes}>
        <summary>Saved Notes</summary>
        <div style={{maxHeight: "50vh", overflow: "auto"}}>
          {savedNotes.map(key => (
            <>
              <div className="carrier-note">
                <div>
                  <h4 key={localStorage[key]}>{JSON.parse(localStorage[key]).carrierName} - <span style={{fontWeight: "400"}}>{key.toUpperCase()}</span></h4>
                  <p onClick={() => handleDeleteNote(key)}>X</p>
                </div>
                <p key={key} className="saved-note-text">{JSON.parse(localStorage[key]).note}</p>
              </div>
            </>
          ))}
        </div>
      </details>

      <button className="button-normal">Reset all</button>
      <button className="button-normal" onClick={clearNoteStorage}>Reset notes</button>
      <button className="button-normal">Reset settings</button>
    </>
  );
}

// TODO: add abbirution to settings page - <a target="_blank" href="https://icons8.com/icon/59782/error">Warning</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

export default Settings