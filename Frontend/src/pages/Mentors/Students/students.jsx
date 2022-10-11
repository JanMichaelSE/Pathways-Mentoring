import React, { useEffect, useState } from "react";
import {
  SimpleGrid,
  Spinner,
  useToast,
  Text,
  HStack,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";

import { httpCancelMentorship } from "@/api/students.api";
import {
  httpGetStudentByMentor,
  httpAcceptMentorship,
} from "@/api/mentors.api";

import AvatarCard from "../../../components/common/AvatarCard/avatar-card";
import NoItemsFound from "@/components/common/NoItemsFound/no-items-found";
import SadFaceIcon from "@/assets/sad-face-icon.svg";
import Contact from "@/assets/contact.svg";
import styles from "./students.module.css";

function Students() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [pendingStudents, setPendingStudents] = useState([]);
  const [currentStudents, setCurrentStudents] = useState([]);
  const [isLessThan950] = useMediaQuery("(max-width: 950px)");

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

      studentsResponse.data;
      for (const student of studentsResponse.data) {
        if (student.isPendingMentorshipApproval === false) {
          currentStudents.push(student);
        } else {
          pendingStudents.push(student);
        }
      }

      setCurrentStudents(currentStudents);
      setPendingStudents(pendingStudents);

      setIsLoading(false);
    }

    loadAllStudents();
  }, []);

  async function CancelMentoring(cardData) {
    const userResponse = await httpCancelMentorship(cardData.id);

    if (userResponse.hasError) {
      return toast({
        description: userResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    currentStudents.map((student, index) => {
      if (student.id == cardData.id) {
        currentStudents.splice(index, 1);
      }
    });

    setCurrentStudents([...currentStudents]);

    return toast({
      title: "Canceled Mentoring!",
      description: "Mentorship has been canceled!",
      status: "success",
      position: "top",
      duration: 7000,
    });
  }

  async function AcceptMentoring(cardData) {
    const userResponse = await httpAcceptMentorship(cardData.id);

    if (userResponse.hasError) {
      return toast({
        description: userResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    pendingStudents.map((student, index) => {
      if (student.id == cardData.id) {
        currentStudents.push(pendingStudents[index]);
        pendingStudents.splice(index, 1);
      }
    });
    setCurrentStudents([...currentStudents]);
    setPendingStudents([...pendingStudents]);

    return toast({
      title: "Mentorship Approved!",
      description: "Mentorship has been approved!",
      status: "success",
      position: "top",
      duration: 7000,
    });
  }

  function gridValues() {
    if (isLessThan950) {
      return [1, 2];
    } else {
      return [1, 2, 3];
    }
  }

  function loadPendingStudent() {
    if (pendingStudents.length != 0) {
      return (
        <>
          <HStack paddingLeft={"40px"} paddingTop={"10px"}>
            <Image src={Contact} />
            <Text className={styles.heading}>Pending Approval</Text>
          </HStack>
          <SimpleGrid
            columns={gridValues()}
            spacing="40px"
            className={styles.background}
          >
            {pendingStudents?.map((student) => {
              return (
                <AvatarCard
                  key={student.id}
                  cardData={student}
                  buttonFunction={AcceptMentoring}
                  messageButton={"Accept Mentorship"}
                />
              );
            })}
          </SimpleGrid>
        </>
      );
    }
  }

  function loadCurrentStudent() {
    if (currentStudents.length != 0) {
      return (
        <>
          <HStack paddingLeft={"40px"}>
            <Image src={Contact} />
            <Text className={styles.heading}>Students</Text>
          </HStack>
          <SimpleGrid
            columns={gridValues()}
            spacing="40px"
            className={styles.background}
          >
            {currentStudents?.map((student) => {
              return (
                <AvatarCard
                  key={student.id}
                  cardData={student}
                  buttonFunction={CancelMentoring}
                  messageButton={"Cancel Mentorship"}
                />
              );
            })}
          </SimpleGrid>
        </>
      );
    }
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
    } else if (currentStudents.length === 0 && pendingStudents.length === 0) {
      return (
        <div className={styles.noUsers}>
          <NoItemsFound title="No Students added yet." icon={SadFaceIcon} />
        </div>
      );
    } else {
      return (
        <div className={styles.container}>
          {loadPendingStudent()}
          {loadCurrentStudent()}
        </div>
      );
    }
  }

  return <>{loadStudentsComponent()}</>;
}

export default Students;
