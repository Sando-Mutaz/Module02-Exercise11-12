import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <Box>
        <Grid 
        gridTemplateColumns={'1fr 1fr 1fr'}
        height={'75px'}
        bgColor={'teal'}>
            <Heading textAlign={'center'} margin='auto' color={'white'}>Kelompok 2</Heading>
            <Text textAlign={'center'} margin='auto' color='white'>
                <Link to="/user-data">User</Link>
            </Text>
            <Text textAlign={'center'} margin='auto' color='white'>
              <Box display='flex' flexDirection='row' gap='10px'>
              <Text backgroundColor='teal' textColor='white' border='solid 1px white' borderRadius='10px' padding='0px 7px 5px 7px'>
              <Link to="/register">Register</Link>
                </Text>
                <Text backgroundColor='white' textColor='teal' borderRadius='10px' padding='0px 7px 5px 7px'>
                <Link to="/">Login</Link>
                </Text>
                </Box>
            </Text>
        </Grid>
    </Box>
  )
}

export default Navbar