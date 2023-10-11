import { Box, Button, Grid, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Box>
      <Grid
        gridTemplateColumns={"1fr 1fr 1fr"}
        height={"75px"}
        bgColor={"teal"}
      >
        <Heading textAlign={"center"} margin="auto" color={"white"}>
          Kelompok 4
        </Heading>
        <Text textAlign={"center"} margin="auto" color="white">
          <Link to="/user-data"></Link>
        </Text>
        <Text textAlign={"center"} margin="auto" color="white">
          <Box display="flex" flexDirection="row" gap="10px">
            <Button colorScheme="teal">Register</Button>
            <Button colorScheme="teal">Login</Button>
          </Box>
        </Text>
      </Grid>
    </Box>
  );
}

export default Navbar;
