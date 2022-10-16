import React, { useState, useEffect } from "react";

import { httpGetUnapprovedMentors, httpApproveMentorAccess } from "@/api/mentors.api";

import { SimpleGrid, Spinner, useToast } from "@chakra-ui/react";

import AvatarCard from "@/components/common/AvatarCard/avatar-card";
import NoItemsFound from "@/components/common/NoItemsFound/no-items-found";
import SadFaceIcon from "@/assets/sad-face-icon.svg";
import styles from "./manage-users.module.css";

function ManageUsers() {
  const toast = useToast();
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAllMentors() {
      const mentorsResponse = await httpGetUnapprovedMentors();

      if (mentorsResponse.hasError) {
        return toast({
          description: mentorsResponse.errorMessage,
          status: "error",
          position: "top",
          duration: 5000,
        });
      }

      setMentors(mentorsResponse.data);
      setIsLoading(false);
    }

    loadAllMentors();
  }, []);

  async function acceptMentor(cardData) {
    const userResponse = await httpApproveMentorAccess(cardData.id);

    if (userResponse.hasError) {
      return toast({
        description: userResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    mentors.map((mentor, index) => {
      if (mentor.id == cardData.id) {
        mentors.splice(index, 1);
      }
    });

    setMentors([...mentors]);

    return toast({
      title: "Approved!",
      description: "Mentor access has been approved!",
      status: "success",
      position: "top",
      duration: 7000,
    });
  }

  function loadMentorComponent() {
    if (isLoading) {
      return (
        <div style={{ flex: 1, backgroundColor: "#f1f8fc", height: "92vh" }}>
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
        </div>
      );
    } else if (mentors.length === 0) {
      return (
        <div className={styles.noUsers}>
          <NoItemsFound title="No Users Pending" icon={SadFaceIcon} />
        </div>
      );
    } else {
      return (
        <SimpleGrid columns={[1, 2, 3]} spacing="40px" className={styles.background}>
          {mentors?.map((mentor) => (
            <AvatarCard
              key={mentor.id}
              cardData={mentor}
              buttonFunction={acceptMentor}
              messageButton={"Accept Mentor"}
            />
          ))}
        </SimpleGrid>
      );
    }
  }

  return (
    <>
      <div>{loadMentorComponent()}</div>
    </>
  );
}

export default ManageUsers;
