import { Box, Grid, GridItem, HStack, Image, Text } from "@chakra-ui/react";
import StaffCards from "../../../components/common/StaffCards/StaffCards";
import ContactUsForm from "../../../components/common/ContactForm/Contact-US-Form";
import styles from "./contact-us.module.css";

function ContactUs() {
  return (
    <div style={{flex: 1, backgroundColor: "#f1f8fc", height: "92vh"}}>
      <Grid templateColumns="repeat(10, 1fr)" gap={2} >
        <GridItem justifyContent={"center"} colSpan={6} mt={6}>
          <Box
            w={"full"}
            h={"3xl"}
            bg={"#FFFFFF"}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={10}
            textAlign={"center"}
            ml={7}
          >
            <HStack>
              <Image
                boxSize="50px"
                objectFit="cover"
                src="/assets/contact.svg"
                alt="Company.svg"
              />
              <Text className={styles.heading}>Contact Pathways</Text>
            </HStack>
            <ContactUsForm />
          </Box>
        </GridItem>
        <GridItem colSpan={4}>
          <StaffCards />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ContactUs;
