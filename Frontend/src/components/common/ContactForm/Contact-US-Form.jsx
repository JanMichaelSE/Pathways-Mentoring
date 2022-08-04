import React from "react";
import { Grid, GridItem, Checkbox } from "@chakra-ui/react";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

import Input from "@/components/common/Input/input";
import InputMessage from "../InputMessage/InputMessage.jsx";

import styles from "./Contact-US-Form.module.css";

export default function ContactUsForm() {
  const toast = useToast();
  const [isLessThan1135] = useMediaQuery("(max-width: 1135px)");

  function inputWidth() {
    return isLessThan1135 ? "20rem" : "27rem";
  }

  async function handleSubmit(studentInfo) {
    // const userResponse = await httpLogin(studentInfo);

    const userResponse = undefined;

    if (userResponse.hasError) {
      return toast({
        description: userResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }
}

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          topic: "",
          email: "",
          telephone: "",
          message: "",
          privacyPolicyAccept: false
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required."),
          topic: Yup.string().required("Topic is required."),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required."),
          telephone: Yup.string()
            .matches(
              /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
              "Phone number is not valid"
            )
            .min(10, "Phone number must be 10 digits")
            .required("Telephone is required."),
          message: Yup.string()
            .max(1500, "Max character limit of 1500 reached.")
            .required("Message required."),
        })}
        onSubmit={async (values) => {
          await handleSubmit(values);
        }}
      >
        <Form>
          <Grid templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem mt={5}>
              <Input
                name="name"
                type="text"
                label="Name *"
                width={inputWidth()}
              />
            </GridItem>
            <GridItem mt={5}>
              <Input
                name="topic"
                type="text"
                label="Topic *"
                width={inputWidth()}
              />
            </GridItem>

            <GridItem>
              <Input
                name="email"
                type="email"
                label="Email *"
                width={inputWidth()}
              />
            </GridItem>
            <GridItem>
              <Input
                name="telephone"
                type="tel"
                label="Telephone *"
                width={inputWidth()}
              />
            </GridItem>
            <GridItem colSpan={2} rowSpan={3}>
              <InputMessage
                name="message"
                type="textarea"
                label="Message *"
                width={"55rem"}
              />
            </GridItem>
            <GridItem colSpan={2} colStart={1}>
              <Checkbox size="lg" colorScheme="blue">
                I have read and agree to the Privacy Policy of the Polytechnic
                University of Puerto Rico
              </Checkbox>
            </GridItem>
            <GridItem colStart={2} col>
              <button type="submit" className={styles.button}>
                Submit
              </button>
            </GridItem>
          </Grid>
        </Form>
      </Formik>
    </>
  );
}