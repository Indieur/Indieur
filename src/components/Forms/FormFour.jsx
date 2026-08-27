import React from 'react';

const SearchForm = ()=> {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form action="#" className="search_form1" onSubmit={handleSubmit}>
        <input type="text" placeholder="Search here..." />
        <button type="submit" aria-label="search-button"><i className="far fa-search"></i></button>
    </form>
  );
};

export default SearchForm;