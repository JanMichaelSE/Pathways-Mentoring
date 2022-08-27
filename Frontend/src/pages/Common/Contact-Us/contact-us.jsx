import { Box, Grid, GridItem, HStack, Image, Text } from "@chakra-ui/react";
import StaffCards from "@/components/common/StaffCards/StaffCards";
import ContactUsForm from "@/components/common/ContactForm/Contact-US-Form";
import styles from "./contact-us.module.css";

function ContactUs() {
  return (
    <div className={styles.container}>
      <Grid templateColumns="repeat(10, 1fr)" gap={2}>
        <GridItem justifyContent={"center"} colSpan={7} mt={6}>
          <Box
            w={"100%"}
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
        <GridItem colSpan={3} mt={6}>
          <StaffCards />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ContactUs;
