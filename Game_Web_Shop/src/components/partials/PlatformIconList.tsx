import { Platform } from "@/types/Game";
import { HStack, Icon } from "@chakra-ui/react";
import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaLinux,
  FaApple,
  FaAndroid,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";
import { IconType } from "react-icons/lib";
interface Props {
  // en lista av plattformar
  platforms: Platform[];
}
const PlatformIconList = ({ platforms }: Props) => {

  // Mappning mellan plattforms slug och respektive ikonkomponent
  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    linux: FaLinux,
    nintendo: SiNintendo,
    android: FaAndroid,
    mac: FaApple,
    ios: MdPhoneIphone,
    web: BsGlobe,
  };
  return (
    <HStack marginY={1}>
      {platforms.map((p) => {
        const IconComponent = iconMap[p.slug];
        return IconComponent ? (
          <Icon 
            key={p.id} 
            as={IconComponent} 
            color='gray.500'
            boxSize={4} 
          />
        ) : null;
      })}
    </HStack>
  );
};

export default PlatformIconList;
