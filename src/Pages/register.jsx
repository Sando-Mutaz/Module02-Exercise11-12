import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  FormErrorMessage,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Username must be contain 4 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .required("Please Enter your password")
    .test(
      "regex",
      "Password must be min 8 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase",
      (val) => {
        let regExp = new RegExp(
          "^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
        );
        console.log(regExp.test(val), regExp, val);
        return regExp.test(val);
      }
    ),
  confirmationPassword: Yup.string().test(
    "passwords-match",
    "Passwords must match",
    function (value) {
      return this.parent.password === value;
    }
  ),
});

export default function Register() {
  const [data, setData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const register = async (username, email, password) => {
    try {
      await axios.post("http://localhost:3000/users", {
        username,
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
      username: "",
      email: "",
      password: "",
      confirmationPassword: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      register(
        values.username,
        values.email,
        values.password,
        values.confirmationPassword
      );
    },
  });

  return (
    <Box>
      <Navbar />
      <form onSubmit={formik.handleSubmit}>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Register
              </Heading>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl
                  isInvalid={formik.touched.username && formik.errors.username}
                  nb={5}
                  name="username"
                  id="username"
                >
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <FormErrorMessage>
                      {formik.errors.username}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isInvalid={formik.touched.email && formik.errors.email}
                  nb={5}
                  name="email"
                  id="email"
                >
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isInvalid={formik.touched.password && formik.errors.password}
                  nb={5}
                  id="password"
                  name="password"
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {formik.touched.password && formik.errors.password && (
                    <FormErrorMessage>
                      {formik.errors.password}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isInvalid={
                    formik.touched.confirmationPassword &&
                    formik.errors.confirmationPassword
                  }
                  nb={5}
                  name="confirmationPassword"
                  id="confirmationPassword"
                >
                  <FormLabel>Confirmation Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      onChange={formik.handleChange}
                      value={formik.values.confirmationPassword}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {formik.touched.confirmationPassword &&
                    formik.errors.confirmationPassword && (
                      <FormErrorMessage>
                        {formik.errors.confirmationPassword}
                      </FormErrorMessage>
                    )}
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"teal"}
                    color={"white"}
                    _hover={{
                      bg: "black",
                      color: "white",
                    }}
                    type="submit"
                  >
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Box display='grid' gridTemplateColumns='1fr 1fr' columnGap='5px'>
                <GridItem>
                <Text align={"center"}>
                  Already a user?{" "}
                </Text>
                </GridItem>
                <GridItem>
                <Text color='#4299E1'>
                  <Link to="/" >
                    Login
                  </Link>
                    </Text>
                    </GridItem>
              </Box>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </form>
    </Box>
  );
}
