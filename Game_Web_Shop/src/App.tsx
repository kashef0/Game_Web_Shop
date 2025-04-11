import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/partials/NavBar";
import GameGrid from "./components/partials/GameGrid";

function App() {
  return (
    <>
      <Grid
        templateAreas={{
          base: '"nav" "main"',
          lg: '"nav nav" "aside main"',
        }}
      >
        <GridItem area="nav">
          <NavBar />
        </GridItem>
          <GridItem area="aside" bg="gold" display={{ base: "none", lg: "block" }}>
            aside
          </GridItem>
        
        <GridItem area="main" bg="dodgerblue">
          <GameGrid />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
