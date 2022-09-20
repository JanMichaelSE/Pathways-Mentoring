import { SimpleGrid, Box } from "@chakra-ui/react";
import styles from "./image-list.module.css";
import { useUserStore } from "@/store/user.store";
const ImageList = (props) => {
  const setPictureData = useUserStore((state) => state.setPictureData);

  function clickImage(event) {
    console.log(event.target.id);
    setPictureData(event.target.id);
  }
  const images = props.images.map((image) => {
    return (
      <Box
        key={image}
        id={"avatar" + image}
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
        }}
      >
        <svg
          key={image}
          id={"avatar" + image}
          className={styles.icon}
          onClick={clickImage}
        >
          <use
            key={image}
            id={"avatar" + image}
            href={"/assets/spriteAvatar.svg#avatar" + image}
          ></use>
        </svg>
      </Box>
    );
  });

  return (
    <div className={styles.avatarContainerModal}>
      <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
        {images}
      </SimpleGrid>
    </div>
  );
};
export default ImageList;
