import React, { useState, useEffect } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import SearchResults from './searchTrans/SearchResults';
import { useRouter } from 'next/router';
//const translate =require('@iamtraction/google-translate');

const SearchModal = ({ searchModal, setSearchModal }) => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [searchType, setSearchType] = useState('post');
  const [translationDirection, setTranslationDirection] = useState('en-to-sw');
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchIconClicked, setSearchIconClicked] = useState(false);

  const handleSearch = async () => {
    try {
      setSearching(true);

      if (searchType === 'post' && input.trim() !== '') {
        router.push(`/search?key=${encodeURIComponent(input)}`);
        setSearchResults(null);
      } else if (searchType === 'translation') {
        // Use google-translate-api for translation
       // const result = await translate(input, { from: 'sw', to: 'en' });
       const result=""
        const translationResult = {
          translation: `Translation of '${input}' from Swahili to English: ${result.text}`,
          imageUrl: '/images/post/kiswahiliday2.jpg',
          examples: [], // You can add examples if available
        };
        setSearchResults([translationResult]);
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
  }, [searchModal, searchType, translationDirection, searching, searchIconClicked]);

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
        {searchType === 'post' ? 'Search Posts' : 'Translate Text'}
      </h2>

      <div className="mb-2 bg-white rounded overflow-hidden">
        <label className="block text-sm text-gray-600 mb-1">Search Type:</label>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="form-select"
        >
          <option value="post">Search Posts</option>
          <option value="translation">Translate Text</option>
        </select>
      </div>

      {searchType === 'translation' && (
        <div className="mb-4 mt-0 bg-white rounded overflow-hidden">
          <label className="block text-sm text-gray-600 mb-1">Translation Direction:</label>
          <select
            value={translationDirection}
            onChange={(e) => setTranslationDirection(e.target.value)}
            className="form-select"
          >
            <option value="en-to-sw">From English to Swahili</option>
            <option value="sw-to-en">From Swahili to English</option>
          </select>
        </div>
      )}

      <input
        type="text"
        className="form-input bg-body placeholder:text-base dark:bg-darkmode-body mb-0 w-full"
        placeholder={searchType === 'post' ? 'Search for posts...' : 'Enter text to translate...'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleInputKeyDown}
      />

      <button onClick={handleSearchButtonClick} className="bg-blue-500 text-white px-4 py-2 rounded h-50 w-full mt-0">
        {searchType === 'post' ? 'Search Posts' : 'Translate'}
      </button>

      {searchResults && <SearchResults results={searchResults} />}
    </div>
  );
};

export default SearchModal;
