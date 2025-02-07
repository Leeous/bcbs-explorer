import Navigation from "../components/Navigation";

function Settings() {
    return (
        <>
          <Navigation />
            <details className="settings-cat">
                <summary>Appearance</summary>
                
            </details>
            <details className="settings-cat">
                <summary>Saved Notes</summary>
                
            </details>

            <button className="button-normal">Reset all</button>
            <button className="button-normal">Reset notes</button>
            <button className="button-normal">Reset settings</button>
        </>
    );
}

export default Settings