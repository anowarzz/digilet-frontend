import userImage from "@/assets/images/user.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUserIcon } from "lucide-react";
import { Link } from "react-router";

export default function UserAvatar({ role }: { role?: string }) {
  const profilePath = `/${role ? role.toLowerCase() : "user"}/profile`;
  return (
    <Link to={profilePath} aria-label="User Profile" title="Profile">
      <Avatar>
        <AvatarImage src={userImage} alt="Avatar Image" className="dark:bg-emerald-500 "/>
        <AvatarFallback>
          <CircleUserIcon
            size={32}
            aria-hidden="true"
            className="border-2 text-neutral-800 dark:text-white"
          />
        </AvatarFallback>
      </Avatar>
    </Link>
  );
}
