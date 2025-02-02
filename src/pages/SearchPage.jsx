import { useState } from 'react';
import Search from "../components/Search";
import Navigation from '../components/Navigation';


const SearchPage = () => {
  return(
    <>
      <img src='/BCBSPEicon.png' className='icon' />
      <section className="search">
          <Search />
      </section>
    </>
  );

}

export default SearchPage;