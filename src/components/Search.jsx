/* eslint-disable no-unused-vars */
import BCBSDB from "../assets/bcbs_db.json";
import Navigation from "./Navigation";
import "../App.css";
import Cookies from "universal-cookie";
import CarrierCard from "./CarrierCard";
// By default, we will want to search by prefix
let searchType = "prefix";

const cookies = new Cookies();

function changeSearchType(event, type) {
	const searchTextElement = document.querySelector("#searchText");
	const searchBox = document.querySelector("#searchBox");
	// Cancel search type switch if it matches attempted value
	if (searchType == type) {
		return;
	}
	searchType = type;

	// Change active tab class
	document.querySelector(".searchType .active").classList = "";
	event.target.classList.add("active");

	// Set search type
	if (type == "carrier") {
		searchTextElement.setAttribute("placeholder", "Search for a carrier...");
		searchTextElement.removeAttribute("maxlength", 3);
		searchTextElement.style.textTransform = "none";
		searchTextElement.style.fontWeight = "500";
	} else if (type == "prefix") {
		searchTextElement.setAttribute("placeholder", "Search for a prefix...");
		searchTextElement.setAttribute("maxlength", 3);
		searchTextElement.style.textTransform = "uppercase";
		searchTextElement.style.fontWeight = "bold";
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
	function editNote(e) {
    console.log(e);
  }

	function searchDB(e) {
		const searchTextElement = document.querySelector("#searchText");
    const searchBox = document.querySelector("#searchBox");

		// Set search value to lower case to ignore casing
		let searchValue = e.toLocaleLowerCase();

		// TODO: add this to prefix search only
		// Clear search box if searchText length is < 3. Might change this behaviour.
		// if (searchValue.length < 3) { searchBox.innerHTML = ""; }

		// Clear search box on next to display next hit
		if (searchBox.hasChildNodes() && searchValue.length != 3) {
			searchBox.innerHTML = "";
		}

		// Ensure we wait for the full prefix to attempt a match
		// if (searchValue.length == 3) {
		for (let i = 0; i < BCBSDB.length; i++) {
			if (BCBSDB[i][searchType].toLocaleLowerCase() == searchValue) {
				// If carrier search, ONLY display carrier number and numbers from the first result
				if (
					BCBSDB[i].carrier != "Prefix Not in Use" &&
					searchType == "carrier"
				) {
					searchBox.insertAdjacentHTML(
						"beforeend",
						`<p><b>${BCBSDB[i].carrier}</b> can be reached using the methods listed below.</p>`
					);

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

					// Display carrier claims phone number, if it exists
					if (BCBSDB[i].claims_phone_number) {
						try {
							searchBox.insertAdjacentHTML(
								"beforeend",
								`<p>Phone Number (claims): ${
									"<br/><span>" +
									JSON.parse(BCBSDB[i].claims_phone_number).phone_numbers.join(
										"<br/>"
									) +
									"</span>"
								}</p>`
							);
							return;
						} catch (e) {
							console.log("Carrier has a single phone number for claims.");
						}
						searchBox.insertAdjacentHTML(
							"beforeend",
							`<p>Phone Number (claims):<br/> ${BCBSDB[i].claims_phone_number}</p>`
						);
					}

					return;
				}

				// // Display carrier name, if it exists
				// if (BCBSDB[i].carrier != "Prefix Not in Use") {
				// 	searchBox.insertAdjacentHTML(note
				// 		"beforeend",
				// 		`<p>It seems like prefix <b>${BCBSDB[i].prefix}</b> is for carrier <b>${BCBSDB[i].carrier}</b>.</p>`
				// 	);
				// } else {
				// 	searchBox.insertAdjacentHTML(
				// 		"beforeend",
				// 		`<p>It seems like prefix <b>${BCBSDB[i].prefix}</b> is either no longer in use or was never used by a BCBS carrier.</p>`
				// 	);
				// }

				// Display carrier website, if it exists
				if (BCBSDB[i].url) {
					searchBox.insertAdjacentHTML(
						"beforeend",
						`<p><a href="${BCBSDB[i].url}">Website</a></p>`
					);
				}

				// Display carrier benefits phone number, if it exists
				if (BCBSDB[i].benefits_phone_number) {
					try {
						searchBox.insertAdjacentHTML(
							"beforeend",
							`<p>Phone Number (benefits): ${
								"<br/><span>" +
								JSON.parse(BCBSDB[i].benefits_phone_number).phone_numbers.join(
									"<br/>"
								) +
								"</span>"
							}</p>`
						);
					} catch (e) {
						console.log("Carrier has a single phone number for benefits.");
						searchBox.insertAdjacentHTML(
							"beforeend",
							`<p>Phone Number (benefits):<br/> ${BCBSDB[i].benefits_phone_number}</p>`
						);
					}
				}

				// Display carrier claims phone number, if it exists
				if (BCBSDB[i].claims_phone_number) {
					try {
						searchBox.insertAdjacentHTML(
							"beforeend",
							`<p>Phone Number (claims): ${
								"<br/><span>" +
								JSON.parse(BCBSDB[i].claims_phone_number).phone_numbers.join(
									"<br/>"
								) +
								"</span>"
							}</p>`
						);
					} catch (e) {
						console.log("Carrier has a single phone number for claims.");
						searchBox.insertAdjacentHTML(
							"beforeend",
							`<p>Phone Number (claims):<br/> ${BCBSDB[i].claims_phone_number}</p>`
						);
					}
				}

        // Check for notes on carrier
        if (localStorage.getItem(BCBSDB[i].carrier) === null) {
          // No notes for carrier
          searchBox.insertAdjacentHTML("beforeend", `<div><textarea id="notes" placeholder="Notes on ${BCBSDB[i].carrier}"></textarea></div>`);
          document.querySelector('#notes').addEventListener("change", function (e) {
            console.log(document.querySelector('#notes').value)
          })
          
        } else {
          // Notes saved for carrier
          console.log("bye");
        }
			}
		}
	}

	return (
		<>
			<form>
				<div className="searchType">
					<input
						onClick={(e) => changeSearchType(e, "prefix")}
						type="button"
						className="active"
						value="Prefix"
					/>
					<input
						onClick={(e) => changeSearchType(e, "carrier")}
						type="button"
						value="Carrier"
					/>
					{/* <input onClick={(e) => changeSearchType(e, "payer_id")} type="button" value="Payer ID"  /> */}
				</div>
				<input
					onChange={(e) => searchDB(e.target.value)}
					onKeyDown={(e) => {
						if (e.key == "Enter") {
							e.preventDefault();
						}
					}}
					autoComplete="off"
					type="text"
					maxLength={3}
					size={20}
					placeholder="Search for a prefix..."
					name="Prefix"
					id="searchText"
				/>
        <br/>
        <textarea
					onChange={(e) => editNote(e.target.value)}
					onKeyDown={(e) => {
						if (e.key == "Enter") {
							e.preventDefault();
						}
					}}
					autoComplete="off"
					type="text"
					size={20}
					placeholder="Notes..."
					name="Prefix"
					id="noteText"
				></textarea>

				<div id="searchBox"></div>
				{/* <input type="submit" value="Go" onClick={searchDB()} onSubmit={() => searchDB()} hidden /> */}
        {/* <div><textarea placeholder="Notes on ${BCBSDB[i].carrier}"></textarea></div> */}

      </form>
      <a
          className="report-issue"
          href="https://cryptpad.fr/form/#/2/form/view/8MvvJD28sitW-FTNOJLY7YpELtdP-h58HhRq+2u0l5c/"
          target="_blank"
          >
          Report
      </a>
		</>
	);
}

export default Search;
