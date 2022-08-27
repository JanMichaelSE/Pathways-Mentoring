import { Grid, GridItem } from "@chakra-ui/react";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

import InputForm from "@/components/common/InputForm/InputForm";
import InputMessage from "../InputMessage/InputMessage.jsx";
import { httpSendContactForm } from "@/api/user.api.js";

import styles from "./Contact-US-Form.module.css";

export default function ContactUsForm() {
  const toast = useToast();
  const [isLessThan1135] = useMediaQuery("(max-width: 1135px)");

  function inputWidth() {
    return isLessThan1135 ? "18rem" : "25rem";
  }

  function inputMessageWidth() {
    return isLessThan1135 ? "38rem" : "50rem";
  }

  async function handleSubmit(contactInfo) {
    console.log("Contact Values: ", contactInfo);
    const response = await httpSendContactForm(contactInfo);

    if (response.hasError) {
      return toast({
        description:
          "Submission of Contact Us Form failed. Please try again later.",
        status: "error",
        position: "top",
        duration: 5000,
      });
    }

    return toast({
      title: "Form Sent!",
      description: "Pathjways Staff will communicate back soon.",
      status: "success",
      position: "top",
      duration: 7000,
    });
  }

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          topic: "",
          email: "",
          phone: "",
          message: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required."),
          topic: Yup.string().required("Topic is required."),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required."),
          phone: Yup.string()
            .matches(
              /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
              "Phone number is not valid"
            )
            .min(10, "Phone number must be 10 digits")
            .required("Telephone is required."),
          message: Yup.string()
            .test(
              "len",
              "Max character limit of 1500 reached.",
              (val) => (val?.length || 0) < 1500
            )
            .required("Message required."),
          privacyPolicyAccept: Yup.bool().oneOf(
            [true],
            "Field must be checked"
          ),
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
                name="phone"
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
                width={inputMessageWidth()}
              />
            </GridItem>
            <GridItem colStart={2}>
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
