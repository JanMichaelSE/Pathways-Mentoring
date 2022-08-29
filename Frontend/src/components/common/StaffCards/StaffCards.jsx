import React from "react";
import { Center, Text, useMediaQuery } from "@chakra-ui/react";
import StaffCard from "../StaffCard/StaffCard";
import styles from "./StaffCards.module.css";

export default function StaffCards() {
  const [isLargerThan940] = useMediaQuery('(min-width: 940px)')

  let staffData = [
    {
      id: "1",
      name: "Jessica Quintana",
      telephone: "787-710-1074",
      email: "jmontalvo.dev@gmail.com",
      avatarLink: "/assets/Jessica.svg",
      department: "CS/COE",
      academicDegree: "BSc",
    },
    {
      id: "2",
      name: "Jan Montalvo",
      telephone: "787-710-1074",
      email: "jmontalvo.dev@gmail.com",
      avatarLink: "/assets/Jan.svg",
      department: "CS/COE",
      academicDegree: "BSc",
    },
  ];

  return (
    <>
      <Center flexDirection={"column"} mx={5} mb={isLargerThan940 ? 0 : 270}>
        <Text className={styles.heading}>Pathways Staff</Text>
        {staffData?.map((staff) => (
          <StaffCard key={staff.id} cardData={staff} />
        ))}
      </Center>
    </>
  );
}
