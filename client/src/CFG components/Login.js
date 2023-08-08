import { Formik, Form, Field } from "formik";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select, // Import Select component
} from "@chakra-ui/react";
import { object, string } from "yup";
import APIRequests from "../api";
import { useNavigate } from "react-router-dom";
import { ActionTypes, auth } from "../reducers/auth";
import { useAppDispatch } from "../store";
import { setShouldShowSideBar } from "../reducers/SiteCustom";
import { useEffect } from "react";

const validationSchema = object({
  email: string().email("Invalid email address").required("Email is required"),
  password: string().required("Password is required"),
  // userRole: string().required("User role is required"), // Add userRole validation
});

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setShouldShowSideBar(false));
  }, []);

  const handleSubmit = async (values) => {
    const res = await APIRequests.signIn(values).catch((err) => {
      console.log("Error in SignIn", err);
    });

    if (!res) {
      console.log("Error in SignIn");
      return;
    }

    console.log("res", res);

    dispatch(
      auth({
        result: {
          name: res.data.name || "",
          email: values.email || "",
          token: res.data.token || "",
          privilege: res.data.privilege || 0,
          uid: res.data.uid || "",
          user_role: res.data.user_role || "",
        },
        type: ActionTypes.AUTH,
      })
    );

    navigate("/boards/71a0d6d8");
  };

  return (
    <Flex
      // className="t-w-full t-min-h-[calc(100vh-172px)]"
      className="t-w-full t-min-h-[calc(100vh-207px)]"
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Formik
            initialValues={{
              email: "",
              password: "",
              // , userRole: ""
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Field
                    as={Input}
                    type="email"
                    name="email"
                    autoComplete="email"
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Field as={Input} type="password" name="password" />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox name="rememberMe">Remember me</Checkbox>
                    <Link color={"blue.400"}>Forgot password?</Link>
                  </Stack>
                  <Button
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </Form>
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}
