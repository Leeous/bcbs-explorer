import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import BCBSDB from "../assets/bcbs_db.json";
import CarrierCard from "./CarrierCard";
import "../App.css";

const Search = ({maxLength}) => {
    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState([]);
  
    // Search Logic \\
    const handleSearch = useCallback((value) => {
      if (value && value.length == maxLength /*|| value*/) {
        setResults(BCBSDB.filter(item => item.prefix.toLowerCase().includes(value.toLowerCase())));
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
      <section>
        <input
          type="text"
          id="searchText"
          value={searchValue}
          onChange={handleChange}
          maxLength={maxLength}
          placeholder="Search..."
        />
        <div>
        {results.map(item => (
          <CarrierCard 
            key={item.prefix}
            carrierName={item.carrier}
            carrierPrefix={item.prefix}
            carrierNumberBenefits={item.benefits_phone_number}
            carrierNumberClaims={item.claims_phone_number}
            carrierPortalURL={item.url}
          />
        ))}
        </div>
      </section>
  );
}

Search.propTypes = {
  maxLength: PropTypes.number,
};

export default Search;