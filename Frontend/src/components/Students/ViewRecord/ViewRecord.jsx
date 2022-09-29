import React, { useEffect, useState } from "react";

import {
  HStack,
  SimpleGrid,
  Text,
  Image,
  Spinner,
  useToast,
  Box,
  Avatar,
  UnorderedList,
  ListItem,
  Center,
} from "@chakra-ui/react";
import DocumentIcon from "@/assets/Brief.png";
import ChatIcon from "@/assets/Chat.png";
import styles from "./ViewRecord.module.css";
import Notes from "../../Notes/Notes";

function ViewRecord() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Box
      px={20}
      maxW={"100%"}
      w={"full"}
      bg={"#FFFFFF"}
      boxShadow={"2xl"}
      rounded={"lg"}
      p={10}
      textAlign={"center"}
    >
      <Center flexDirection={"column"}>
        <Text>Identify Subject</Text>
        <Box>
          <HStack>
            <Avatar
              padding={2}
              src={DocumentIcon}
              bgColor={"#5389BE"}
              borderColor={"#99A9B9"}
              borderWidth={3}
              size={"md"}
            />
            <UnorderedList>
              <ListItem>
                Identify Hypothesis or Research Question deliver to the mentor
                (Research proposal).
              </ListItem>
              <ListItem>Deliver the subject to the mentor.</ListItem>
            </UnorderedList>
          </HStack>
        </Box>
        
        <h1 className={styles.divider}>

            <img

              className={styles.lineImg}

              src={ChatIcon}

              style={{ marginRight: "20px" }}

            ></img>

            Notes

          </h1>
        {/* <div className={styles.divider}>
          <Image size="md" src= />
          <h1>Notes</h1>
        </div> */}
        <Notes />
      </Center>
    </Box>
  );
}

export default ViewRecord;
