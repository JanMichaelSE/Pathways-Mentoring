import React, { Fragment } from "react";
import {
  SimpleGrid,
} from "@chakra-ui/react";

import StudentCard from "../../../components/Mentors/StudentCard/StudentCard";
import styles from "./students.module.css";

function Students() {
  let studentData =  [
      {"id": "1","name": "Jessica Quintana", "telephone": "787-710-1074","email": "jmontalvo.dev@gmail.com", "avatarLink": "/assets/Jessica.svg", "department": "CS/COE", "academicDegree": "BSc"},
      {"id": "2","name": "Abigael Rivera", "telephone": "787-710-1074","email": "jmontalvo.dev@gmail.com", "avatarLink": "/assets/Zayira.svg", "department": "CS/COE", "academicDegree": "BSc"}, 
      {"id": "3","name": "Jan Montalvo", "telephone": "787-710-1074","email": "jmontalvo.dev@gmail.com", "avatarLink": "/assets/Jan.svg", "department": "CS/COE", "academicDegree": "BSc"},
  ]


  return (
    <div style={{flex: 1, backgroundColor: "#f1f8fc", height: "92vh"}}>
      <SimpleGrid columns={[1, 2, 3]} spacing='40px' className={styles.background}>
      {studentData?.map((student) => (
        <StudentCard key={student.id} cardData={student}/>
      ))}
      </SimpleGrid>
    </div>
  );
}

export default Students;