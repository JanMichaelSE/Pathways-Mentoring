import { Image } from "@chakra-ui/react";
import { useUserStore } from "@/store/user.store";
import ProfileAvatarIcon from "@/assets/profile-avatar.svg";
import AvatarSprite from "@/assets/spriteAvatar.svg";

import styles from "./profile-picture.module.css";

function ProfilePicture({ forProfile, avatar, ...props }) {
  if (forProfile) {
    const pictureData = useUserStore((state) => state.pictureData);
    if (pictureData == "" || pictureData == null) {
      return <Image boxSize="200px" src={ProfileAvatarIcon}></Image>;
    } else {
      return (
        <svg className={styles.imageContainer}>
          <use href={AvatarSprite + "#" + pictureData}></use>
        </svg>
      );
    }
  } else {
    if (avatar == "" || avatar == null) {
      return (
        <div className={styles.container}>
          <Image boxSize="150px" src={ProfileAvatarIcon}></Image>
        </div>
      );
    } else {
      return (
        <div className={styles.container}>
          <svg className={styles.imageAvatarContainer}>
            <use href={AvatarSprite + "#" + avatar}></use>
          </svg>
        </div>
      );
    }
  }
}
export default ProfilePicture;
