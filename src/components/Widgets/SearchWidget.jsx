import React, {useState} from 'react';

const SearchWidget = ()=> {
  // STATES
    const [search, setSearch] = useState('Search Here');
    // HANDLER
    const searchHandler = (e) => {
      setSearch(e.target.value);
    };

    const submitHandler = (e) => {
      e.preventDefault();
    };
  
  
  return (
    <form className="search-form">
      <input onChange={searchHandler} type="text" placeholder={search}/>
      <button onSubmit={submitHandler} type="submit"><i className="far fa-search"></i></button>
    </form>
  )
};

export default SearchWidget;