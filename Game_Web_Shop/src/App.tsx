import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <>
      <Grid
        templateAreas={{
          base: '"nav" "main"',
          lg: '"nav nav" "aside main"',
        }}
      >
        <GridItem area="nav" bg="coral">
          Nav
        </GridItem>
          <GridItem area="aside" bg="gold" display={{ base: "none", lg: "block" }}>
            aside
          </GridItem>
        
        <GridItem area="main" bg="dodgerblue">
          main
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
