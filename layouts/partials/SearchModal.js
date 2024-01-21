// Import necessary components
import React, { useState, useEffect } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import SearchResults from './search/SearchResults';
import { useRouter } from 'next/router';

const SearchModal = ({ searchModal, setSearchModal }) => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [searchType, setSearchType] = useState('post');
  const [translationDirection, setTranslationDirection] = useState('en-to-sw'); // Default translation direction
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        // Simulate API request delay
       // await new Promise((resolve) => setTimeout(resolve, 1000));

        if (searchType === 'post') {
          // Handle post search logic


        //  const postSearchResults = []; // Replace with actual post search logic
        //  setSearchResults(postSearchResults);

          const postSearchResults = [



            // Replace with actual post search logic
            { title: 'Post 1', content: 'This is the content of Post 1' },
            { title: 'Post 2', content: 'This is the content of Post 2' },
          ];
          setSearchResults(postSearchResults);
        } else if (searchType === 'translation') {
          // Handle translation search logic
         /* const translationResult = `Translation of '${input}' ${
            translationDirection === 'en-to-sw' ? 'from English to Swahili' : 'from Swahili to English'
          }`;
          setSearchResults([{ translation: translationResult }]); // Use an array for consistency */

          const translationResult = {
            translation: `Translation of '${input}' ${
              translationDirection === 'en-to-sw' ? 'from English to Swahili' : 'from Swahili to English'
            }`,
            imageUrl: '/images/post/kiswahiliday2.jpg', // Replace with an actual image URL
            examples: ['Example sentence 1', 'Example sentence 2'], // Replace with actual example sentences
          };
          setSearchResults(translationResult); // Use an array for consistency
        }
      } catch (error) {
        console.error('Error handling search:', error);
      }
    };

    if (searchModal && input.trim() !== '') {
      handleSearch();
    } else {
      setSearchResults(null);
    }
  }, [searchModal, input, searchType, translationDirection]);

  const closeModal = () => {
    setSearchModal(false);
    setInput('');
    setSearchResults(null);
  };

  return (
    <div className={`search-modal ${searchModal ? 'open' : ''}`}>
      <button onClick={closeModal} className="search-close">
        <IoCloseCircleOutline />
      </button>

      {/* Dropdown for choosing search type */}
      <div className="mb-4">
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

      {/* Dropdown for translation direction */}
      {searchType === 'translation' && (
        <div className="mb-4 mt-0">
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
        className="form-input bg-body placeholder:text-base dark:bg-darkmode-body mb-4"
        placeholder={searchType === 'post' ? 'Search for posts...' : 'Enter text to translate...'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {searchResults && <SearchResults results={searchResults} />}
    </div>
  );
};

export default SearchModal;
