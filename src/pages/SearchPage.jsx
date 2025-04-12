import { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import BCBSDB from "../assets/bcbs_data.json";
import CarrierCard from "../components/CarrierCard";
import Note from "../components/Note"
import "../App.css";
import Navigation from '../components/Navigation';

// TODO: need to rewrite to be a single function

const findCarrier = (data, value, searchType) => {
  const carriers = Object.keys(data).map(key => ({
    planName: key,
    ...data[key]
  }));


  if (searchType == "prefix") {
    return carriers.find(carrier => carrier.prefixes.includes(value.toLowerCase()));
  } else {
    return carriers.filter(carrier => (carrier.planName.toLowerCase().includes(value.toLowerCase())));
  }
};

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentCarrier, setCurrentCarrier] = useState('');
  const [searchType, setSearchType] = useState("prefix");
  const [results, setResults] = useState([]);
  const [maxLength, setMaxLength] = useState(3);
  const searchTextBox = useRef();

  const handleSearchTypeChange = () => {
    searchType === "prefix" ? (setSearchType("carrier"), setMaxLength(100), setSearchValue(""), setResults([]), searchTextBox.current.style.width = "400px", searchTextBox.current.focus()) : (setSearchType("prefix"), setMaxLength(3), setResults([]), setSearchValue(""), searchTextBox.current.style.width = "260px", searchTextBox.current.focus());
  }

  // Search Logic \\
  const handleSearch = useCallback((value) => {
    if (value && value.length == maxLength && searchType === "prefix") {
      let carrierMatch = findCarrier(BCBSDB, value, searchType);
      if (typeof carrierMatch !== "undefined") {
        setCurrentCarrier(carrierMatch["planName"]);
        setResults([carrierMatch]);
      } else {
        setResults([{ planName: "Prefix not found" }]);
      }
    } else if (value.length < 3 && searchType === "prefix") {
      // Empty results if value length is < 3 characters long
      setCurrentCarrier("");
      setResults([]);
    } else if (value && searchType === "carrier") {

      let carrierMatch = findCarrier(BCBSDB, value, searchType);
      setResults(carrierMatch);
    }
  }, [maxLength, searchType]);

  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue, handleSearch]);

  const handleSearchTextChange = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <>
      <Navigation />
      <div className='search'>
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
              type="text"
              className={maxLength === 100 ? 'searchText carrier' : 'searchText prefix'}
              value={searchValue}
              onChange={handleSearchTextChange}
              maxLength={maxLength}
              ref={searchTextBox}
              placeholder={maxLength === 100 ? 'Search by carrier...' : 'Search by prefix...'}
            />

          </div>
        </section>
      </div>
      <div className={maxLength === 100 ? 'search-results carrier' : 'search-results prefix'}>
        {/* FIXME: Obviously, there is a better way to do this, might rework in the future */}
        {searchType == "prefix" ? results.map((carrier) => ( <CarrierCard key={carrier} carrierName={carrier.planName} carrierPhoneNumbers={carrier.phone_numbers} carrierURLs={carrier.URLs} />)) : null }
        {searchType == "carrier" ? results.map((carrier) => <li className='carrier' key={carrier.planName}>{carrier.planName}</li>) : null }
        {results.length !== 0 ? <Note carrierKey={currentCarrier} /> : null } 
      </div>
    </>
  );
}

Search.propTypes = {
  maxLength: PropTypes.number,
};

export default Search;