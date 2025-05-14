import good from '../../assets/good.png';
import exceptional from '../../assets/exceptional.png';
import recommended from '../../assets/recommended.png';
import { ImageProps, Image } from '@chakra-ui/react';

interface Props {
    rating: number
}

const Emoji = ({rating}: Props) => {
    if (rating < 3) return null; // Om betyget är under 3, returneras inget

    const emojiMap : { [key: number]: ImageProps} = {
        3: {src: good, alt: 'good'},
        4: {src: recommended, alt: 'recommended'},
        5: {src: exceptional, alt: 'exceptional'}
    }   
  return (
   <Image {...emojiMap[rating]} boxSize='20px' marginTop={1}/> // Visar rätt emoji beroende på betyg
  )
}

export default Emoji