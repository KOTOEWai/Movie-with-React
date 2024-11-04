import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from 'react-icons/io'
import { motion } from 'framer-motion'
// eslint-disable-next-line react/prop-types
const Navigation = ({page,setGroup,setPage}) => {
  return (
    <div className='relative z-10'>
        <div className=' bottom-5 fixed left-5 flex items-center gap-x-2 text-2xl bg-yellow-200 rounded-full px-2'>
      <motion.span
      initial={{scale: 1}}
      whileHover={{scale: 1.5}}

      onClick={()=> page !=1 && setPage((page)=>page-1)} className='cursor-pointer'>
        <IoMdArrowDropleftCircle/>
      </motion.span>
      <p>{page}</p>
      <motion.span
      initial={{scale: 1}}
      whileHover={{scale: 1.5}}
 onClick={()=>setPage((page)=>page+1)} className='cursor-pointer'>
          <IoMdArrowDroprightCircle/>
      </motion.span>
      </div>

<select
  className="fixed top-5 left-5 bg-red-300/90 tracking-wide text-gray-700 uppercase rounded-md outline-none cursor-pointer hover:bg-gray-200"
 defaultValue={'Popular'}
 onChange={(e) =>{ setGroup(e.target.value)
    setPage(1)
 }}
>
  <option value="TopRated">Top Rated</option>
  <option value="Popular">Popular</option>
  <option value="UpComing">Upcoming</option>
  <option value="Discover">Discover</option>
</select>

    </div>
  )
}

export default Navigation
