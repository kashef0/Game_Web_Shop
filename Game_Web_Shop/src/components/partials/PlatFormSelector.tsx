
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, Menu, Portal, Spinner, Flex, Button } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

import {
  platformsReceived,
  selectedPlatformId,
  platformsError,
  setPlatformName,
} from "../../store/Slices/genreSlice";
import { RootState } from "@/store/store";

// Importerar statisk plattformsdata
import platformes from "../../data/platformes";

const PlatFormSelector = () => {
  const dispatch = useDispatch();
  const { platform } = useSelector((state: RootState) => state.genre);

  const [retryCount, setRetryCount] = useState(0);
  const [dots, setDots] = useState(".");
  const [selectedPlatformName, setSelectedPlatformName] = useState("-- All Platforms --");
  const [loadingPlatforms, setLoadingPlatforms] = useState(true);

  const maxRetries = 3;

  useEffect(() => {
    if (platformes?.length) {
      // Om data finns i den statiska listan, spara till Redux och stäng laddningen
      dispatch(platformsReceived(platformes));
      setLoadingPlatforms(false);
    } else if (retryCount < maxRetries) {
      const retryTimeout = setTimeout(() => {
        setDots((prev) => (prev.length >= 4 ? "." : prev + "."));
        setRetryCount((prev) => prev + 1);
      }, 1500);

      return () => clearTimeout(retryTimeout);
    } else {
      dispatch(platformsError("Failed to load platforms after retries."));
      setLoadingPlatforms(false);
    }
  }, [retryCount, dispatch]);

  // Funktion som hanterar användarens klick på en plattform i menyn
  const handlePlatformClick = (id: number) => {
    dispatch(selectedPlatformId(id));
  
    const selected = platform.find((p) => p.id === id);
    const name = selected?.name || "-- All Platforms --";
  
    setSelectedPlatformName(name);
    dispatch(setPlatformName(id === 0 ? "" : name));
  };
  

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm" p=".75rem" rounded={4}>
          <Flex align="center" gap={1}>
            {selectedPlatformName}
            <BsChevronDown />
          </Flex>
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {loadingPlatforms ? (
              <Flex align="center" gap={2} p={2}>
                <Spinner size="sm" />
                <Text fontSize="sm">Loading{dots}</Text>
              </Flex>
            ) : platform.length ? (
              platform.map((result) => (
                <Menu.Item
                  key={result.id}
                  value={result.name}
                  onClick={() => handlePlatformClick(result.id)}
                  p=".75rem"
                  cursor="pointer"
                >
                  {result.id > 0 ? result.name : "-- All Platforms --"}
                </Menu.Item>
              ))
            ) : (
              <Text color="red.500" fontSize="sm" p={2}>
                Failed to load platforms.
              </Text>
            )}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default PlatFormSelector;
