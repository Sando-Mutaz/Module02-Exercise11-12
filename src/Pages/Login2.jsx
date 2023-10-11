import React, { useState, useEffect } from 'react';
import {Navigate} from 'react-router-dom'
import Axios from 'axios';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import login from '../Redux/Reducer/AuthReducer'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [usersData, setUsersData] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });

    dispatch(login(e));
  };

  // const handleLogin = () => {
  //   const { email, password } = formData;

  //   // Cek login berdasarkan data JSON yang sudah dimuat
  //   const user = usersData.find((user) => user.email === email && user.password === password);


  //   if (user) {
  //     setIsLoggedIn(true)
  //     alert('Login Berhasil')
  //     console.log('Login berhasil');
  //   } else {
  //     alert('Email atau Password yang anda masukkan salah')
  //     console.error('Login gagal');
  //   }
  // };

  // useEffect(() => {
  //   // Gunakan Axios untuk mengambil data JSON
  //   Axios.get('http://localhost:3000/users')
  //     .then((response) => setUsersData(response.data))
  //     .catch((error) => console.error('Error loading data:', error));
  // }, []);

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" maxW="400px" mx="auto">
      {isLoggedIn && <Navigate to="/timeline" />}
      <VStack spacing={4}>
        <Heading as="h2" size="md">
          Login
        </Heading>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
    </Box>
  );
}

export default Login;
