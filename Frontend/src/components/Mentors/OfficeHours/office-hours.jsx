import React, { useEffect, useState } from "react";
import {
  VStack,
  UnorderedList,
  ListItem,
  HStack,
  Avatar,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";

import PersonCalendarIcon from "@/assets/Person_Calendar.png";

import styles from "./office-hours.module.css";

function OfficeHours({ timeString }) {
  const [hoursState, setHoursState] = useState({});
  let mentorSchedule = {};
  let compo = {};
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  useEffect(() => {
    function transformSchedule(serverData, schedule) {
      const daysInterval = serverData.split("/");

      for (const interval of daysInterval) {
        const timeSplit = interval.split("%");
        schedule[timeSplit[0]] = timeSplit[1];
      }
    }

    transformSchedule(timeString, mentorSchedule);

    function formatHours() {
      for (let j = 0; j < days.length; j++) {
        let temp = mentorSchedule[days[j]];
        if (temp?.includes("@")) {
          let sub = temp.split("@");
          compo[days[j]] = [sub[0], sub[1]];
        } else {
          if (temp !== "") {
            compo[days[j]] = temp;
          }
        }
      }
    }

    formatHours();

    setHoursState(compo);
  }, []);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <VStack
        padding={"1.5rem 1rem 2rem 1rem"}
        rounded={"27px"}
        bg={"#D9E4EA"}
        mx={3}
        mt={3}
        mb={5}
        boxShadow={"md"}
        maxWidth={"2xl"}
        minW={"670px"}
        justifyContent="center"
      >
        <HStack alignSelf={"start"}>
          <Avatar
            size={"lg"}
            borderWidth={"2px"}
            borderColor={"#99A9B9"}
            background={"#5389BE"}
            src={PersonCalendarIcon}
            alt={"Person Calendar Icon"}
            pos={"relative"}
            p={3}
          />
          <Text className={styles.regularbold} textDecorationLine={"underline"} size={"l"}>
            Office Hours
          </Text>
        </HStack>
        <VStack paddingLeft={"5rem"}>
          <SimpleGrid columns={[3]} spacing="40px" className={styles.background}>
            {days.map((day, index) => {
              if (Array.isArray(hoursState[day])) {
                return (
                  <VStack key={index} paddingLeft={"15px"}>
                    <Text alignSelf={"start"} className={styles.regularbold}>
                      {capitalizeFirstLetter(day)}:
                    </Text>
                    <UnorderedList>
                      <ListItem key={day + hoursState[day][0] + index}>
                        {hoursState[day][0]}
                      </ListItem>
                      <ListItem key={day + hoursState[day][1] + index}>
                        {hoursState[day][1]}
                      </ListItem>
                    </UnorderedList>
                  </VStack>
                );
              } else {
                if (hoursState.hasOwnProperty(day) && hoursState[day] == undefined) {
                  return <></>;
                } else if (hoursState.hasOwnProperty(day)) {
                  return (
                    <VStack key={index} paddingLeft={"15px"}>
                      <Text className={styles.regularbold} alignSelf={"start"}>
                        {capitalizeFirstLetter(day)}:
                      </Text>
                      <UnorderedList>
                        <ListItem key={day + hoursState[day] + index}>{hoursState[day]}</ListItem>
                      </UnorderedList>
                    </VStack>
                  );
                }
              }
            })}
          </SimpleGrid>
        </VStack>
      </VStack>
    </>
  );
}

export default OfficeHours;
