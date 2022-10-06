import React, { useEffect } from "react";
import {
  HStack,
  VStack,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

function OfficeHours({ schedule }) {

  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let compo = {};
  let timeList = [];

  useEffect(() => {
    async function formatHours() {
        for (let j = 0; j < days.length; j++) {
          let temp = schedule[days[j]];
          if (temp.includes("@")) {
            let sub = temp.split("@");
            compo[days[j]] = [sub[0], sub[1]];
          } else {
            if (temp !== "") {
              compo[days[j]] = temp;
            }
          }
        }
        
        for (let i = 0; i < days.length; i++) {
            if (Array.isArray(compo[days[i]])) {
              timeList.push(
                <VStack>
                  <UnorderedList>
                    <ListItem>{days[i]}</ListItem>
                    <ListItem>{compo[days[i]][0]}</ListItem>
                    <ListItem>{compo[days[i]][1]}</ListItem>
                  </UnorderedList>
                </VStack>
              );
            } else {
              if (compo.hasOwnProperty([days[i]])) {
                timeList.push(
                  <VStack>
                    <UnorderedList>
                      <ListItem>{days[i]}</ListItem>
                      <ListItem>{compo[days[i]]}</ListItem>
                    </UnorderedList>
                  </VStack>
                );
              }
            }
          }
      }
    formatHours();
  });

  function testFunction(){
    console.log(timeList);
    return (timeList.map((slot) => {slot}));
  }

  return (
    <VStack>
      <Text>Office Hours</Text>
      <HStack>{testFunction()}</HStack>
    </VStack>
  );
}

export default OfficeHours;
