import styles from "./forgotpwd-lojin-popup.module.css";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@/components/common/Button/button";
import Input from "@/components/common/Input/input";
import mailIcon from "@/assets/mail-icon.svg";
import {
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  useMediaQuery,
  HStack,
  useToast,
} from "@chakra-ui/react";

function ForgotPwdLoginPopup() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const [isLessThan1135] = useMediaQuery("(max-width: 1135px)");

  async function handleEmailSubmit(studentInfo) {
    const userResponse = await httpLogin(studentInfo);

    if (userResponse.hasError) {
      return toast({
        description: userResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    setUser(userResponse.data.email, userResponse.data.role);
    setTokens(userResponse.data.accessToken, userResponse.data.refreshToken);
  }
  function inputWidth() {
    return isLessThan1135 ? "22rem" : "25rem";
  }

  return (
    <>
      <button className={styles.linkButton} onClick={onOpen}>
        Forgot password?
      </button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent
          borderRadius={"60px"}
          borderWidth={"2px"}
          borderStyle={"dashed"}
          borderColor={"#0066CC"}
        >
          <ModalHeader>
            <HStack alignItems={"center"} spacing="100px">
              <Image
                boxSize="40px"
                objectFit="cover"
                src="/assets/back.svg"
                alt="back.svg"
                onClick={onClose}
                cursor="pointer"
              />
              <h1 style={{ fontWeight: 600, fontSize: "36px" }}>
                Forgot Password
              </h1>
            </HStack>
            <h1 style={{ textAlign: "center" }}>
              Enter an email address you use to sign in to.
            </h1>
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Email is required"),
              })}
              onSubmit={async (values) => {
                await handleEmailSubmit(value);
              }}
            >
              <Form>
                <div className={styles.inputContainer}>
                  <Input
                    name="email"
                    type="text"
                    placeholder="Email"
                    imgUrl={mailIcon}
                    width={inputWidth()}
                  />
                </div>
                <div className={styles.buttonContainer}>
                  <Button style={{ width: "12rem" }} type="submit">
                    Send
                  </Button>
                </div>
              </Form>
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ForgotPwdLoginPopup;
