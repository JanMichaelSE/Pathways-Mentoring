import { Image } from "@chakra-ui/react";
import { useUserStore } from "@/store/user.store";
import styles from "./profile-picture.module.css";

function ProfilePicture({ ...props }) {
  const pictureData = useUserStore((state) => state.pictureData);
  if (pictureData == "") {
    return <Image boxSize="200px" src="/assets/profile-avatar.svg"></Image>;
  } else {
    return (
      <svg className={styles.imageContainer}>
        <use href={"/assets/spriteAvatar.svg#" + pictureData}></use>
      </svg>
    );
  }
}
export default ProfilePicture;
