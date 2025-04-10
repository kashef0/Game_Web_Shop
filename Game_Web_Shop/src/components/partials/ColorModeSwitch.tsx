import { HStack, Switch, Text } from "@chakra-ui/react"
import { useColorMode } from "../ui/color-mode"

const ColorModeSwitch = () => {
    const { toggleColorMode, colorMode } = useColorMode()
  return (
    <HStack>
      <Switch.Root colorPalette='teal' checked={colorMode === 'dark'} onChange={toggleColorMode}>
      <Switch.HiddenInput />
            <Switch.Control />
            <Switch.Label />
      </Switch.Root>
      <Text>{colorMode === "light" ? 'Light Mode' : 'Dark Mode'}</Text>
    </HStack>
  )
}

export default ColorModeSwitch