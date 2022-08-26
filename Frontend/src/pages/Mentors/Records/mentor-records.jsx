import React, { Fragment } from "react";
import {
  Box,
  HStack,
  SimpleGrid,
  Text
} from "@chakra-ui/react";

import Record from "../../../components/Mentors/Record/MentorRecord";
import styles from "./mentor-records.module.css";

function MentorRecords() {
  let recordData =  [
      {"id": "1","name": "Identify Subject", "date": "6/15/2022","student": "Jan Montalvo", "rating": 5},
      {"id": "2","name": "Identify Subject", "date": "6/15/2022","student": "Jan Montalvo", "rating": 100}, 
      {"id": "3","name": "Identify Subject", "date": "6/15/2022","student": "Jan Montalvo", "rating": 50},
      {"id": "4","name": "Identify Subject", "date": "6/15/2022","student": "Jan Montalvo", "rating": 5},
  ]


  return (
    <div style={{flex: 1, backgroundColor: "#f1f8fc", height: "92vh"}}>
      <HStack align={"right"}>
        
      </HStack>
      <SimpleGrid columns={[1, 2, 3]} spacing='40px' className={styles.gridSpace}>
      {recordData.length === 0 ?
        <Box className={styles.emptyGridSpace} bgColor={"#f1f8fc"} w={"100%"}>

          <Text textAlign={"center"}>
            No records assigned yet
          </Text>
        </Box>
        :
        recordData?.map((record) => (
          <Record key={record.id} recordData={record}/>
        ))
      }
      
      </SimpleGrid>
    </div>
  );
}

export default MentorRecords;