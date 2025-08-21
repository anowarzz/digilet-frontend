import type { ReactNode } from "react";
import Navbar from "./Navbar";


interface IProps {
  children: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default CommonLayout;
