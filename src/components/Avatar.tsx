import userImage from "@/assets/images/user.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUserIcon } from "lucide-react";
import { Link } from "react-router";

export default function UserAvatar({ role }: { role?: string }) {
  const profilePath = `/${role ? role.toLowerCase() : "user"}/profile`;
  return (
    <Link to={profilePath}>
      <Avatar>
        <AvatarImage src={userImage} alt="Avatar Image" />
        <AvatarFallback>
          <CircleUserIcon size={32} aria-hidden="true" />
        </AvatarFallback>
      </Avatar>
    </Link>
  );
}
