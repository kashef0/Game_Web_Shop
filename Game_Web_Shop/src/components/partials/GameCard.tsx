

import { Games } from "@/types/Game"
import { Button, Card, Image } from "@chakra-ui/react"


interface Props {
    game: Games
}

const GameCard = ({ game }: Props) => {
  return (
    <Card.Root maxW="sm" borderRadius={10} overflow="hidden">
        <Image src={game.background_image} height="200px" all={game.name}/>
        <Card.Body gap={2}>
            <Card.Title>
                {game.name}
            </Card.Title>
        </Card.Body>
        <Card.Footer gap="2">
        <Button variant="solid">Buy now</Button>
        <Button variant="ghost">Add to cart</Button>
      </Card.Footer>
    </Card.Root>
  )
}

export default GameCard