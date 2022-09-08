import { Box, Button, HStack, IconButton, Image , Text} from '@chakra-ui/react'
import React, {useState} from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { topSongs } from '../fakeData'
import Slider from 'react-slick'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const goNext = () => {

}
const goPrev = () => {

}
export default function Home() {
    const [slideRef, setSlideRef] = useState(null)
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        lazyLoad: 'progressive',
        arrows: false,
        nextArrow : goNext()
      };
  return (
    <Box >
        <Box display="flex"  h="56px" alignItems="center" justifyContent="space-between" w="100%">
            <Box display="flex" w={81}  justifyContent="space-between">
         <AiOutlineLeft  size={35}  cursor="pointer"  onClick={slideRef?.slickPrev}/>
         <AiOutlineRight    size={35}      cursor="pointer"  onClick={slideRef?.slickNext}/>
            </Box>
            <Button  color="black">connect wallet</Button>
        </Box>

        <Box h="200" w="99%"  mx="auto" mt={3}>
            <Slider ref={setSlideRef} {...settings}>
            {topSongs.map((song, i) => {

                return(
                    <HStack key={i} >
                    <Image   src={song.cover}  style={{width: "180px", height: "170px", objectFit: "cover", borderRadius: "4px", cursor: "pointer"}} />
                  {/*} <Box w={150} h={170} bgColor="purple.700"></Box>*/}
                  <Box textAlign="center">
                    <Text>{song.creator}</Text>
                    <Text>{song.name}</Text>
                    </Box>
                    </HStack> 
                )
            })}
     </Slider>
            
        </Box>
    </Box>
  )
}
