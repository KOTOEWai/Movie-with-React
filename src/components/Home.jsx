/* eslint-disable no-unused-vars */
import Card from './Card';
import { useEffect, useState } from 'react';

const Home = () => {
  const [cardWidth, setCardWidth] = useState(500);
  const cardInRow = 5;
  const [wrapperWidth, setWrapperWidth] = useState(cardWidth * cardInRow);
  const [movie,setMovie] =  useState([]); 


  useEffect(()=>{
    const getMovies = async ()=>{
    const url = 'https://tvshow.p.rapidapi.com/Movie/NowPlaying?Page=1&Language=en-US&Adult=true';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '4819665f40mshe7da74133a619b3p1b2ed4jsna184141d59eb',
		'x-rapidapi-host': 'tvshow.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	setMovie(result)
} catch (error) {
	console.error(error);
}
}
getMovies()
  },[])

  return (
    <div className="flex justify-center items-center" style={{ width: wrapperWidth }}>
      <div className="flex flex-wrap gap-2">
     {movie.map((movie, i)=>(
        <div key={i}>
          <Card movie={movie}  cardWidth={cardWidth} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
