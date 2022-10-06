import React, { useEffect, useState } from "react";
import { SimpleGrid, Spinner, useToast, Text, HStack, Image } from "@chakra-ui/react";

import { httpCancelMentorship } from "@/api/students.api";
import { httpGetStudentByMentor } from "@/api/mentors.api";

import AvatarCard from "../../../components/common/AvatarCard/avatar-card";
import NoItemsFound from "@/components/common/NoItemsFound/no-items-found";
import SadFaceIcon from "@/assets/sad-face-icon.svg";
import Contact from "@/assets/contact.svg"
import styles from "./students.module.css";

function Students() {
  const toast = useToast();
  const [studentData, setStudentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAllStudents() {
      const studentsResponse = await httpGetStudentByMentor();

      if (studentsResponse.hasError) {
        return toast({
          description: studentsResponse.errorMessage,
          status: "error",
          position: "top",
          duration: 5000,
        });
      }

      setStudentData(studentsResponse.data);
      setIsLoading(false);
    }

    loadAllStudents();
  }, []);

  async function CancelMentoring(cardData) {
    console.log("Info of card data: ", cardData.studentId);
    const userResponse = await httpCancelMentorship(cardData.studentId);

    if (userResponse.hasError) {
      return toast({
        description: userResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    return toast({
      title: "Approved!",
      description: "Mentor access has been approved!",
      status: "success",
      position: "top",
      duration: 7000,
    });
  }

  function loadStudentsComponent() {
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
    } else if (studentData.length === 0) {
      return (
        <div className={styles.noUsers}>
          <NoItemsFound title="No Students added yet." icon={SadFaceIcon} />
        </div>
      );
    } else {
      return (
        <div>
        <HStack paddingLeft={"40px"} paddingTop={"10px"}>
          <Image src={Contact} />
          <Text className={styles.heading}>Pending Approval</Text>
        </HStack>
        <SimpleGrid
          columns={[1, 2, 3]}
          spacing="40px"
          className={styles.background}
        >
          {studentData?.map((student) => (
            <AvatarCard
              key={student.id}
              cardData={student}
              buttonFunction={CancelMentoring}
              messageButton={"Cancel Mentorship"}
            />
          ))}
        </SimpleGrid>
        <HStack paddingLeft={"40px"}>
          <Image src={Contact} />
          <Text className={styles.heading}>Students</Text>
        </HStack>
        <SimpleGrid
          columns={[1, 2, 3]}
          spacing="40px"
          className={styles.background}
        >
          {studentData?.map((student) => (
            <AvatarCard
              key={student.id}
              cardData={student}
              buttonFunction={CancelMentoring}
              messageButton={"Cancel Mentorship"}
            />
          ))}
        </SimpleGrid>
        </div>
      );
    }
  }

  return (
    <div style={{ flex: 1, backgroundColor: "#f1f8fc", height: "92vh" }}>
      {loadStudentsComponent()}
    </div>
  );
}

export default Students;
