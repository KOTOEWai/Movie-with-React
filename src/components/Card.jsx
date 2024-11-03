/* eslint-disable react/prop-types */
import photo from '../assets/dead.jpg';

const Card = ({ cardWidth }) => {
  return (
    <div
      style={{ width: cardWidth }}
      className="h-[650px] relative flex justify-center items-center shrink-0 p-2 bg-gray-500 group"
    >
      <div className="w-[97%] h-[97%] m-auto text-white absolute rounded-lg bg-black/45 flex flex-col justify-center">
        <h1 className="text-4xl">Deadpool</h1>

        <div className="flex gap-x-2 items-center">
          <span className="text-lg">Genres:</span>
          <span className="font-semibold text-red-500">Crime Drama</span>
        </div>

        <span className="flex gap-x-2">
          Original Language: <span>English</span>
        </span>
        <span className="flex gap-x-2">
          Release Date: <span>2021-04-20</span>
        </span>
        <p className="flex flex-col gap-y-1">
          <span className="text-red-500">Summary:</span>
          <span className="first-letter:pl-3">Summary text</span>
        </p>
      </div>

      <img
        src={photo}
        alt=""
        className="absolute w-[97%] h-[97%] object-cover rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
      />
    </div>
  );
};

export default Card;
