import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { Box, 
Table,
Thead,
Tbody,
Tfoot,
Tr,
Th,
Td,
TableCaption,
TableContainer,
} from '@chakra-ui/react'

import Navbar from './Navbar';







function UserData() {

    const [data, setData] = useState()


    const fetchData = async () => {
        try {
          const response = await axios.get ("http://localhost:3000/users");
          // const res = await response.json()
          setData(response.data);
          console.log(response)
        } catch (err) {
          console.log(err);
        }
      };

      useEffect (() => {
        fetchData();
      }, []);

  return (
    <Box>
        <Navbar />
    
    <Box margin={'10%'}>
        <Table variant='striped' colorScheme='teal'>
            <Thead>
                <Tr>
                    <Th>NAME</Th>
                    <Th>EMAIL</Th>
                    <Th>PASSWORD</Th>
                </Tr>
            </Thead>
            <Tbody>
          {data?.length > 0 ? (
            data.map((item) => {
              return (
                <Tr key={item.id}>
                  <Td>{item.username}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.password}</Td>
                </Tr>
              );
            })
          ) : (
            <Tr>
              <Td colSpan={3}>No data available</Td>
            </Tr>
          )}
        </Tbody>
        </Table>

        
    </Box>
    </Box>
  )
}

export default UserData