export interface NavbarProps {
  title: string;
  links: { name: string; url: string }[];
  onLinkClick?: (name: string) => void;
}
