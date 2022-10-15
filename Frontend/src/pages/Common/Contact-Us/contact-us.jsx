import { Box, Grid, GridItem, HStack, Image, Text, useMediaQuery } from "@chakra-ui/react";
import StaffCards from "@/components/Contact-Us/StaffCards/staffcards";
import ContactUsForm from "@/components/Contact-Us/ContactForm/contact-us-form";
import ContactIcon from "@/assets/contact.svg";

import styles from "./contact-us.module.css";

function ContactUs() {
  const [isLargerThan940] = useMediaQuery("(min-width: 940px)");
  return (
    <div className={styles.container}>
      <Grid templateColumns="repeat(10, 1fr)" gap={2}>
        <GridItem justifyContent={"center"} colSpan={isLargerThan940 ? 7 : 10} mt={6}>
          <Box
            w={isLargerThan940 ? "100" : "87%"}
            maxWidth={"991px"}
            h={"100%"}
            bg={"#FFFFFF"}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={10}
            textAlign={"center"}
            mx={"auto"}
          >
            <HStack>
              <Image boxSize="50px" objectFit="cover" src={ContactIcon} alt="Contact Icon" />
              <Text className={styles.heading}>Contact Pathways</Text>
            </HStack>
            <ContactUsForm />
          </Box>
        </GridItem>
        <GridItem colSpan={isLargerThan940 ? 3 : 10} mt={6}>
          <StaffCards />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ContactUs;
