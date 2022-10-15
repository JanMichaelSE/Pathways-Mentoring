import {
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Image,
} from "@chakra-ui/react";
import ImageList from "../ImageList/image-list";
import ProfileAvatarIcon from "@/assets/profile-avatar-icon.svg";

function ProfileChangerPopOver({ ...props }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const arrayImgs = [...Array(53).keys()].splice(1, 52);

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        closeOnBlur={true}
        placement="right"
      >
        <div style={{ position: "relative" }}>
          <PopoverTrigger>
            <button
              type="button"
              id="avatarbutton"
              style={{
                width: 58,
                height: 58,
                float: "none",
                background: "none",
                position: "relative",
                top: -75,
                right: -90,
              }}
              onClick={onOpen}
              disabled={props.edit}
            >
              <Image
                borderRadius="full"
                boxSize="62px"
                src={ProfileAvatarIcon}
                alt="Profile Avatar Icon"
                m="auto"
              />
            </button>
          </PopoverTrigger>
          <PopoverContent
            p={5}
            overscroll
            backgroundColor={"var(--color-white)"}
            w={400}
            h={180}
            alignItems="center"
          >
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody
              maxHeight={300}
              overflowY={"scroll"}
              sx={{
                "&::-webkit-scrollbar": {
                  width: "16px",
                  borderRadius: "20px",
                  backgroundColor: `rgba(0, 0, 0, 0.05)`,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: `#0066CC`,
                  borderRadius: "20px",
                  height: "50px",
                },
              }}
            >
              <ImageList images={arrayImgs} />
            </PopoverBody>
          </PopoverContent>
        </div>
      </Popover>
    </>
  );
}
export default ProfileChangerPopOver;
