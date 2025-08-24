import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUserIcon } from "lucide-react";
import { Link } from "react-router";

export default function UserAvatar() {
  return (
    <Link to="/profile">
      <Avatar>
        <AvatarImage src="" alt="Avatar Image" />
        <AvatarFallback>
          <CircleUserIcon size={32} aria-hidden="true" />
        </AvatarFallback>
      </Avatar>
    </Link>
  );
}
