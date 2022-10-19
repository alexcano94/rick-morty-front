/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";
import styles from "./styles.module.css";
const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={styles.navbar}>
      <div>
        <h4>
          <Link style={{ textDecoration: "none", color: "black" }} to={`/`}>
            The Rick and Morty Character Library
          </Link>
        </h4>
      </div>
      {user && (
        <div className={styles.dropdown}>
          <p className={styles.dropbtn}>Hi: {user?.username}!</p>
          <div className={styles.dropdownContent}>
            <a href="#" onClick={() => handleLogout()}>
              Logout
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
