import { useEffect, useState, useRef, useCallback } from 'react';
import BCBSDB from "../assets/bcbs_data.json";
import CarrierCard from "../components/CarrierCard";
import Note from "../components/Note"
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

    if (value.length < 3 && searchType === "prefix" || value.length == 0 && searchType === "carrier") {
      // Empty results if value length is < 3 characters long
      setResults([]);
    } else if (searchType == "carrier" && value) {
      setResults(carrierMatch);
    } else if (searchType == "prefix" && value.length == maxLength) {
      console.log(prefixMatch)
      if (prefixMatch == null) {
        setResults([{ planName: "Prefix not found" }]);
      } else {
        setResults([prefixMatch]);
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