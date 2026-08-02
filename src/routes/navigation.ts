export interface NavLink {
  href: string
  label: string
}

export const navLinks: readonly NavLink[] = [
  { href: "/home", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/departments", label: "Departments" },
  { href: "/projects", label: "Projects" },
  { href: "/activities", label: "Activities" },
  { href: "/e-commerce", label: "E-Commerce" },
]

export const socialLinks = [
  { label: "Our Team", href: "/our-team" },
  { label: "Contact", href: "/contact" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
] as const
