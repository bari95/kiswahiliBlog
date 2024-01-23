

import React from 'react';

const TranslationResult = ({ translation }) => {
  return (
    <div className="translation-result bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-bold mb-2">Translation:</h3>
      <p className="text-gray-800">{translation}</p>
    </div>
  );
};

export default TranslationResult;
