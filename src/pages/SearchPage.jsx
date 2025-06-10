import { useEffect, useState, useRef, useCallback } from 'react';
import BCBSDB from "../assets/bcbs_data.json";
import CarrierCard from "../components/CarrierCard";
import Note from "../components/Note";
import Modal from '../components/Modal';
import Navigation from '../components/Navigation';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [carrierClicked, setCarrierClicked] = useState(false);
  const [searchType, setSearchType] = useState("prefix");
  const [results, setResults] = useState([]);
  const [maxLength, setMaxLength] = useState(3);
  const searchTextBox = useRef();

  const handleSearchTypeChange = () => {
    searchType === "prefix" ? (setSearchType("carrier"), setMaxLength(100), setSearchValue(""), setResults([]), setCarrierClicked(false), searchTextBox.current.style.width = "400px", searchTextBox.current.focus()) : (setSearchType("prefix"), setMaxLength(3), setResults([]), setSearchValue(""), setCarrierClicked(false), searchTextBox.current.style.width = "260px", searchTextBox.current.focus());
  }

  // Search Logic \\
  const handleSearch = useCallback((value) => {

    // All carrier data
    const carriers = Object.keys(BCBSDB).map(key => ({
      planName: key,
      ...BCBSDB[key]
    }));

    let prefixMatch = searchType == "prefix" ? carriers.find(carrier => carrier.prefixes.includes(value.toLowerCase())) : null;
    let carrierMatch = searchType == "carrier" ? carriers.filter(carrier => (carrier.planName.toLowerCase().includes(value.toLowerCase()))) : null;

    const overrideData = JSON.parse(localStorage.getItem(`${value}-override`));

    if (value.length < 3 && searchType === "prefix" || value.length == 0 && searchType === "carrier") {
      // Empty results if value length is < 3 characters long
      setResults([]);
    } else if (searchType == "carrier" && value) {
      setResults(carrierMatch);
    } else if (searchType == "prefix" && value.length == maxLength) {
      if (prefixMatch == null && !overrideData) {
        setResults([{ planName: "Prefix not found" }]);
      } else {
        console.log(overrideData)
        // results.map((carrier) => (<CarrierCard key={carrier.planName} carrierName={carrier.planName} carrierPhoneNumbers={carrier.phone_numbers} carrierURLs={carrier.URLs}
        if (overrideData){
          setResults(prevResults => ([{
            ...prevResults,
            planName: overrideData?.name || prefixMatch?.planName || prevResults.name,
            phone_numbers: overrideData?.phones || prefixMatch?.phone_numbers || prevResults.phones,
            URLs: overrideData?.links || prefixMatch?.URLs || prevResults.links,
          }]));
        } else {
          setResults([prefixMatch]);
        }
      }
    }
  }, [maxLength, searchType]);

  useEffect(() => { handleSearch(searchValue); }
    , [searchValue, handleSearch]);

  const handleCarrierSelection = (e) => {
    let eTarget = e.target;
    let eKey = e.key;
    let eType = e.type;

    // Only accept Space and Enter as select keys
    if (eType != "click" && eKey != "Enter" && e.code != "Space" && eKey != "ArrowUp" && eKey != "ArrowDown") { return; }

    // Arrow keys for list
    if (eKey == "ArrowUp") { e.preventDefault(); eTarget.previousSibling.focus(); return; }
    if (eKey == "ArrowDown") { e.preventDefault(); eTarget.nextSibling.focus(); return; }

    // Prevent space from scrolling app
    if (e.code == "Space") { e.preventDefault() }

    setCarrierClicked(true);
    console.info(`Carrier ${eTarget.innerText} selected.`)
    setSearchValue(eTarget.innerText);
  }

  const handleSearchTextChange = (event) => {
    if (carrierClicked) {
      setCarrierClicked(false);
      setSearchValue("");
      setResults([]);
    } else {
      setSearchValue(event.target.value);
    }
  }

  const handleSearchClick = () => {
    if (carrierClicked) {
      setSearchValue("");
      setCarrierClicked(false);
    }
  }

  return (
    <>
      <Modal title="DISCLAIMER" cookieName="disclaimerAck" showRememberCheckbox={false} confirmationText="I understand and agree" description={`
          <div className="disclaimerModal">
            This browser extension, BCBS Explorer, is designed to provide users with information about Blue Cross Blue Shield (BCBS) carriers. The information provided by this extension is for general informational purposes only and is not intended to be a substitute for official documentation.
            <br/>
            <br/>
            <h3>Accuracy of Information</h3>
            While I strive to ensure that the information provided by this extension is accurate and up-to-date, I make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the information, products, services, or related graphics contained in the extension for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
            <br/>
            <br>
            <h3>No Endorsement</h3>
            This extension is not affiliated with, endorsed by, or sponsored by any Blue Cross Blue Shield carrier or any of its affiliates. The use of any trade names, trademarks, service marks, logos, or domain names (collectively “Marks”) in this extension does not imply any affiliation with or endorsement by the respective owners.
            <br/>
            <br/>
            <h3>Limitation of Liability</h3>
            In no event will I be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this extension.
            <br/>
            <br/>
            <h3>External Links</h3>
            Through this extension, you may be able to link to other websites which are not under the control of Leeous&apos; Creations. I have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
            <br/>
            <br/>
            <h3>Changes to This Disclaimer</h3>
            I may update this disclaimer from time to time. I will notify you of any changes by posting the new disclaimer on this page. You are advised to review this disclaimer periodically for any changes. Changes to this disclaimer are effective when they are posted on this page.
            <br/>
            <br/>
            <h3>Notes fields</h3>
            Notes are not currently encrypted - please do not store PHI in this field as it will not be properly secured.
            <br/>
            <br/>
            <h3>Contact Us</h3>
            If you have any questions about this disclaimer, contact me at <span><a href="mailto:contact@leeous.com">contact@leeous.com</a>.</span>
          </div>`} />
    
      <Navigation />
      <div className='search-wrapper'>
        <section>
          <div>
            <div>
              <input
                onClick={handleSearchTypeChange}
                data-length={3}
                type="button"
                className={maxLength === 3 ? 'active search-type' : ' search-type'}
                disabled={maxLength === 3 ? true : false}
                value="Prefix"
              />
              <input
                onClick={handleSearchTypeChange}
                data-length={100}
                type="button"
                className={maxLength === 100 ? 'active search-type' : 'search-type'}
                disabled={maxLength === 100 ? true : false}
                value="Carrier"
              />
            </div>
            <input
              type="search"
              className={maxLength === 100 ? 'searchText carrier' : 'searchText prefix'}
              value={searchValue}
              onChange={handleSearchTextChange}
              onClick={handleSearchClick}
              maxLength={maxLength}
              ref={searchTextBox}
              placeholder={maxLength === 100 ? 'Search by carrier...' : 'Search by prefix...'}
            />

          </div>
        </section>
      </div>
      <div className={maxLength === 100 ? 'search-results carrier' : 'search-results prefix'}>
        {/* FIXME: Obviously, there is a better way to do this, might rework in the future */}
        {results.length == 1 || searchType == "carrier" && carrierClicked ? results.map((carrier) => (<CarrierCard key={carrier.planName} carrierName={carrier.planName} carrierPhoneNumbers={carrier.phone_numbers} carrierURLs={carrier.URLs} />)) : null}
        <ul className='carrierSearchResults' tabIndex={-1}>
          {searchType == "carrier" && !carrierClicked ? results.map((carrier) => <li className='carrier' onClick={handleCarrierSelection} onKeyDown={handleCarrierSelection} key={carrier.planName} tabIndex={0}>{carrier.planName}</li>) : null}
        </ul>
        {results.length !== 0 && results[0].planName != "Prefix not found" && searchType == "prefix" ? <Note carrierPrefix={searchValue} carrierName={results[0].planName} /> : null}
      </div>
    </>
  );
}

export default Search;