import React, { Fragment } from "react";
import {
  SimpleGrid,
} from "@chakra-ui/react";

import AvatarCard from "../../../components/common/AvatarCard/AvatarCard";
import styles from "./mentors.module.css";

function Mentors() {
  let mentorData =  [
      {"id": "1","name": "Jessica Quintana", "telephone": "787-710-1074","email": "jmontalvo.dev@gmail.com", "avatarLink": "/assets/Jessica.svg", "department": "CS/COE", "academicDegree": "BSc"},
      {"id": "2","name": "Zayira Jordan", "telephone": "787-710-1074","email": "jmontalvo.dev@gmail.com", "avatarLink": "/assets/Zayira.svg", "department": "CS/COE", "academicDegree": "DRSc"}, 
      {"id": "3","name": "Jan Montalvo", "telephone": "787-710-1074","email": "jmontalvo.dev@gmail.com", "avatarLink": "/assets/Jan.svg", "department": "CS/COE", "academicDegree": "BSc"},
  ]


  return (
    <div style={{flex: 1, backgroundColor: "#f1f8fc", height: "92vh"}}>
      <SimpleGrid columns={[1, 2, 3]} spacing='40px' className={styles.background}>
      {mentorData?.map((mentor) => (
        <AvatarCard key={mentor.id} cardData={mentor}/>
      ))}
      </SimpleGrid>
    </div>
  );
}

export default Mentors;
