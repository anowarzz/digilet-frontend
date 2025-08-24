import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUserIcon } from "lucide-react";
import userImage from "@/assets/images/user.png"
import { Link } from "react-router";

export default function UserAvatar() {
  return (
    <Link to="/user/profile">
      <Avatar>
        <AvatarImage src={userImage} alt="Avatar Image" />
        <AvatarFallback>
          <CircleUserIcon size={32} aria-hidden="true" />
        </AvatarFallback>
      </Avatar>
    </Link>
  );
}
