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
  pc: <FaWindows />,
  playstation: <FaPlaystation />,
  xbox: <FaXbox />,
  ios: <MdPhoneIphone />,
  android: <FaAndroid />,
  mac: <FaApple />,
  linux: <FaLinux />,
  nintendo: <SiNintendoswitch />,
  web: <BsGlobe />,
};

interface Props {
  platforms: { platform: Platform }[];
}

function PlatformIconList({ platforms }: Props) {
  return (
    <div className={styles["platform-icons-list"]}>
      {platforms.map(({platform}) => (
        <span className={styles["platform-icon"]} key={platform.id}>
          {iconMap[platform.slug] ?? null}
        </span>
      ))}
    </div>
  );
}

export default PlatformIconList;
