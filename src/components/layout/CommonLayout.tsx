import type { ReactNode } from "react";
import  Footer from "./Footer";
import Navbar from "./Navbar";

interface IProps {
  children: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  return (
    <div className="flex font-Raleway min-h-screen max-w-7xl mx-auto flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
