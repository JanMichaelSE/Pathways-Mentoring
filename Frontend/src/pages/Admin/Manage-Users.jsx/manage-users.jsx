import React, { Fragment, useState, useEffect } from "react";
import {
  HStack,
  SimpleGrid,
  Text,
  Image,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import styles from "./manage-users.module.css";
import NoItemsFound from "@/components/common/NoItemsFound/no-items-found";
import SadFaceIcon from "@/assets/sad-face-icon.svg";

function ManageUsers() {
  const toast = useToast();
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   asyn function loadAllMentors

  //   return () => {
  //     second
  //   }
  // }, [third])

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
    } else if (mentors.length === 1) {
      return (
        <div className={styles.noUsers}>
          <NoItemsFound title="No Users Pending" icon={SadFaceIcon} />
        </div>
      );
    } else {
      return (
        <>
          <div>Manage Users</div>
        </>
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
