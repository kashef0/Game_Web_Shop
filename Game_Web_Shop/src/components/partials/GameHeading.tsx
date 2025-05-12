import { RootState } from '@/store/store';
import { Heading } from '@chakra-ui/react'
import { useSelector } from 'react-redux';


const GameHeading = () => {

     const { platformName, genreName } = useSelector(
        (state: RootState) => state.genre
      );

      const heading = `${platformName || ''} ${genreName || ''} games`
  return (
    <Heading as='h1' paddingX={2} marginY={8} fontSize='5xl'>
        {heading}
    </Heading>
  )
}

export default GameHeading