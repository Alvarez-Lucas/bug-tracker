import Link from "next/link";
import { UserContext } from "../lib/context";
import navStyles from "../styles/Navbar.module.css";
import { useEffect, useState, useCallback, useContext } from "react";

const Navbar = () => {
  const { user, username } = useContext(UserContext);
  // console.log(`object`, object)
  return (
    <>
      <nav className={navStyles.nav}>
        <ul className={navStyles.navbar}>
          <NavItem link="/dashboard" item="Dashboard" />
          <NavItem link="/about" item="About" />
          <NavItem link="/projects/" item="Projects" />
          <NavItem link={`/profile/${username}`} item="Profile" />
        </ul>
      </nav>
    </>
  );
};

function NavItem(props) {
  return (
    <li className={navStyles.navItem}>
      <Link href={props.link}>{props.item}</Link>
    </li>
  );
}
export default Navbar;
