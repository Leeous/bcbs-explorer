import { useState } from 'react';
import Search from "../components/Search";
import Navigation from '../components/Navigation';


const SearchPage = () => {
  const [maxLength, setMaxLength] = useState(3);
  
  const handleLengthChange = (length) => {
    setMaxLength(length);
  }

  return(
    <>
      <Search maxLength={maxLength} />
      <button onClick={() => handleLengthChange(3)}>3</button>
      <button onClick={() => handleLengthChange(10)}>10</button>
      <Navigation />
    </>
  );

}

export default SearchPage;