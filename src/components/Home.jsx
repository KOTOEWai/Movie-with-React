/* eslint-disable no-unused-vars */
import Card from './Card';
import Navigation from './Navigation';
import { useEffect, useState } from 'react';

const Home = () => {
  const [cardWidth, setCardWidth] = useState(500);
  const cardInRow = 5;
  const [wrapperWidth, setWrapperWidth] = useState(cardWidth * cardInRow);
  const [movie,setMovie] =  useState([]); 
  const [page,setPage] = useState(1)
  const [group, setGroup] = useState('Popular')

useEffect(() => {
  const getMovies = async () => {
    const url = `https://tvshow.p.rapidapi.com/Movie/${group}?page=${page}&language=en-US&adult=true`;
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
      // Adjust based on actual API response structure
        setMovie(result)
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    
  };
  getMovies();
}, [page, group]);


  return (
    <>
    <Navigation page={page} setGroup={setGroup} setPage={setPage} />
    <div className="flex justify-center items-center" style={{ width: wrapperWidth }}>
      <div className="flex flex-wrap gap-2">
     {movie.map((movie, i)=>(
        <div key={i}>
          <Card movie={movie}  cardWidth={cardWidth} />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Home;
