import Navigation from "../components/Navigation";

console.log(localStorage)

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
                      <h4 key={key}>{key}</h4>
                      <textarea className="noteText">{localStorage[key]}</textarea>
                    </>
                  ))}
            </div>
            </details>

            <button className="button-normal">Reset all</button>
            <button className="button-normal">Reset notes</button>
            <button className="button-normal">Reset settings</button>
        </>
    );
}

export default Settings