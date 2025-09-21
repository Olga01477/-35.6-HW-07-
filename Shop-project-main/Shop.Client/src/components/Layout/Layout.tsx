import { FunctionComponent, ReactNode } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import "./Layout.css";

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
