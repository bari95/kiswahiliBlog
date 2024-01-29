import React, { useState, useEffect } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import SearchResults from './searchTrans/SearchResults';
import { useRouter } from 'next/router';

const SearchModal = ({ searchModal, setSearchModal }) => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchIconClicked, setSearchIconClicked] = useState(false);

  const handleSearch = async () => {
    try {
      setSearching(true);

      if (input.trim() !== '') {
        router.push(`/search?key=${encodeURIComponent(input.trim())}`);
        setSearchResults(null);
      }
    } catch (error) {
      console.error('Error handling search:', error);
    } finally {
      setSearching(false);
      setSearchIconClicked(false);
    }
  };

  useEffect(() => {
    if (searchModal && searchIconClicked && !searching) {
      handleSearch();
    }
  }, [searchModal, searching, searchIconClicked]);

  const closeModal = () => {
    setSearchModal(false);
    setInput('');
    setSearchResults(null);
    setSearching(false);
    setSearchIconClicked(false);
  };

  const handlePostSearch = () => {
    setSearchIconClicked(true);
    handleSearch();
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchIconClicked(true);
      handlePostSearch();
    }
  };

  const handleSearchButtonClick = () => {
    setSearchIconClicked(true);
    handlePostSearch();
  };

  return (
    <div className={`search-modal ${searchModal ? 'open' : ''}`}>
      <button onClick={closeModal} className="search-close">
        <IoCloseCircleOutline />
      </button>

      <h2 className="text-lg font-bold mb-0 text-center">
        Search Posts
      </h2>

      <input
        type="text"
        className="form-input bg-body placeholder:text-base dark:bg-darkmode-body mb-0 w-full"
        placeholder="Search for posts..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleInputKeyDown}
      />

      <button onClick={handleSearchButtonClick} className="bg-blue-500 text-white px-4 py-2 rounded h-50 w-full mt-0">
        Search Posts
      </button>

      {searchResults && <SearchResults results={searchResults} />}
    </div>
  );
};

export default SearchModal;
