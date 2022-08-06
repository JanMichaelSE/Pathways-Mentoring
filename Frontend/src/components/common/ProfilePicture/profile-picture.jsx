import { Image } from "@chakra-ui/react";
import { useUserStore } from "@/store/user.store";

function ProfilePicture({ ...props }) {
  const pictureData = useUserStore((state) => state.pictureData);
  if (pictureData == "Profile-avatar.svg") {
    return (
      <Image
        borderRadius="full"
        boxSize="200px"
        src="/assets/Profile-avatar.svg"
      ></Image>
    );
  } else {
    return (
      <svg>
        <use href={"/assets/spriteAvatar.svg#" + pictureData}></use>
      </svg>
    );
  }
}
export default ProfilePicture;
