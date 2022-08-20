import styles from "./profile-popover-navbar.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { httpLogout } from "@/api/user.api";
import { useUserStore } from "@/store/user.store";
import {
  useDisclosure,
  useToast,
  SimpleGrid,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";

function ProfilePopover() {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const navigate = useNavigate();
  const role = useUserStore((state) => state.role);
  const resetUser = useUserStore((state) => state.resetUser);
  const toast = useToast();

  async function onLogout() {
    const logoutResponse = await httpLogout();
    if (logoutResponse.hasError) {
      return toast({
        description:
          "Could not logout user. Please close session and log back in.",
        status: "error",
        position: "top",
        duration: null,
      });
    }
    onClose();
    resetUser();
    navigate("/", { replace: true });
  }

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        closeOnBlur={true}
        placement={"bottom"}
      >
        <PopoverTrigger>
          <img
            src="/assets/Avatars.png"
            alt="profile"
            className={styles.logoLink}
            onClick={onOpen}
          />
        </PopoverTrigger>
        <PopoverContent w={90} borderColor={"#0066CC"}>
          <PopoverArrow bg={"blue.600"} />
          <PopoverBody>
            <SimpleGrid columns={1} justifyItems={"center"}>
              <Link
                className={styles.profileHeader}
                to={`/${role.toLowerCase()}/profile`}
              >
                Profile
              </Link>
              <Divider
                orientation="horizontal"
                borderColor={"#0066CC"}
                borderWidth={"1px"}
                mt={"5px"}
                mb={"5px"}
              />
              <div>
                <h1 className={styles.logoutHeader} onClick={onLogout}>
                  Log Out
                </h1>
              </div>
            </SimpleGrid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
export default ProfilePopover;
