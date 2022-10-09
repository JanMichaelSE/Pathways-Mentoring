import React, { useEffect, useState } from "react";
import { SimpleGrid, Spinner, useToast, Text, HStack, Image } from "@chakra-ui/react";

import { httpCancelMentorship } from "@/api/students.api";
import { httpGetStudentByMentor, httpAcceptMentorship } from "@/api/mentors.api";

import AvatarCard from "../../../components/common/AvatarCard/avatar-card";
import NoItemsFound from "@/components/common/NoItemsFound/no-items-found";
import SadFaceIcon from "@/assets/sad-face-icon.svg";
import Contact from "@/assets/contact.svg"
import styles from "./students.module.css";

function Students() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [pendingStudents, setPendingStudents] = useState([]);
  const [currentStudents, setCurrentStudents] = useState([]);

  useEffect(() => {
    async function loadAllStudents() {
      const studentsResponse = await httpGetStudentByMentor();

      if (studentsResponse.hasError) {
        return toast({
          description: studentsResponse.errorMessage,
          status: "error",
          position: "top",
          duration: 5000,
        });
      }

      studentsResponse.data
      let tempPendingStudents = []
      let tempCurrentStudents = []
      for(const student of studentsResponse.data) {
        if (student.isPendingMentorshipApproval === false) {
          tempCurrentStudents.push(student);
        } else {
          
          tempPendingStudents.push(student)
        }
      }

      setCurrentStudents(tempCurrentStudents);
      setPendingStudents(tempPendingStudents);
      
      
      setIsLoading(false);
    }

    loadAllStudents();
  }, []);

  async function CancelMentoring(cardData) {
    console.log("Info of card data: ", cardData);
    const userResponse = await httpCancelMentorship(cardData.id);

    if (userResponse.hasError) {
      return toast({
        description: userResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    if(!userResponse.hasError){
    let tempCurrent = currentStudents;

    for(let i; i < tempCurrent.length; i++){
      if(tempCurrent[i].id === cardData.id){
        tempCurrent[i].pop();
        break;
      }
    }
    setCurrentStudents(tempCurrent);
  }

    return toast({
      title: "Canceled Mentoring!",
      description: "Mentorship has been canceled!",
      status: "success",
      position: "top",
      duration: 7000,
    });
  }

  async function AcceptMentoring(cardData) {
    console.log("Info of card data: ", cardData);
    const userResponse = await httpAcceptMentorship(cardData.id);

    let tempPending = pendingStudents;
    let tempCurrent = currentStudents;

    if (userResponse.hasError) {
      return toast({
        description: userResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    if(!userResponse.hasError){
      //
    for(let i; i < tempPending.length; i++){
      if(tempPending[i].id === cardData.id){
        tempCurrent.push(tempPending[i].pop())
        break;
      }
    }
    setCurrentStudents({...tempCurrent});
    setPendingStudents({...tempPending});
  }

    return toast({
      title: "Mentorship Approved!",
      description: "Mentorship has been approved!",
      status: "success",
      position: "top",
      duration: 7000,
    });
  }

  function loadPending() {
    if(pendingStudents.length != 0){
      return (
        <>
      <HStack paddingLeft={"40px"} paddingTop={"10px"}>
          <Image src={Contact} />
          <Text className={styles.heading}>Pending Approval</Text>
        </HStack>
        <SimpleGrid
        columns={[1, 2, 3]}
        spacing="40px"
        className={styles.background}
      >
        {console.log("Pending Students", pendingStudents)}
        {pendingStudents?.map((student) => {
          return <AvatarCard
            key={student.id}
            cardData={student}
            buttonFunction={AcceptMentoring}
            messageButton={"Accept Mentorship"}
          />
          
  })}
      </SimpleGrid>
      </>);
    }
  }

  function loadCurrent(){
    if(currentStudents.length != 0){
    return(
      <>
      <HStack paddingLeft={"40px"}>
          <Image src={Contact} />
          <Text className={styles.heading}>Students</Text>
        </HStack>
        <SimpleGrid
          columns={[1, 2, 3]}
          spacing="40px"
          className={styles.background}
        >
          {currentStudents?.map((student) => {
            
            return <AvatarCard
              key={student.id}
              cardData={student}
              buttonFunction={CancelMentoring}
              messageButton={"Cancel Mentorship"}
            />
            
    })}
        </SimpleGrid>
      </>
    );
  }
  }

  function loadStudentsComponent() {
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
    } else if (currentStudents.length === 0 && pendingStudents.length === 0) {
      return (
        <div className={styles.noUsers}>
          <NoItemsFound title="No Students added yet." icon={SadFaceIcon} />
        </div>
      );
    } else {
      return (
        <div>
        {loadPending()}
        {loadCurrent()}
        </div>
      );
    }
  }

  return (
    <div style={{ flex: 1, backgroundColor: "#f1f8fc", height: "92vh" }}>
      {loadStudentsComponent()}
    </div>
  );
}

export default Students;