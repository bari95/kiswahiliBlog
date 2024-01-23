

import React from 'react';
import TranslationResult from './TranslationResult';
import ImageResult from './ImageResult';
import ExampleSentences from './ExampleSentences';

const SearchResults = ({results}) => {
  console.log(results)
  results=results[0]
  return (
    <div className="search-results bg-white mt-0 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <TranslationResult translation={results.translation} />
      <ImageResult imageUrl={results.imageUrl} />
      <ExampleSentences examples={results.examples} />
    </div>
  );
};

export default SearchResults;
