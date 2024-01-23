import React from 'react';

const ExampleSentences = ({ examples }) => {
  return (
    <div>
      {examples && examples.length > 0 && (
        <>
          <h3 className="text-lg font-bold mb-2">Example Sentences:</h3>
          <ul className="list-disc pl-4">
            {examples.map((example, index) => (
              <li key={index} className="text-gray-800">{example}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ExampleSentences;
