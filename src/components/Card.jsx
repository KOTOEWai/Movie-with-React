/* eslint-disable react/prop-types */


const Card = ({ cardWidth, movie }) => {
    const { title,image,genres, originalLanguage,releaseDate,overview } = movie
  return (
    <div
      style={{ width: cardWidth }}
      className="h-[650px] relative flex justify-center items-center shrink-0 p-2 bg-gray-500 group"
    >
      <div className="w-[97%] h-[97%] m-auto text-white absolute rounded-lg bg-black/45 flex flex-col justify-center">
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
      </div>

      <img
        src={image}
        alt=""
        className="absolute w-[97%] h-[97%] object-cover rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
      />
    </div>
  );
};

export default Card;
