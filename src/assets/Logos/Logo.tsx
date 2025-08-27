import logo from "@/assets/Logos/digilet-logo-2.svg";
import darkLogo from "@/assets/Logos/digilet.svg";
import { useTheme } from "@/hooks/useTheme";

const Logo = () => {
  const { theme } = useTheme();
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <img
      src={isDark ? darkLogo : logo}
      alt="Digilet Logo"
      className="h-8 md:h-10 my-2 transition-opacity duration-200"
    />
  );
};

export default Logo;
