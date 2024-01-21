


import React, { useEffect, useState } from 'react';

const ImageResult = ({ imageUrl }) => {
 // const [imageUrl, setImageUrl] = useState(searchQuery);

 /* useEffect(() => {
    const fetchImage = async () => {
      // Fetch image based on the searchQuery
      // ...

      // setImageUrl with the fetched image URL
    };

    if (searchQuery) {
      fetchImage();
    }
  }, [searchQuery]);
*/
  return (
    <div className="image-result bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-bold mb-2">Image:</h3>
      {imageUrl ? <img className="max-w-full h-auto" src={imageUrl} alt="Searched Image" /> : <p>No image available</p>}
    </div>
  );
};

export default ImageResult;
