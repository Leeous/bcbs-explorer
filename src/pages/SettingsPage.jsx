import Navigation from "../components/Navigation";

function clearNoteStorage() {
  // Clear storage
  localStorage.clear();
  // Reload page
  window.location.reload();
}

function Settings() {
    return (
        <>
          <Navigation />
            <details className="settings-cat">
                <summary>Appearance</summary>
                
            </details>
            <details className="settings-cat">
                <summary>Saved Notes</summary>
                <div>
                  {Object.keys(localStorage).map(key => (
                    <>
                      <h4 key={localStorage[key]}>{key}</h4>
                      <p key={key} style={{fontSize: ".9rem"}} className="noteText">{localStorage[key]}</p>
                    </>
                  ))}
            </div>
            </details>

            <button className="button-normal">Reset all</button>
            <button className="button-normal" onClick={() => clearNoteStorage()}>Reset notes</button>
            <button className="button-normal">Reset settings</button>
        </>
    );
}

export default Settings