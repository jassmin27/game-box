import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendoswitch } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";
import type { Platform } from "../../types";
import type { JSX } from "react";
import styles from "./PlatformIconList.module.css";

const iconMap: { [key: string]: JSX.Element } = {
  pc: <FaWindows aria-label="PC" />,
  playstation: <FaPlaystation aria-label="PlayStation" />,
  xbox: <FaXbox aria-label="Xbox" />,
  ios: <MdPhoneIphone aria-label="iOS" />,
  android: <FaAndroid aria-label="Android" />,
  mac: <FaApple aria-label="macOS" />,
  linux: <FaLinux aria-label="Linux" />,
  nintendo: <SiNintendoswitch aria-label="Nintendo Switch" />,
  web: <BsGlobe aria-label="Web" />,
};

interface Props {
  platforms: { platform: Platform }[];
}

function PlatformIconList({ platforms }: Props) {
  return (
    <div className={styles["platform-icons-list"]}>
      {platforms.map(({ platform }) => (
        <span className={styles["platform-icon"]} key={platform.id}>
          {iconMap[platform.slug] ?? null}
        </span>
      ))}
    </div>
  );
}

export default PlatformIconList;
