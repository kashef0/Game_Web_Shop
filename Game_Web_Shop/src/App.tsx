import { Grid, GridItem, HStack, useBreakpointValue } from "@chakra-ui/react";
import "./App.css";
import GameGrid from "./pages/GameGrid";
import GenreList from "./components/partials/GenreList";
import PlatFormSelector from "./components/partials/PlatFormSelector";
import SortSelector from "./components/partials/SortSelector";
import GameHeading from "./components/partials/GameHeading";
import GenreMobileList from "./components/partials/GenreMobileList";

function App() {
  const isMobile = useBreakpointValue({ base: true, md: false });
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
          <HStack gap={5} paddingLeft={2} marginBottom={4} display='flex' flexWrap='wrap'>
            <PlatFormSelector />
            {isMobile && <GenreMobileList />}
            <SortSelector />
          </HStack>
          <GameGrid />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
