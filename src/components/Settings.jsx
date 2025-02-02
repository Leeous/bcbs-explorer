import Navigation from "./Navigation";

function Settings() {
    return (
        <>
            <details className="settings-cat">
                <summary>Appearance</summary>
                
            </details>

            <button className="button-normal">Reset all</button>
            <button className="button-normal">Reset notes</button>
            <button className="button-normal">Reset settings</button>
            <Navigation />
        </>
    );
}

export default Settings