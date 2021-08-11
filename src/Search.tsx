import React, { FC, ChangeEvent, useState, useReducer } from "react";
import { SearchProps} from "./types";


const Search:FC<SearchProps> = ({handleSubmit, isLoading}:SearchProps)=> {
  const [searchValue, setSearchValue] = useState<string>('');
  const filterOptions = ['relevancy', 'popularity', 'publishedAt'];

  const [currentOpt, setOption] = useState<string>('relevancy');

  const handleChange = (e: ChangeEvent<HTMLInputElement>):void => {
    const value = e.target.value;
    setSearchValue(value);
  }

  const handleSelect = (e:ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value);
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e, searchValue, currentOpt)} className="search__container">
        <input id="search" type="text" value={searchValue} onChange={handleChange} disabled={isLoading} />
        <button type="submit" disabled={isLoading ? true : false}>{isLoading ? 'Loading' : 'Search'}</button>
      </form>
      <select onChange={handleSelect}>
        {filterOptions.map((opt, i) => {
          return <option value={opt} key={opt + i}>{opt}</option>
        })}
      </select>
    </div>
  )
}

export default Search;