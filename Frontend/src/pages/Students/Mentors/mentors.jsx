import React, { useEffect, useState } from "react";
import { HStack, SimpleGrid, Spinner, useToast, Image, Text } from "@chakra-ui/react";
import { httpGetAllMentors } from "@/api/mentors.api";
import { httpRequestMentorship } from "@/api/students.api";
import { httpGetUnapprovedMentors } from "../../../api/mentors.api";
import AvatarCard from "../../../components/common/AvatarCard/avatar-card";
import NoItemsFound from "@/components/common/NoItemsFound/no-items-found";
import SadFaceIcon from "@/assets/sad-face-icon.svg";
import Contact from "@/assets/contact.svg"
import styles from "./mentors.module.css";

function Mentors() {
  const toast = useToast();
  const [currentMentorData, setCurrentMentorData] = useState([]);
  const [mentorData, setMentorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

      setMentorData(mentorsResponse.data);
    }

    loadAllMentors();

    async function loadCurrentMentor() {
      const mentorsResponse = await httpGetUnapprovedMentors();

      if (mentorsResponse.hasError) {
        return toast({
          description: mentorsResponse.errorMessage,
          status: "error",
          position: "top",
          duration: 5000,
        });
      }

      setCurrentMentorData(mentorsResponse.data);
      setIsLoading(false);
    }

    loadCurrentMentor();
  }, []);

  async function RequestMentoring(cardData) {
    console.log("Info of card data: ", cardData.email);
    const userResponse = await httpRequestMentorship(cardData.email);

    if (userResponse.hasError) {
      return toast({
        description: userResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    return toast({
      title: "Mentorship Request!",
      description: "Mentorship has been requested!",
      status: "success",
      position: "top",
      duration: 7000,
    });
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
    } else if (mentorData.length === 0 && currentMentorData.length === 0) {
      return (
        <div className={styles.noUsers}>
          <NoItemsFound title="No Mentors added yet." icon={SadFaceIcon} />
        </div>
      );
    } else {
      return (
        <div >
        <HStack paddingLeft={"40px"} paddingTop={"10px"}>
          <Image src={Contact} />
          <Text className={styles.heading}>Current Mentor</Text>
        </HStack>
        <SimpleGrid
          columns={[1, 2, 3]}
          spacing="40px"
          className={styles.background}
        >
          {mentorData?.map((mentor) => (
            <AvatarCard
              key={mentor.id}
              cardData={mentor}
              buttonFunction={RequestMentoring}
              messageButton={"Request Mentoring"}
              studentSide={true}
            />
          ))}
        </SimpleGrid>
        <HStack paddingLeft={"40px"}>
          <Image src={Contact} />
          <Text className={styles.heading}>Mentors</Text>
        </HStack>
        <SimpleGrid
          columns={[1, 2, 3]}
          spacing="40px"
          className={styles.background}
        >
          {mentorData?.map((mentor) => (
            <AvatarCard
              key={mentor.id}
              cardData={mentor}
              buttonFunction={RequestMentoring}
              messageButton={"Request Mentoring"}
              studentSide={true}
            />
          ))}
        </SimpleGrid>
        </div>
      );
    }
  }

  return (
    <div style={{ flex: 1, backgroundColor: "#f1f8fc", height: "92vh" }}>
      {loadMentorsComponent()}
    </div>
  );
}

export default Mentors;
