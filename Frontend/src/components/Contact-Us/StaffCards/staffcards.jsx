import React from "react";
import { Stack, Text, useMediaQuery } from "@chakra-ui/react";

import StaffCard from "../StaffCard/staffcard";
import AvatarSprite from "@/assets/spriteAvatar.svg";

import styles from "./staffcards.module.css";

export default function StaffCards() {
  const [isLargerThan940] = useMediaQuery("(min-width: 940px)");

  let staffData = [
    {
      id: "1",
      name: "Cuauhtemoc Godoy",
      telephone: "797-622-8000 ext. 640",
      email: "cgodoy@pupr.edu",
      avatarLink: AvatarSprite + "#avatar1",
      department: "Pathways Director",
      academicDegree: "PhD",
    },
    {
      id: "2",
      name: "Zayira Jordan",
      telephone: "787-622-8000 ext. 220",
      email: "zjordan@pupr.edu",
      avatarLink: AvatarSprite + "#avatar1",
      department: "Stategy One Leader",
      academicDegree: "PhD",
    },
  ];

  return (
    <>
      <Stack flexDirection={"column"} mx={5} mb={isLargerThan940 ? 0 : 270}>
        <Text className={styles.heading}>Pathways Staff</Text>
        <Stack flexDirection={isLargerThan940 ? "column" : "row"} justifyContent={"space-around"}>
          {staffData?.map((staff) => (
            <StaffCard key={staff.id} cardData={staff} />
          ))}
        </Stack>
      </Stack>
    </>
  );
}
