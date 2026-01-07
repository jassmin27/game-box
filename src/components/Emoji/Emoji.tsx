import meh from "../../assets/meh.webp";
import thumbsUp from "../../assets/thumbs-up.webp";
import bullsEye from "../../assets/bulls-eye.webp";
import styles from "./Emoji.module.css";

interface Props {
  rating: number;
}

interface EmojiProps {
  src: string;
  alt: string;
}

const emojiMap: Record<Props["rating"], EmojiProps> = {
  3: { src: meh, alt: "meh" },
  4: { src: thumbsUp, alt: "recommended" },
  5: { src: bullsEye, alt: "exceptional" },
};

function Emoji({ rating }: Props) {
  return <img className={styles["emoji-img"]} {...emojiMap[rating]} />;
}

export default Emoji;
