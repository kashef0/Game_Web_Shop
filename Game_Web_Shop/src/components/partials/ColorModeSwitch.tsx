import { HStack, Switch, Text, IconButton, useMediaQuery } from "@chakra-ui/react"
import { useColorMode } from "../ui/color-mode"
import { LuMoon, LuSun } from "react-icons/lu"

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();  // hämtar funktion för att växla färgtema och nuvarande tema 
  const [isMobile] = useMediaQuery(["(max-width: 500px)"]); // kontrollera om skärmens bredd är mindre än eller lika med 500px 


  if (isMobile) {
    return (
      <IconButton
        onClick={toggleColorMode}
        variant="outline"
        size="sm"
        aria-label="Toggle color mode"
      >{colorMode === "light" ? <LuSun /> : <LuMoon />}</IconButton>
    )
  }

  return (
    <HStack>
      <Switch.Root
        colorPalette="teal"
        checked={colorMode === "dark"}
        onChange={toggleColorMode}
      >
        <Switch.HiddenInput />
        <Switch.Control />
        <Switch.Label />
      </Switch.Root>
      <Text whiteSpace="nowrap">
        {colorMode === "light" ? "Light Mode" : "Dark Mode"}
      </Text>
    </HStack>
  )
}

export default ColorModeSwitch
