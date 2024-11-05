/* eslint-disable react/prop-types */

import { useState } from "react";
import { motion } from 'framer-motion';
const Card = ({ cardWidth, movie }) => {
  const {
    title = "No Title",
    genres = [],
    originalLanguage = "Unknown",
    releaseDate = "Unknown",
    overview = "No summary available",
    image = "defaultImageURL.jpg", // Replace with default if undefined
  } = movie
  
    const [ showDesc,setShowDesc ] = useState(false)
  return (
    <div
    style={{ width: cardWidth }}
      className="h-[450px] relative flex justify-center items-center shrink-0 p-2 group"
    >
      <motion.div 
       initial={{ opacity: 0 }}
       animate={{ opacity: showDesc ? 1 :0}}
       transition={{ duration: 0.5 }}
       onClick={() => setShowDesc(!showDesc)}
      className="w-[97%] h-[97%] m-auto text-white absolute rounded-lg bg-black/45 flex flex-col justify-center backdrop-blur-2xl">
        <h1 className="text-4xl">{title}</h1>

        <div className="flex gap-x-2 items-center">
            {genres.map((genres,i)=>(
                  <span key={i} className="text-lg font-semibold">{genres}</span>
            ))}
            
        </div>

        <span className="flex gap-x-2">
          Original Language: <span>{originalLanguage}</span>
        </span>
        <span className="flex gap-x-2">
          Release Date: <span>{releaseDate}</span>
        </span>
        <p className="flex flex-col gap-y-1">
          <span className="text-red-500">Summary:</span>
          <span className="first-letter:pl-3">{overview}</span>
        </p>
      </motion.div>

      <img
        src={image}
        alt="Movie image"
        className="absolute w-[97%] h-[97%] object-cover rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 -z-10"
      />
    </div>
  );
};

export default Card;
