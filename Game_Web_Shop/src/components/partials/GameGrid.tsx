import useGet from '@/hooks/useGet';
import { FetchGameRes, Game } from '@/types/Game';

import { useEffect, useState } from 'react'

const GameGrid = () => {

    const [game, setGame] = useState<Game[]>([]);
   
    const { data: dataGames, error: gameError, loading: gameLoading } = useGet<FetchGameRes>('https://api.rawg.io/api/games?key=50751b6830054f0db8a5d86353d357d4', false);
    console.log(dataGames)
    useEffect(() => {
        if (dataGames?.results) {
            setGame(dataGames.results);
          }
    }, [dataGames])

    const renderError = gameError && !dataGames;

  return (
    <div>
    {gameLoading && <p>Loading...</p>}
    {renderError && <p>Error: {gameError}</p>}
    <ul>
      {game.map((g) => (
        <li key={g.id}>{g.name}</li>
      ))}
    </ul>
  </div>
  )
}

export default GameGrid