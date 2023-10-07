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
                <Link to="/register">Register</Link>
            </Text>
        </Grid>
    </Box>
  )
}

export default Navbar