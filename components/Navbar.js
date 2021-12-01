import Link from "next/link";
import navStyles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <>
      <nav className={navStyles.nav}>
        <ul className={navStyles.navbar}>
          <NavItem link="/dashboard" item="Dashboard" />
          <NavItem link="/about" item="About" />
          <NavItem link="/projects/" item="Projects" />
          <NavItem link="/profile" item="Profile" />
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
