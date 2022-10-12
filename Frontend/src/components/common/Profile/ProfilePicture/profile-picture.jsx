import { Image } from "@chakra-ui/react";
import { useUserStore } from "@/store/user.store";
import styles from "./profile-picture.module.css";

function ProfilePicture({ forProfile, avatar, ...props }) {
  if (forProfile) {
    const pictureData = useUserStore((state) => state.pictureData);
    if (pictureData == "" || pictureData == null) {
      return <Image boxSize="200px" src="/assets/profile-avatar.svg"></Image>;
    } else {
      return (
        <svg className={styles.imageContainer}>
          <use href={"/assets/spriteAvatar.svg#" + pictureData}></use>
        </svg>
      );
    }
  } else {
    if (avatar == "" || avatar == null) {
      return (
        <div className={styles.container}>
          <Image boxSize="150px" src="/assets/profile-avatar.svg"></Image>
        </div>
      );
    } else {
      return (
        <div className={styles.container}>
          <svg className={styles.imageAvatarContainer}>
            <use href={"/assets/spriteAvatar.svg#" + avatar}></use>
          </svg>
        </div>
      );
    }
  }
}
export default ProfilePicture;
