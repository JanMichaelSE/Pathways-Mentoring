import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { httpLogout } from "@/api/user.api";
import { useUserStore } from "@/store/user.store";
import { useDevelopmentPlanStore } from "@/store/developmentPlan.store";
import { useAssessmentStore } from "@/store/assessment.store";
import AvatarIcon from "@/assets/Avatars.png";

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

import styles from "./navbar-popover-menu.module.css";

function NavbarPopOverMenu() {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const navigate = useNavigate();
  const role = useUserStore((state) => state.role);
  const resetUser = useUserStore((state) => state.resetUser);
  const resetAssessment = useAssessmentStore((state) => state.resetAssessment);
  const resetDevelopmentPlan = useDevelopmentPlanStore((state) => state.resetDevelopmentPlan);
  const toast = useToast();

  async function onLogout() {
    const logoutResponse = await httpLogout();
    if (logoutResponse.hasError) {
      return toast({
        description: "Could not logout user. Please close session and log back in.",
        status: "error",
        position: "top",
        duration: null,
      });
    }
    onClose();
    resetUser();
    resetAssessment();
    resetDevelopmentPlan();
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
          <img src={AvatarIcon} alt="profile" className={styles.logoLink} onClick={onOpen} />
        </PopoverTrigger>
        <PopoverContent w={90} borderColor={"#0066CC"}>
          <PopoverArrow bg={"blue.600"} />
          <PopoverBody>
            <SimpleGrid columns={1} justifyItems={"center"}>
              <Link
                className={styles.profileHeader}
                to={`/${role.toLowerCase()}/profile`}
                onClick={onClose}
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
export default NavbarPopOverMenu;
