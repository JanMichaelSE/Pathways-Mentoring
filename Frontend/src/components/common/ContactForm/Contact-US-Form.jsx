import React, {useState} from "react";
import { Grid, GridItem, Checkbox } from "@chakra-ui/react";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

import InputForm from "@/components/common/InputForm/InputForm"
import InputMessage from "../InputMessage/InputMessage.jsx";

import styles from "./Contact-US-Form.module.css";

export default function ContactUsForm() {
  const toast = useToast();
  const [checked, setChecked] = React.useState(false);
  const [isLessThan1135] = useMediaQuery("(max-width: 1135px)");

  const handleCheckboxChange = () => { 
    
    setChecked(!checked);
  };

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
          privacyPolicyAccept: checked
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
            .test("len", "Max character limit of 1500 reached.", val => val.length < 1500)
            .required("Message required."),
          privacyPolicyAccept: Yup.bool()
            .oneOf([true], 'Field must be checked')
        })}
        onSubmit={async (values) => {
          await handleSubmit(values);
        }}
      >
        <Form>
          <Grid templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem mt={5}>
            <InputForm
                name="name"
                type="text"
                label="Name *"
                width={inputWidth()}
              />
            </GridItem>
            <GridItem mt={5}>
            <InputForm
                name="topic"
                type="text"
                label="Topic *"
                width={inputWidth()}
              />
            </GridItem>

            <GridItem>
              <InputForm
                name="email"
                type="email"
                label="Email *"
                width={inputWidth()}
              />
            </GridItem>
            <GridItem>
            <InputForm
                name="telephone"
                type="tel"
                label="Telephone *"
                width={inputWidth()}
              />
            </GridItem>
            <GridItem colSpan={2} rowSpan={3}>
              <InputMessage
                maxLength={1500}
                name="message"
                type="textarea"
                label="Message *"
                width={"55rem"}
              />
            </GridItem>
            <GridItem colSpan={2} colStart={1}>
              <Checkbox onChange={handleCheckboxChange} value={checked} size="lg" iconColor={"#858B8D"} colorScheme={"blackAlpha.400"}>
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