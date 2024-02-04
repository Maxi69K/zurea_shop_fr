import React, { useState } from 'react';
//import React, { useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

const NavBarSearchComponent = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

//   useEffect(() => {
//     console.log('Search state -> ', searchValue);
//   }, [searchValue]);

  const onSearch = () => { // for url params
    if (searchValue) {
      navigate(`/shop/${searchValue.replaceAll(' ', '-')}`); // replaceAll - that there is no empty space **
    }
  }

// const onSearch = () => {
//     if (searchValue) {
//         navigate(`/shop?search=${searchValue}`); // need for query params
//     }
// }

  return (
    <>
      <Link
        className="mx-2"
        onClick={() => setShowSearchInput(!showSearchInput)}
      >
        <BsSearch />
      </Link>
      {showSearchInput ? (
        <div className="d-flex justify-content-center align-items-center gap-1 ">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            className="d-inline-block"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            onClick={() => onSearch()}
            className="btn btn-sm btn-outline-success"
          >
            Search
          </button>
        </div>
      ) : null}
    </>
  );
};

export default NavBarSearchComponent;
