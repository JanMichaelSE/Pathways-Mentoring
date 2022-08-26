import { useEffect, useState, useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";

import { httpUpdateMentor, httpGetMentorbyID } from "@/api/user.api";
import { useUserStore } from "@/store/user.store";

import Button from "@/components/common/Button/button";
import Input from "@/components/common/Input/input";
import Select from "@/components/common/Select/select";
import styles from "./mentor-profile-form.module.css";
import { Image, Flex, Center } from "@chakra-ui/react";
import ProfileChangerPopOver from "@/components/common/ProfileChangerPopOver/profile-changer-popover";
import ProfilePicture from "@/components/common/ProfilePicture/profile-picture";
import { Textarea, Switch, SimpleGrid, Box } from "@chakra-ui/react";
import TimePickerSelector from "@/components/common/TimePickerSelector/time-picker-selector";

function MentorProfileForm() {
  const toast = useToast();
  const userId = useUserStore((state) => state.userId);
  const setUser = useUserStore((state) => state.setUser);
  const setPictureData = useUserStore((state) => state.setPictureData);
  const pictureData = useUserStore((state) => state.pictureData);
  const [userData, setUserData] = useState({});
  const [edit, setEdit] = useState(true);
  const [close, setClose] = useState("Edit");
  const [dataFirstName, setDataFirstName] = useState("");
  const [dataLastName, setDataLastName] = useState("");
  const [count, setCount] = useState(0);
  const [switchValue, setSwitchValue] = useState(true);

  useEffect(() => {
    async function loadStudentProfileInfo() {
      const mentorInfo = await httpGetMentorbyID(userId);
      setUserData(mentorInfo.data);
      setPictureData(mentorInfo.data.profilePicture);
      var [firstName, lastName] = mentorInfo.data.name.split("; ");
      setDataFirstName(firstName);
      setDataLastName(lastName);

      if (mentorInfo.hasError) {
        return toast({
          description: mentorInfo.errorMessage,
          status: "error",
          position: "top",
          duration: 5000,
        });
      }
    }
    loadStudentProfileInfo();
  }, []);

  function onEdit() {
    setEdit((prev) => !prev);
    if (edit == false) {
      setClose("Edit");
    } else if (edit == true) {
      setClose("X");
    }
  }

  async function handleSubmit(mentorInfo) {
    console.log(typeof mentorInfo);
    const mentorInfoWithID = {
      userId: userId,
      ...mentorInfo,
      profilePicture: pictureData,
    };
    console.log(mentorInfoWithID);
    const userResponse = await httpUpdateMentor(mentorInfo);

    if (userResponse.hasError) {
      return toast({
        description: userResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    setUser(
      userResponse.data.userId,
      userResponse.data.email,
      userResponse.data.role
    );
  }

  return (
    <div className={styles.formContainer}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          firstName: dataFirstName || "",
          lastName: dataLastName || "",
          email: userData.email || "",
          phone: userData.phone || "",
          gender: userData.gender || "Select Option",
          currentPassword: "",
          password: "",
          confirmPassword: "",
          academicDegree: userData.academicDegree || "",
          description: userData.description || "",
          interests: userData.interests || "",
          department: userData.department || "",
          facultyStatus: userData.facultyStatus || "",
          office: userData.office || "",
          officeHours: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("First Name is required"),
          lastName: Yup.string().required("Last Name is required"),
          phone: Yup.string()
            .matches(
              /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
              "Phone number is not valid"
            )
            .min(10, "Phone number must be 10 digits"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          currentPassword: Yup.string()
            .min(12, "Current password must be at least 12 characters")
            .required("Current password is required"),
          password: Yup.string()
            .min(12, "Password must be at least 12 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Password Confirmation is required"),
          gender: Yup.string()
            .oneOf(["Male", "Female", "Other"])
            .required("Gender is required"),
          academicDegree: Yup.string().required(),
          description: Yup.string()
            .test(
              "len",
              "Max character limit of 1500 reached.",
              (val) => val.length < 1500
            )
            .required("Description is required"),
          department: Yup.string().required("Department is required"),
          facultyStatus: Yup.string().required("Faculty Status is required"),
          office: Yup.string().required("Office is required"),
          officeHourst: Yup.string().required("Office Hours is required"),
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
          <div className={styles.avatarContainer}>
            <ProfilePicture enableReinitialize={true}></ProfilePicture>
            <ProfileChangerPopOver name="profilePicture" edit={edit} />
          </div>

          <h1 className={styles.line}>
            <img
              className={styles.lineImg}
              src="/assets/more-info.svg"
              style={{ marginRight: "20px" }}
            ></img>
            Personal Information
          </h1>

          {/* <div className={styles.formInput}> */}
          <SimpleGrid
            columns={3}
            spacing={"40px"}
            justifyItems={"center"}
            p={"50px"}
          >
            <Box>
              <Input
                label="First Name"
                name="firstName"
                type="text"
                width={400}
                disabled={edit}
              />
            </Box>
            <Box>
              <Input
                label="Last Name"
                name="lastName"
                type="text"
                width={400}
                disabled={edit}
              />
            </Box>
            <Box>
              <Input
                label="Email"
                name="email"
                type="text"
                width={400}
                disabled={edit}
              />
            </Box>
            <Box>
              <Input
                label="Phone"
                name="phone"
                type="tel"
                width={400}
                disabled={edit}
              />
            </Box>
            <Box>
              <Select
                label="Gender"
                name="gender"
                style={{ width: 350 }}
                disabled={edit}
              >
                <option value="">Select Option</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </Box>
          </SimpleGrid>
          {/* </div> */}
          <h1 className={styles.line}>
            <img
              className={styles.lineImg}
              src="/assets/password-icon.svg"
              style={{ marginRight: "20px" }}
            ></img>
            Change Password
          </h1>
          <div className={styles.formInput}>
            <Input
              label="Current Password"
              name="currentPassword"
              type="password"
              width={350}
              disabled={edit}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              width={350}
              disabled={edit}
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              width={350}
              disabled={edit}
            />
          </div>
          <h1 className={styles.line}>
            <img
              className={styles.lineImg}
              src="/assets/bibliography-icon.svg"
              style={{ marginRight: "20px" }}
            ></img>
            Bibliography
          </h1>
          <div className={styles.formTextarea}>
            <Textarea
              style={{
                borderRadius: "10px",
                height: "150px",
                backgroundColor: "var(--color-white)",
              }}
              name="description"
              size={"md"}
              resize={"none"}
              placeholder="Here is a sample placeholder"
              onChange={(e) => setCount(e.target.value.length)}
            />
            <p style={{ textAlign: "right", color: "var(--color-blue-dark)" }}>
              {1500 - count} characters left
            </p>
          </div>
          <h1 className={styles.line}>
            <img
              className={styles.lineImg}
              src="/assets/faculty-icon.svg"
              style={{ marginRight: "20px" }}
            ></img>
            Faculty Information
          </h1>
          <div className={styles.formInput}>
            <Select
              label="Academic Degree"
              name="academicDegree"
              width={350}
              disabled={edit}
            >
              <option value="">Select Option</option>
            </Select>
            <Select
              label="Department"
              name="department"
              width={350}
              disabled={edit}
            >
              <option value="">Select Option</option>
            </Select>
            <Select
              label="Faculty Status"
              name="facultyStatus"
              width={350}
              disabled={edit}
            >
              <option value="">Select Option</option>
            </Select>
            <Input
              label="Office Number"
              name="office"
              type="numeric"
              width={350}
              disabled={edit}
            />
            <Input
              label="Area of Interest"
              name="interes"
              type="text"
              width={350}
              disabled={edit}
            />
          </div>
          <h1 className={styles.line}>
            <img
              className={styles.lineImg}
              src="/assets/clock-icon.svg"
              style={{ marginRight: "20px" }}
            ></img>
            Office Hours
          </h1>
          <div className={styles.formSchedualeContainer}>
            <div className={styles.formDailyContainer}>
              <div className={styles.formDaysContainer}>
                <Flex>
                  <Center w={"120px"} mr={"20px"}>
                    <h2
                      style={{
                        fontWeight: "bold",
                        fontSize: "var(--font-size-subheading)",
                        color: "var(--color-blue-dark)",
                      }}
                    >
                      Wednesday
                    </h2>
                  </Center>
                  <Center w={"60px"} mr={"5px"}>
                    <Switch
                      size={"lg"}
                      defaultChecked
                      onChange={() => setSwitchValue(!switchValue)}
                    />
                  </Center>
                  <Center>
                    <h3
                      style={{
                        fontSize: "var(--font-size-small)",
                        color: "var(--color-blue-dark)",
                      }}
                    >
                      {switchValue ? "Open" : "Close"}
                    </h3>
                  </Center>
                </Flex>
              </div>
              <div className={styles.formTimePickerContainer}>
                <TimePickerSelector />
                <button
                  type="button"
                  style={{
                    width: 58,
                    height: 58,
                    float: "none",
                    background: "none",
                  }}
                >
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    src="/assets/add-icon.svg"
                  ></Image>
                </button>
              </div>
            </div>
            <div className={styles.formDailyContainer}>d</div>
            <div className={styles.formDailyContainer}>d</div>
            <div className={styles.formDailyContainer}>d</div>
            <div className={styles.formDailyContainer}>d</div>
            <div className={styles.formDailyContainer}>d</div>
            <div className={styles.formDailyContainer}>d</div>
          </div>

          <div className={styles.buttonContainer}>
            {!edit ? <Button type="submit">Submit</Button> : null}
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default MentorProfileForm;
