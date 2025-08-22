import Logo from "@/assets/Logos/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router";

const AuthNavbar = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <header className="border-b px-4 py-2">
      <div className="flex container mx-auto h-16 items-center justify-between">
        <div className="flex items-center justify-center gap-6">
          <Link to="/" className="text-primary hover:text-primary/90">
            <Logo />
          </Link>
          <NavigationMenu>
            <NavigationMenuLink
              asChild
              className="text-muted-foreground hover:text-primary py-1.5 font-medium"
            >
              <Link to="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenu>
        </div>

        {/* Right side - Auth button */}
        <div className="flex items-center">
          {isLoginPage && (
            <Link to="/register">
              <Button
                variant="outline"
                className="px-4 py-2 rounded-md text-sm font-medium  transition-colors"
              >
                Register
              </Button>
            </Link>
          )}
          {isRegisterPage && (
            <Link to="/login">
              <Button
                variant="outline"
                className="px-4 py-2 rounded-md text-sm font-medium  transition-colors"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default AuthNavbar;
