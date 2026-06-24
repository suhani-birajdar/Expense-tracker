import React from 'react'

const Search = () => {
  return (
    <div>
        <button className='search'><img src={search} alt="search" onClick={openSearch}/>Search</button>
    </div>
  )
}

export default Search