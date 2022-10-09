import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Spinner, useToast } from "@chakra-ui/react";

import { httpGetAdminProfile, httpUpdateAdminProfile } from "@/api/admin.api";
import { useUserStore } from "@/store/user.store";

import Button from "@/components/common/Button/button";
import Input from "@/components/common/Input/input";
import styles from "./admin-profile-form.module.css";
import { useMediaQuery } from "@chakra-ui/react";

function AdminProfileForm() {
  const toast = useToast();
  const userId = useUserStore((state) => state.userId);
  const setEmail = useUserStore((state) => state.setEmail);
  const [userData, setUserData] = useState({});
  const [edit, setEdit] = useState(true);
  const [close, setClose] = useState("Edit");

  const [isLoading, setIsLoading] = useState(false);

  const [isLessThan950] = useMediaQuery("(max-width: 950px)");
  const [isLessThan1135] = useMediaQuery("(max-width: 1135px)");
  const [isLessThan1420] = useMediaQuery("(max-width: 1420px)");

  useEffect(() => {
    async function loadAdminProfileInfo() {
      const adminInfo = await httpGetAdminProfile();

      if (adminInfo.hasError) {
        return toast({
          description: adminInfo.errorMessage,
          status: "error",
          position: "top",
          duration: 5000,
        });
      }
      setUserData(adminInfo.data);
      setIsLoading(false);
    }
    loadAdminProfileInfo();
  }, []);

  function onEdit() {
    setEdit((prev) => !prev);
    if (edit == false) {
      setClose("Edit");
    } else if (edit == true) {
      setClose("X");
    }
  }

  async function handleSubmit(adminInfo) {
    const userResponse = await httpUpdateAdminProfile(adminInfo);
    if (userResponse.hasError) {
      return toast({
        description: userResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    setEmail(userResponse.data.email);
    onEdit();
    return toast({
      title: "Update Success!",
      description: "The changes were made.",
      status: "success",
      position: "top",
      duration: 7000,
    });
  }

  function inputWidth() {
    if (isLessThan950) {
      return "20rem";
    } else {
      if (isLessThan1135) {
        return "14rem";
      } else if (isLessThan1420) {
        return "20rem";
      } else {
        return "26rem";
      }
    }
  }

  if (isLoading) {
    return (
      <Spinner
        thickness="5px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        position="absolute"
        top="30%"
        left="50%"
      />
    );
  }
  return (
    <div className={styles.formContainer}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          email: userData.email || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid email address"),
          currentPassword: Yup.string().min(
            12,
            "Current password must be at least 12 characters"
          ),
          newPassword: Yup.string().min(
            12,
            "Password must be at least 12 characters"
          ),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref("newPassword"), null],
            "Passwords must match"
          ),
        })}
        onSubmit={async (values) => {
          await handleSubmit(values);
        }}
      >
        <Form className={styles.formContainer}>
          <div className={styles.photoContainer}>
            <h1 className={styles.profileHeader}>My Profile</h1>
            <Button
              type="button"
              id="editbutton"
              style={{ width: 130 }}
              onClick={onEdit}
            >
              {close}
            </Button>
          </div>

          <h1 className={styles.line}>
            <img
              className={styles.lineImg}
              src="/assets/more-info.svg"
              style={{ marginRight: "20px" }}
            ></img>
            Admin Information
          </h1>
          <div className={styles.inputContainer}>
            <Input
              label="Email"
              name="email"
              type="text"
              width={inputWidth()}
              disabled={edit}
            />
            <Input
              label="Current Password"
              name="currentPassword"
              type="password"
              width={inputWidth()}
              disabled={edit}
            />
            <Input
              label="New Password"
              name="newPassword"
              type="password"
              width={inputWidth()}
              disabled={edit}
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              width={inputWidth()}
              disabled={edit}
            />
          </div>
          <div className={styles.buttonContainer}>
            {!edit ? <Button type="submit">Submit</Button> : null}
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default AdminProfileForm;
