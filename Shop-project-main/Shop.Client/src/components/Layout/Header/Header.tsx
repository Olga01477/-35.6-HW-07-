import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import "./Header.css";

const Header: FunctionComponent = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="header__logo">
          Shop Project
        </Link>
      </div>
    </header>
  );
};

export default Header;
