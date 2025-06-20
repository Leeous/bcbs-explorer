import { use, useState } from "react";
import Navigation from "../components/Navigation";
import Modal from "../components/Modal";

let theme = localStorage.getItem("theme");

function saveJSON(data, filename) {
  const jsonData = JSON.stringify(data, null, 2); // Pretty-print JSON
  const blob = new Blob([jsonData], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function Settings() {
  const [savedNotes, setSavedNotes] = useState([]);
  const [overrides, setOverrides] = useState([]);
  const [exportOptions, setExportOptions] = useState([]);
  const [importOptions, setImportOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNotes = () => {
    let localStorageKeys = Object.keys(localStorage);
    let notes = [];

    localStorageKeys.forEach((key) => {
      console.log(key);<Modal title="Hello world" description="description" />
      if (key.length == 3) {
        notes.push(key);
      }
    });

    setSavedNotes(notes);
  };

  const handleDeleteKey = (key, type) => {
    localStorage.removeItem(key);
    console.info(`Note removed for ${key.toUpperCase()} prefix.`);
  };

  const handleThemeChange = (e) => {
    document.documentElement.setAttribute("data-theme", e.target.value);
    localStorage.setItem("theme", e.target.value);
  };

  const handleOverrides = () => {
    let localStorageKeys = Object.keys(localStorage);
    let overrides = [];



    localStorageKeys.forEach((key) => {
      if (
        key.slice(4) === "override"
      ) {
        overrides.push(key);
      }
    });
    setOverrides(overrides);
  };

  const handleExport = () => {
    // const myData = localStorage;
    // saveJSON(myData, "bcbs_data.json");
  }

  const handleImport = () => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const jsonData = JSON.parse(e.target.result);
      Object.entries(jsonData).forEach((key) => {
        localStorage.setItem(key[0], key[1]);
      })
    };
    reader.readAsText(file);
  }

  return (
    <>
      <Navigation />
      <details className="settings-cat">
        <summary>Appearance</summary>
        <div className="appearance">
          <p>Theme:</p>
          <select
            name="theme"
            defaultValue={theme}
            onChange={handleThemeChange}
            id="theme"
          >
            <option value="blue">Blue (default)</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </details>
      <details className="settings-cat" onClick={handleNotes}>
        <summary>Saved Notes</summary>
        <div style={{ maxHeight: "50vh", overflow: "auto" }}>
          {savedNotes.length != 0 ? (
            savedNotes.map((key) => (
              <>
                <div key={key} className="carrier-note">
                  <div>
                    <h4 key={localStorage[key]}>
                      {JSON.parse(localStorage[key]).carrierName} -{" "}
                      <span style={{ fontWeight: "400" }}>
                        {key.toUpperCase()}
                      </span>
                    </h4>
                    <p onClick={() => handleDeleteKey(key, "Note")}>X</p>
                  </div>
                  <p key={key} className="saved-note-text">
                    {JSON.parse(localStorage[key]).note}
                  </p>
                </div>
              </>
            ))
          ) : (
            <p className="no-notes">No notes saved yet.</p>
          )}
        </div>
      </details>
      <details className="settings-cat" onClick={handleOverrides}>
        <summary>Custom carriers / overrides</summary>
        <div style={{ maxHeight: "50vh", overflow: "auto" }}>
          {overrides.length != 0 ? (
            overrides.map((key) => (
              <>
                <div key={key} className="carrier-override">
                  <div>
                    <h3>{key.slice(0, 3).toUpperCase()}</h3>
                    <ul>
                      {JSON.parse(localStorage[key]).name && (
                        <li>Name: {JSON.parse(localStorage[key]).name}</li>
                      )}
                      {JSON.parse(localStorage[key]).phones && (
                        <>
                          <li>Phone numbers:</li>
                          <ul>
                            {JSON.parse(localStorage[key]).phones.map(
                              (phone) => (
                                <li key={phone}><a href={"tel:" + phone} >({String(phone).slice(0, 3)}) {String(phone).slice(3, 6)}-{String(phone).slice(6)}</a></li>
                              )
                            )}
                          </ul>
                        </>
                      )}
                      {JSON.parse(localStorage[key]).links && (
                        <>
                          <li>Links:</li>
                          <ul>
                            {JSON.parse(localStorage[key]).links.map(
                              (link, i) => (
                                <li key={i}><a href={link.link_url} target="_link">{link.link_text}</a></li>
                              )
                            )}
                          </ul>
                        </>
                      )}
                    </ul>
                    {/* <h4 key={localStorage[key]}>{JSON.parse(localStorage[key]).name} - <span style={{ fontWeight: "400" }}>{key.toUpperCase()}</span></h4>
                  <p onClick={() => handleDeleteNote(key)}>X</p> */}
                  </div>
                </div>
              </>
            ))
          ) : (
            <p className="no-notes">No custom carriers or overrides saved yet.</p>
          )}
        </div>
      </details>
      <div className="footer">
        <div>
          <button className="help-tooltip">?</button><br/>
          <button style={{marginRight: "5px"}} className="button-normal" onClick={handleExport}>Export Settings</button>
          <label htmlFor="import-settings" className="button-normal">Import Settings</label>
          <input style={{marginLeft: "5px"}} type="file" id="import-settings" accept=".json" onChange={handleImport} hidden/>
        </div>
        <p>
          Suggestions? Issues? Compliments?
          <br />
          <span style={{ fontSize: ".8em" }}>
            Reach me at
            <a href="mailto:contact@leeous.com">contact@leeous.com</a>.
          </span>
        </p>
        <p>
          Made with ❤️ by
          <a href="https://leeous.com" target="_blank">
            Leeous
          </a>
          .
        </p>
      </div>
      {isModalOpen && (
        <Modal
          title="Choose what to export"
          options={exportOptions}
          selectedOptions={exportOptions}
          onChange={setExportOptions}
          onSubmit={handleExport}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

// TODO: add abbirution to settings page - <a target="_blank" href="https://icons8.com/icon/59782/error">Warning</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

export default Settings;
