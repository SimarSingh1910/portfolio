import { profile, socialLinks } from './data';

export const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' } as const;

const socialIcon: Record<string, string> = { GitHub: 'github', LinkedIn: 'linkedin', LeetCode: 'leetcode' };

export const socials = [
  ...socialLinks.map((s) => ({ ...s, icon: socialIcon[s.label] ?? 'arrow', external: true })),
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail', external: false },
];
