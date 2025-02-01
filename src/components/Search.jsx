import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import BCBSDB from "../assets/bcbs_db.json";
import CarrierCard from "./CarrierCard";
import "../App.css";

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState([]);
    const [maxLength, setMaxLength] = useState(3);
  
    // Search Logic \\
    const handleSearch = useCallback((value) => {
      if (value && value.length == maxLength) {
        setResults(BCBSDB.filter(item => item.prefix.toLowerCase().includes(value.toLowerCase())));
      } else {
        setResults([]);
      }
    });
  
    useEffect(() => {
      handleSearch(searchValue);
    }, [searchValue, handleSearch]);
  
    const handleChange = (event) => {
      setSearchValue(event.target.value);
    }

    const handleLengthChange = (length) => {
      setMaxLength(length);
    }
  
    return (
      <div>
      <input
        type="text"
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

      {/* <button onClick={() => handleLengthChange(3)}>3</button> */}
      {/* <button onClick={() => handleLengthChange(10)}>10</button> */}
    </div>
  );
}

export default Search;