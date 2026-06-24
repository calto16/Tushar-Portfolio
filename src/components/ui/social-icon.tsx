import { FiGithub, FiLinkedin, FiInstagram, FiMail } from "react-icons/fi";
import { SiLeetcode, SiCodechef } from "react-icons/si";
import type { SocialIcon as SocialIconName } from "@/content/site";
import type { IconType } from "react-icons";

const MAP: Record<SocialIconName, IconType> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  instagram: FiInstagram,
  leetcode: SiLeetcode,
  codechef: SiCodechef,
  mail: FiMail,
};

export function SocialIcon({
  name,
  size = 18,
  className,
}: {
  name: SocialIconName;
  size?: number;
  className?: string;
}) {
  const Icon = MAP[name];
  return <Icon size={size} className={className} />;
}
