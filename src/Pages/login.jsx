import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
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
  GridItem,
  InputRightElement,
} from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "./Navbar";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [usersData, setUsersData] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    const { email, password } = formData;

    // Cek login berdasarkan data JSON yang sudah dimuat
    const user = usersData.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setIsLoggedIn(true);
      alert("Login Sukses");
      console.log("Login berhasil");
      console.log(email);
      localStorage.setItem("token", email);
    } else {
      alert("Email utowo Passwordmu salah");
      console.error("Login gagal");
    }
  };

  useEffect(() => {
    // Gunakan Axios untuk mengambil data JSON
    axios
      .get("http://localhost:3000/users")
      .then((response) => setUsersData(response.data))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  return (
    <Box>
      <Navbar />
      {isLoggedIn && <Navigate to="/timeline" />}

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
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
                  bg={"teal"}
                  color={"white"}
                  _hover={{
                    bg: "black",
                    color: "white",
                  }}
                  onClick={handleLogin}
                >
                  Sign in
                </Button>
                <Box display='grid' gridTemplateColumns='1fr 1fr' columnGap='5px'>
                  <GridItem>
                  <Text>
                    Don't have an account?
                  </Text>
                  </GridItem>
                  <GridItem>
                  <Text color="#4299E1">
                      <Link to="/register">Register</Link>
                    </Text>
                    </GridItem>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Login;
