/* eslint-disable no-unused-vars */
import Card from './Card';
import { useState } from 'react';

const Home = () => {
  const [cardWidth, setCardWidth] = useState(500);
  const cardInRow = 5;
  const [wrapperWidth, setWrapperWidth] = useState(cardWidth * cardInRow);

  return (
    <div className="flex justify-center items-center" style={{ width: wrapperWidth }}>
      <div className="flex flex-wrap gap-2">
     
          <Card  cardWidth={cardWidth} />
    
      </div>
    </div>
  );
};

export default Home;
