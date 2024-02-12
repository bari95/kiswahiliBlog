// TextSlider.js
import React from 'react';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomNextArrow = (props) => (
  <FaArrowRight {...props} className="slick-arrow custom-next-arrow absolute top-1/2 right-0 transform -translate-y-1/2 text-3xl text-white transition duration-300 ease-in-out hover:bg-blue-500" />
);

const CustomPrevArrow = (props) => (
  <FaArrowLeft {...props} className="slick-arrow custom-prev-arrow absolute top-1/2 left-0 transform -translate-y-1/2 text-3xl text-white transition duration-300 ease-in-out hover:bg-blue-500" />
);

const TextSlider = ({ wordOfTheDayArray }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="w-4/5 mx-auto relative">
      <Slider {...settings} className="rounded overflow-hidden">
        {wordOfTheDayArray.map((wordObject, index) => (
          <div key={index} className="text-center p-8 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-md">
            <h1>{wordObject.word}</h1>
            <p className='text-lg'>{wordObject.meaning}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TextSlider;
