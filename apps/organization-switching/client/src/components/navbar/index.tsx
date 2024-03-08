import { useEffect, useRef } from "react";
import { SlashIDLogo } from "../slash-id-logo";
import { LoggedIn } from "@slashid/react";
import { UserDropdown } from "./user-dropdown";
import { navbar, pinnedNavbar } from "./style.css";

export default function Navbar() {
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const navbarElement = navbarRef.current!;

    // this toggles a class when scrolling
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle(pinnedNavbar, e.intersectionRatio < 1),
      { threshold: [1] }
    );

    observer.observe(navbarElement);

    return () => observer.unobserve(navbarElement);
  }, []);

  return (
    <nav className={navbar} ref={navbarRef}>
      <SlashIDLogo />
      <LoggedIn>
        <UserDropdown />
      </LoggedIn>
    </nav>
  );
}
