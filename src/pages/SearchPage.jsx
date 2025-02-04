import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import BCBSDB from "../assets/bcbs_data.json";
import CarrierCard from "../components/CarrierCard";
import "../App.css";
import Navigation from '../components/Navigation';


const findCarrierByPrefix = (data, prefix) => {
  const carriers = Object.keys(data).map(key => ({
    planName: key,
    ...data[key]
  }));

  return carriers.find(carrier => carrier.prefixes.includes(prefix));
};

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);
  const [maxLength, setMaxLength] = useState(3);

  const handleSearchTypeChange = () => {
    if (maxLength === 3) {
      setSearchValue("");
      setMaxLength(100);
    } else {
      setSearchValue("");
      setMaxLength(3);
    }
  }
  
  // Search Logic \\
  const handleSearch = useCallback((value) => {
    if (value && value.length == maxLength /*|| value*/) {
      let carrierMatch = findCarrierByPrefix(BCBSDB, value);
      if (typeof carrierMatch !== "undefined") {
        setResults([carrierMatch]);
      }
    } else {
      setResults([]);
    }
  }, [maxLength]);

  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue, handleSearch]);

  const handleChange = (event) => {
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
            onChange={handleChange}
            maxLength={maxLength}
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
            // carrierPortalURL={item.url}
          />
          
        ))}
      </div>
    </>
  );
}

Search.propTypes = {
  maxLength: PropTypes.number,
};

export default Search;