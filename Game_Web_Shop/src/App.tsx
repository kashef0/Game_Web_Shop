import { Grid, GridItem, HStack } from "@chakra-ui/react";
import "./App.css";
import GameGrid from "./pages/GameGrid";
import GenreList from "./components/partials/GenreList";
import PlatFormSelector from "./components/partials/PlatFormSelector";
import SortSelector from "./components/partials/SortSelector";
import GameHeading from "./components/partials/GameHeading";

function App() {
  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "200px 1fr",
        }}
      >

        <GridItem
          marginTop="2rem"
          area="aside"
          display={{ base: "none", lg: "block" }}
          paddingX={5}
        >
          <GenreList />
        </GridItem>

        <GridItem area="main" marginTop="2rem">
          <GameHeading />
          <HStack gap={5} paddingLeft={2} marginBottom={4}>
            <PlatFormSelector />
            <SortSelector />
          </HStack>
          <GameGrid />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
