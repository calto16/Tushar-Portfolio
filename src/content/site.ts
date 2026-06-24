/**
 * Global site config — identity, navigation, and social links.
 * Single source of truth for contact details and external profiles.
 */

export const profile = {
  name: "Tushar Rathod",
  firstName: "Tushar",
  lastName: "Rathod",
  fullName: "Tushar Shrikant Rathod",
  alias: "calto",
  username: "calto16",
  role: "Software Engineer",
  company: "Wayfair",
  roleLine: "Software Engineer @ Wayfair",
  location: "Sangli, India",
  timezone: "IST · UTC+5:30",
  email: "tushar16rathod@gmail.com",
  phone: "+91 9307086522",
  resumeUrl: "/resume.pdf",
  photo: "/tushar.jpg",
  url: "https://tushar-rathod.vercel.app",
  tagline: "I build resilient distributed systems & GenAI data tooling.",
  shell: "tushar@archlinux",
} as const;

export type SocialIcon =
  | "github"
  | "linkedin"
  | "instagram"
  | "leetcode"
  | "codechef"
  | "mail";

export interface Social {
  label: string;
  handle: string;
  href: string;
  icon: SocialIcon;
  /** false for guessed/competitive-programming links the user should verify */
  verified: boolean;
}

export const socials: Social[] = [
  {
    label: "GitHub",
    handle: "@calto16",
    href: "https://github.com/calto16",
    icon: "github",
    verified: true,
  },
  {
    label: "LinkedIn",
    handle: "in/tushar-rathod",
    href: "https://www.linkedin.com/in/tushar-rathod-3b367a229/",
    icon: "linkedin",
    verified: true,
  },
  {
    label: "Instagram",
    handle: "@el_tushar",
    href: "https://instagram.com/el_tushar",
    icon: "instagram",
    verified: true,
  },
  {
    label: "LeetCode",
    handle: "Knight · 2132",
    href: "https://leetcode.com/u/calto16/",
    icon: "leetcode",
    verified: false,
  },
  {
    label: "CodeChef",
    handle: "5★ · 2012",
    href: "https://www.codechef.com/users/calto16",
    icon: "codechef",
    verified: false,
  },
  {
    label: "Email",
    handle: profile.email,
    href: `mailto:${profile.email}`,
    icon: "mail",
    verified: true,
  },
];

export interface NavItem {
  id: string;
  index: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: "hero", index: "00", label: "Home" },
  { id: "about", index: "01", label: "About" },
  { id: "experience", index: "02", label: "Work" },
  { id: "projects", index: "03", label: "Projects" },
  { id: "skills", index: "04", label: "Skills" },
  { id: "achievements", index: "05", label: "Awards" },
  { id: "github", index: "06", label: "Activity" },
  { id: "contact", index: "07", label: "Contact" },
];

export const githubUsername = profile.username;
