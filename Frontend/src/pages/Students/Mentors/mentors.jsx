import React, { useEffect, useState } from "react";
import {
  HStack,
  SimpleGrid,
  Spinner,
  useToast,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { httpGetAllMentors } from "@/api/mentors.api";
import { httpRequestMentorship } from "@/api/students.api";
import AvatarCard from "../../../components/common/AvatarCard/avatar-card";
import NoItemsFound from "@/components/common/NoItemsFound/no-items-found";
import SadFaceIcon from "@/assets/sad-face-icon.svg";
import Contact from "@/assets/contact.svg";
import styles from "./mentors.module.css";
import { httpCancelMentorship } from "../../../api/students.api";

function Mentors() {
  const toast = useToast();
  const [availableMentorData, setAvailableMentorData] = useState([]);
  const [currentMentorData, setCurrentMentorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLessThan950] = useMediaQuery("(max-width: 950px)");

  useEffect(() => {
    async function loadAllMentors() {
      const mentorsResponse = await httpGetAllMentors();

      if (mentorsResponse.hasError) {
        return toast({
          description: mentorsResponse.errorMessage,
          status: "error",
          position: "top",
          duration: 5000,
        });
      }

      for (const mentor of mentorsResponse.data) {
        if (mentor.isActiveMentor == false) {
          availableMentorData.push(mentor);
        } else {
          currentMentorData.push(mentor);
        }
      }

      setCurrentMentorData(currentMentorData);
      setAvailableMentorData(availableMentorData);
      setIsLoading(false);
    }

    loadAllMentors();
  }, []);

  async function RequestMentoring(cardData) {
    const userResponse = await httpRequestMentorship(cardData.email);

    if (userResponse.hasError) {
      return toast({
        description: userResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    currentMentorData.map((student, index) => {
      if (student.id == cardData.id) {
        availableMentorData.push(currentMentorData[index]);
        currentMentorData.splice(index, 1);
      }
    });
    setAvailableMentorData([...availableMentorData]);
    setCurrentMentorData([...currentMentorData]);

    return toast({
      title: "Mentorship Request!",
      description: "Mentorship has been requested!",
      status: "success",
      position: "top",
      duration: 7000,
    });
  }

  async function CancelMentoring(cardData) {
    const userResponse = await httpCancelMentorship();

    if (userResponse.hasError) {
      return toast({
        description: userResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    currentMentorData.map((student, index) => {
      if (student.id == cardData.id) {
        availableMentorData.push(currentMentorData[index]);
        currentMentorData.splice(index, 1);
      }
    });

    setAvailableMentorData([...availableMentorData]);
    setCurrentMentorData([...currentMentorData]);

    return toast({
      title: "Canceled Mentorship Request!",
      description: "Mentorship has been canceled!",
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

  function loadCurrentMentor() {
    if (currentMentorData.length != 0) {
      return (
        <>
          <HStack paddingLeft={"40px"} paddingTop={"10px"}>
            <Image src={Contact} />
            <Text className={styles.heading}>Current Mentor</Text>
          </HStack>
          <SimpleGrid
            columns={gridValues()}
            spacing="40px"
            className={styles.background}
          >
            {currentMentorData?.map((mentor) => {
              return (
                <AvatarCard
                  key={mentor.id}
                  cardData={mentor}
                  buttonFunction={CancelMentoring}
                  messageButton={"Cancel Mentoring"}
                  studentSide={true}
                />
              );
            })}
          </SimpleGrid>
        </>
      );
    }
  }

  function loadAvailableMentor() {
    if (availableMentorData.length != 0) {
      return (
        <>
          <HStack paddingLeft={"40px"}>
            <Image src={Contact} />
            <Text className={styles.heading}>Mentors</Text>
          </HStack>
          <SimpleGrid
            columns={gridValues()}
            spacing="40px"
            className={styles.background}
          >
            {availableMentorData?.map((mentor) => {
              return (
                <AvatarCard
                  key={mentor.id}
                  cardData={mentor}
                  buttonFunction={RequestMentoring}
                  messageButton={"Request Mentoring"}
                  studentSide={true}
                />
              );
            })}
          </SimpleGrid>
        </>
      );
    }
  }

  function loadMentorsComponent() {
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
    } else if (
      availableMentorData.length === 0 &&
      currentMentorData.length === 0
    ) {
      return (
        <div className={styles.noUsers}>
          <NoItemsFound title="No Mentors added yet." icon={SadFaceIcon} />
        </div>
      );
    } else {
      return (
        <div className={styles.container}>
          {loadCurrentMentor()}
          {loadAvailableMentor()}
        </div>
      );
    }
  }

  return <>{loadMentorsComponent()}</>;
}

export default Mentors;
