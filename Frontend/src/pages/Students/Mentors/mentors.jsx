import React, { Fragment, useEffect, useState } from "react";
import { SimpleGrid, Spinner, useToast } from "@chakra-ui/react";
import httpGetAllMentors from "@/api/mentors.api";
import AvatarCard from "../../../components/common/AvatarCard/AvatarCard";
import NoItemsFound from "@/components/common/NoItemsFound/no-items-found";
import SadFaceIcon from "@/assets/sad-face-icon.svg";
import styles from "./mentors.module.css";

function Mentors() {
  const toast = useToast();
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
      setIsLoading(false);
    }

    loadAllMentors();
  }, []);

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
    } else if (mentorData.length === 0) {
      return (
        <NoItemsFound title="No Mentors added yet." icon={SadFaceIcon} />
      );
    } else {
      return (
        <SimpleGrid
        columns={[1, 2, 3]}
        spacing="40px"
        className={styles.background}
      >
        {mentorData?.map((mentor) => (
          <AvatarCard key={mentor.id} cardData={mentor} />
        ))}
      </SimpleGrid>
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
