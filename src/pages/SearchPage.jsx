import { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import BCBSDB from "../assets/bcbs_data.json";
import CarrierCard from "../components/CarrierCard";
import Note from "../components/Note"
import "../App.css";
import Navigation from '../components/Navigation';

const findCarrierByPrefix = (data, prefix) => {
  const carriers = Object.keys(data).map(key => ({
    planName: key,
    ...data[key]
  }));

  return carriers.find(carrier => carrier.prefixes.includes(prefix));
};

const findCarrierByName = (data, planName) => {
  const carriers = Object.keys(data).map(key => ({
    planName: key,
    ...data[key]
  }));

  return carriers.find(carrier => carrier.planName.includes(planName));
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
      let carrierMatch = findCarrierByPrefix(BCBSDB, value);
      if (typeof carrierMatch !== "undefined") {
        setCurrentCarrier(carrierMatch["planName"]);
        setResults([carrierMatch]);
      } else {
        setResults([{ planName: "Prefix not found" }]);
      }
    } else {
      setCurrentCarrier("");
      setResults([]);
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
            <input
              type="text"
              id="searchText"
              value={searchValue}
              onChange={handleSearchTextChange}
              maxLength={maxLength}
              ref={searchTextBox}
              placeholder={maxLength === 100 ? 'Search by carrier...' : 'Search by prefix...'}
            />
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
          </div>
        </section>
      </div>
      <div className='search-results'>
        {results.map((carrier) => (
          <CarrierCard
            key={carrier}
            carrierName={carrier.planName}
            carrierPrefix={searchValue.toUpperCase()}
            carrierPhoneNumbers={carrier.phone_numbers}
            carrierURLs={carrier.URLs}
          />
        ))}
      </div>
      {results.length !== 0 ? <Note carrierKey={currentCarrier} /> : null }
    </>
  );
}

Search.propTypes = {
  maxLength: PropTypes.number,
};

export default Search;