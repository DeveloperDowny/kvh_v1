import React from "react";
import {
  ChakraProvider,
  CSSReset,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const ComplaintForm = () => {
  const initialValues = {
    category: "",
    dateTime: "",
    suspectAccountType: "",
    suspectAccountLink: "",
    suspectWalletAddress: "",
    transactionId: "",
    otherDetails: "",
    status: "Unassigned",
  };

  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Required"),
    dateTime: Yup.string().required("Required"),
    suspectAccountType: Yup.string().required("Required"),
    suspectAccountLink: Yup.string().required("Required"),
    suspectWalletAddress: Yup.string().required("Required"),
    transactionId: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    console.log(values);
    // You can handle form submission logic here
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <Box p={8}>
        <Heading mb={4}>File a Cyber Complaint</Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <FormControl
                id="category"
                mb={4}
                isInvalid={errors.category && touched.category}
              >
                <FormLabel>Category of Complaint</FormLabel>
                <Field
                  as={Select}
                  name="category"
                  placeholder="Select a category"
                >
                  <option value="sextortion">Sextortion</option>
                  <option value="ransomware">Ransomware</option>
                  <option value="other">Other</option>
                </Field>
              </FormControl>

              <FormControl
                id="dateTime"
                mb={4}
                isInvalid={errors.dateTime && touched.dateTime}
              >
                <FormLabel>Approximate Date and Time</FormLabel>
                <Field as={Input} type="datetime-local" name="dateTime" />
              </FormControl>

              <FormControl
                id="suspectAccountType"
                mb={4}
                isInvalid={
                  errors.suspectAccountType && touched.suspectAccountType
                }
              >
                <FormLabel>Suspect Account Type</FormLabel>
                <Field
                  as={Select}
                  name="suspectAccountType"
                  placeholder="Select an account type"
                >
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter</option>
                  <option value="telegram">Telegram</option>
                  <option value="other">Other</option>
                </Field>
              </FormControl>

              <FormControl
                id="suspectAccountLink"
                mb={4}
                isInvalid={
                  errors.suspectAccountLink && touched.suspectAccountLink
                }
              >
                <FormLabel>Suspect Account Link</FormLabel>
                <Field as={Input} type="text" name="suspectAccountLink" />
              </FormControl>

              <FormControl
                id="suspectWalletAddress"
                mb={4}
                isInvalid={
                  errors.suspectWalletAddress && touched.suspectWalletAddress
                }
              >
                <FormLabel>Suspect Wallet Address</FormLabel>
                <Field as={Input} type="text" name="suspectWalletAddress" />
              </FormControl>

              <FormControl
                id="transactionId"
                mb={4}
                isInvalid={errors.transactionId && touched.transactionId}
              >
                <FormLabel>Transaction ID</FormLabel>
                <Field as={Input} type="text" name="transactionId" />
              </FormControl>

              <FormControl
                id="otherDetails"
                mb={4}
                isInvalid={errors.otherDetails && touched.otherDetails}
              >
                <FormLabel>Other Details</FormLabel>
                <Field as={Textarea} name="otherDetails" />
              </FormControl>

              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </ChakraProvider>
  );
};

export default ComplaintForm;
