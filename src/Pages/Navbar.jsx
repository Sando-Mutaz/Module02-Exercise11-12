import { Box, Button, Grid, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { TiSocialTwitter } from "react-icons/ti"

function Navbar() {


  return (
    <Box>
      <Grid
        gridTemplateColumns={"1fr 1fr 1fr"}
        height={"75px"}
        bgColor={"teal"}
      >
        
        <Link to={'/timeline'}>
        <Flex marginLeft={"3rem"} marginTop="1rem" alignItems={'center'} alignContent={'center'}>
          <TiSocialTwitter
          fontSize="40px" color="white"/>
          <Text as={"b"} color="white" fontSize={'20px'}>groupFour</Text>
        </Flex>
        </Link>
        
        <Text textAlign={"center"} margin="auto" color="white">
          <Link to="/user-data"></Link>
        </Text>
        <Text textAlign={"center"} margin="auto" color="white">
          <Box display="flex" flexDirection="row" gap="10px">
          <Link to="/register">
            <Button colorScheme="teal">Register</Button>
          </Link>
          <Link to="/">
          <Button colorScheme="teal">Login</Button>
          </Link>
            
          </Box>
        </Text>
      </Grid>
    </Box>
  );
}

export default Navbar;
