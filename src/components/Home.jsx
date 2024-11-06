import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Card from './Card';
import Navigation from './Navigation';
import { useEffect, useRef, useState } from 'react';

const Home = () => {
  const [cardWidth, setCardWidth] = useState(700);
  const [cardInRow, setCardInRow] = useState(5);
  const [wrapperWidth, setWrapperWidth] = useState(cardWidth * cardInRow);
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [group, setGroup] = useState('Popular');
  const [mousePos, setMousePos] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isloading,setIsloading] = useState(false)
  const cardsRef = useRef(null);
  const abortController = useRef(null)
  // Function to handle responsive layout based on window width
  const updateResponsiveLayout = () => {
    const width = window.innerWidth;
    setWindowWidth(width);

    if (width >= 1200) {
      setCardWidth(700);
      setCardInRow(5);
    } else if (width >= 992) {
      setCardWidth(500);
      setCardInRow(4);
    } else if (width >= 768) {
      setCardWidth(400);
      setCardInRow(3);
    } else {
      setCardWidth(300);
      setCardInRow(2);
    }
  };

  // Update wrapper width whenever card width or card in row changes
  useEffect(() => {
    setWrapperWidth(cardWidth * cardInRow);
  }, [cardWidth, cardInRow]);

  useEffect(() => {
    updateResponsiveLayout();
    window.addEventListener('resize', updateResponsiveLayout);
    return () => {
      window.removeEventListener('resize', updateResponsiveLayout);
    };
  }, []);

  const getMousePositions = (e, referenceElement) => {
    const positions = {
      x: e.clientX,
      y: e.clientY,
    };
    const offset = {
      left: positions.x,
      top: positions.y,
      width: referenceElement.clientWidth,
      height: referenceElement.clientHeight,
    };
    setMousePos(offset);
    console.log(mousePos)
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  x.set(mousePos.left);
  y.set(mousePos.top);

  const xSpring = useSpring(x,{ stiffness:10 , damping: 10  })
  const ySpring = useSpring(y,{ stiffness:10 , damping: 10  })

  const translateX = useTransform(xSpring, [0, windowWidth], [0, -mousePos.width + windowWidth]);
  const translateY = useTransform(ySpring, [0, windowHeight], [0, -mousePos.height + windowHeight]);

  useEffect(() => {
    const getMovies = async () => {
      abortController.current != null && abortController.current.abort()
      abortController.current = new AbortController();
      setIsloading(true);
      const url = `https://tvshow.p.rapidapi.com/Movie/${group}?page=${page}&language=en-US&adult=true`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '4819665f40mshe7da74133a619b3p1b2ed4jsna184141d59eb',
          'x-rapidapi-host': 'tvshow.p.rapidapi.com',
        },
        signal: abortController.current !=null  && abortController.current.signal
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setMovie(result);
      } catch (error) {
        if(error.name === "AbortError") {
          console.log("Fetch aborted due to cancellation");
          return;
        }
        console.error('Error fetching data:', error);
      }finally{
        setIsloading(false);
      }
    };
    getMovies();
  }, [page, group]);

  return (
    <>
      <Navigation page={page} setGroup={setGroup} setPage={setPage} />
      { isloading ? (
<div className='h-screen w-screen flex items-center justify-center'>
<div aria-label="Loading..." role="status" className="flex items-center space-x-2">
<svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
    <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
    <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round"
        strokeWidth="24"></line>
    <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
    </line>
    <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
        strokeWidth="24"></line>
    <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
    </line>
    <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
        strokeWidth="24"></line>
    <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
    <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
    </line>
</svg>
<span className="text-4xl font-medium text-gray-500">Loading...</span>
</div>
</div>
      ) : (
      <motion.div
        className="flex justify-center items-center fixed top-0 left-0 overflow-hidden"
        style={{ width: wrapperWidth, translateX, translateY }}
        ref={cardsRef}
        onMouseMove={(e) => getMousePositions(e, cardsRef.current)}
      >
        <div className="flex flex-wrap ">
          {movie.map((movie, i) => (
            <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 0.5, delay: i * 0.05 }}

             key={i}>
              <Card movie={movie} cardWidth={cardWidth} />
            </motion.div>
          ))}
        </div>
      </motion.div>
       )}
    </>
  );
};

export default Home;
