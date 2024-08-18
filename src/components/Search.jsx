import BCBSDB from '../assets/bcbs_db.json';
let searchType = "prefix";

function changeSearchType(event, type) {
    const searchTextElement = document.querySelector("#searchText");
    // Cancel search type switch if it matches attempted value
    if (searchType == type) { return }
    searchType = type;
    console.log(searchType, event);

    // Change active tab class
    document.querySelector(".searchType .active").classList = "";
    event.target.classList.add("active");
    
    // Set search type
    if (type == "carrier") {
        searchTextElement.setAttribute("placeholder", "Search for a carrier...");
        searchTextElement.removeAttribute("maxlength");

    } else if (type == "prefix") {
        searchTextElement.setAttribute("placeholder", "Search for a prefix...");
        searchTextElement.setAttribute("maxlength", 3);
    } 
    
    // TODO: add payer IDs to DB
    /*else if (type == "payer_id") {
        searchTextElement.setAttribute("placeholder", "Search for a payer ID...");
    }*/

    // Clear the search input
    searchTextElement.value = "";
    // Clear search results
    searchBox.innerHTML = "";
}

function Search() {
    function searchDB(e) {
        // Set search value to lower case to ignore casing
        let searchValue = e.toLocaleLowerCase(); 

        // TODO: add this to prefix search only
        // Clear search box if searchText length is < 3. Might change this behaviour.
        // if (searchValue.length < 3) { searchBox.innerHTML = ""; } 
        
        // Clear search box on next to display next hit
        if (searchBox.hasChildNodes() && searchValue.length != 3 ) { searchBox.innerHTML = "" };


        // Ensure we wait for the full prefix to attempt a match
        // if (searchValue.length == 3) {
        for (let i = 0; i < BCBSDB.length; i++) {
            if (BCBSDB[i][searchType].toLocaleLowerCase() == searchValue) {  

                // If carrier search, ONLY display carrier number and numbers from the first result
                if (BCBSDB[i].carrier != "Prefix Not in Use" && searchType == "carrier") {
                    searchBox.insertAdjacentHTML('beforeend', `<p><b>${BCBSDB[i].carrier}</b> can be reached using the methods listed below.</p>`);

                    // Display carrier benefits phone number, if it exists
                    if (BCBSDB[i].benefits_phone_number) {
                        try {
                            searchBox.insertAdjacentHTML('beforeend', `<p>Phone Number (benefits): ${"<br/><span>" + JSON.parse(BCBSDB[i].benefits_phone_number).phone_numbers.join('<br/>') + "</span>"}</p>`);
                            return;
                        } catch (e) {
                            console.log("Carrier has a single phone number for benefits.")
                        }
                        searchBox.insertAdjacentHTML('beforeend', `<p>Phone Number (benefits):<br/> ${BCBSDB[i].benefits_phone_number}</p>`);
                    }

                    // Display carrier claims phone number, if it exists
                    if (BCBSDB[i].claims_phone_number) {
                        try {
                            searchBox.insertAdjacentHTML('beforeend', `<p>Phone Number (claims): ${"<br/><span>" + JSON.parse(BCBSDB[i].claims_phone_number).phone_numbers.join('<br/>') + "</span>"}</p>`);
                            return;
                        } catch (e) {
                            console.log("Carrier has a single phone number for claims.")
                        }
                        searchBox.insertAdjacentHTML('beforeend', `<p>Phone Number (claims):<br/> ${BCBSDB[i].claims_phone_number}</p>`);
                    }

                    return;
                }


                // Display carrier name, if it exists
                if (BCBSDB[i].carrier != "Prefix Not in Use") {
                    searchBox.insertAdjacentHTML('beforeend', `<p>It seems like prefix <b>${BCBSDB[i].prefix}</b> is for carrier <b>${BCBSDB[i].carrier}</b>.</p>`);
                } else {
                    searchBox.insertAdjacentHTML('beforeend', `<p>It seems like prefix <b>${BCBSDB[i].prefix}</b> is either no longer in use or was never used by a BCBS carrier.</p>`);
                }
                
                // Display carrier website, if it exists
                if (BCBSDB[i].url) {
                    searchBox.insertAdjacentHTML('beforeend', `<p><a href="${BCBSDB[i].url}">Website</a></p>`);
                }
                
                // Display carrier benefits phone number, if it exists
                if (BCBSDB[i].benefits_phone_number) {
                    try {
                        searchBox.insertAdjacentHTML('beforeend', `<p>Phone Number (benefits): ${"<br/><span>" + JSON.parse(BCBSDB[i].benefits_phone_number).phone_numbers.join('<br/>') + "</span>"}</p>`);
                        return;
                    } catch (e) {
                        console.log("Carrier has a single phone number for benefits.")
                    }
                    searchBox.insertAdjacentHTML('beforeend', `<p>Phone Number (benefits):<br/> ${BCBSDB[i].benefits_phone_number}</p>`);
                }
            
                // Display carrier claims phone number, if it exists
                if (BCBSDB[i].claims_phone_number) {
                    try {
                        searchBox.insertAdjacentHTML('beforeend', `<p>Phone Number (claims): ${"<br/><span>" + JSON.parse(BCBSDB[i].claims_phone_number).phone_numbers.join('<br/>') + "</span>"}</p>`);
                        return;
                    } catch (e) {
                        console.log("Carrier has a single phone number for claims.")
                    }
                    searchBox.insertAdjacentHTML('beforeend', `<p>Phone Number (claims):<br/> ${BCBSDB[i].claims_phone_number}</p>`);
                }
            }
        }
    }
    
    return (
        <>
            <form>
                <div className="searchType">
                    <input onClick={(e) => changeSearchType(e, "prefix")} type="button" className="active" value="Prefix" />
                    <input onClick={(e) => changeSearchType(e, "carrier")} type="button" value="Carrier" />
                    {/* <input onClick={(e) => changeSearchType(e, "payer_id")} type="button" value="Payer ID"  /> */}
                </div>
                <input onChange={(e) => searchDB(e.target.value)} onKeyDown={(e) => {if (e.key == "Enter") {e.preventDefault();}}} autoComplete='off' maxLength="3" type="text" size={18} placeholder="Search for a prefix..." name="Prefix" id="searchText" />

                <div id="searchBox"></div>
                {/* <input type="submit" value="Go" onClick={searchDB()} onSubmit={() => searchDB()} hidden /> */}
            </form>
        </>
    );
}

export default Search