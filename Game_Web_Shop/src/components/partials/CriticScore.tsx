import { Badge } from '@chakra-ui/react'


interface Props {
    score: number
}
const CriticScore = ({score} : Props) => {
    const color = score >= 75 ? 'green' : score >= 60 ? 'yellow' : score <= 50 ? 'red' : '';
  return (
    <Badge color={color} fontSize='14px' paddingX={2} borderRadius='2px'>{score}</Badge>
  )
}

export default CriticScore