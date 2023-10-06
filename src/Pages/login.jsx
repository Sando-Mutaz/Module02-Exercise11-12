import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  FormErrorMessage,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(7, "Password must be 7 characters minimum")
    .required("Password is required"),
});

export default function Login() {
  const [data, setData] = useState([]);

  const register = async (email, password) => {
    try {
      await axios.post("http://localhost:3000/user", {
        email,
        password,
      });

      alert("success");
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      register(values.email, values.password);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Login</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl
                isInvalid={formik.touched.email && formik.errors.email}
                nb={5}
                id="email"
              >
                <FormLabel>Email address</FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </InputGroup>
                {formik.touched.email && formik.errors.email && (
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isInvalid={formik.touched.password && formik.errors.password}
                nb={5}
                id="password"
              >
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password && (
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                )}
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color={"blue.400"}>Forgot password?</Text>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
                <Box>
                  <Text>
                    Don't have an account?{" "}
                    <Text color="#4299E1">
                      <Link to="/register">Register</Link>
                    </Text>
                  </Text>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}
