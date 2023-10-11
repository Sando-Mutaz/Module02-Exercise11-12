import React from "react";
import {
  Box,
  Flex,
  UnorderedList,
  Button,
  ChakraProvider,
  Text,
  HStack,
  Input,
  IconButton,
  Icon,
  VStack,
  Divider,
  Grid,
  Image,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import {
  FaCamera,
  FaMicrophone,
  FaSmile,
  FaHome,
  FaEnvelope,
  FaBell,
  FaUser,
  FaPowerOff,
} from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { BiComment, BiShare } from "react-icons/bi";
import { SlUserFollow } from "react-icons/sl";
import { TiSocialTwitter} from "react-icons/ti"
import { useFormik } from "formik";
import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

// function Tweet({ email, tweet }) {
//   return (
//     <VStack align="start" spacing={2} mb={4}>
//       <Flex align="center">
//         {/* <Avatar size="sm" name={name} src={avatar} mr={2} /> */}
//         <Text fontWeight="bold">{email}</Text>
//         <Text ml={2} color="gray.500">@username</Text>
//       </Flex>
//       <Text>{tweet}</Text>
//       <Divider />
//     </VStack>
//   );
// }

const token = localStorage.getItem("token");

function App() {
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = () => {
    setIsLoggedOut(true);
    localStorage.removeItem("token");
  };

  const handleItemClick = (item) => {
    alert(`Clicked: ${item}`);
  };

  const tweetspost = async (email, tweet) => {
    try {
      await axios.post("http://localhost:3000/tweets", {
        email,
        tweet,
      });

      alert("success");
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      tweet: "",
    },
    onSubmit: (values) => {
      tweetspost(token, values.tweet);
    },
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tweets");
      setTweets(response.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const listItemStyle = {
    listStyleType: "none", // Remove the bullet point
  };
  console.log(token);

  const filteredUsers = users.filter((user) => user.email !== token);
  // console.log("data :"(filteredUsers))

  return (
    <ChakraProvider>
      {isLoggedOut && <Navigate to="/" />}

      {/* Top Navbar */}
      <Box
        bg="teal"
        color="white"
        p={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Left Side (Logo) */}
        <Flex marginLeft={'3rem'} alignItems={'center'} alignContent={'center'}>
          <TiSocialTwitter
          fontSize="40px"/>
          <Text as={"b"} fontSize={'20px'} margin={'auto'}>groupFour</Text>
        </Flex>

        {/* Right Side (User Info) */}
        <HStack spacing={2} alignItems="center" mr={'60px'}>
          {/* <Avatar size="sm" name="John Doe" src="https://placekitten.com/200/200" /> */}
          <FaUser size={"20px"} marginRight={"15px"} />
          <Text fontWeight="bold">{token}</Text>
        </HStack>
      </Box>

      <Flex paddingTop={"2%"}>
        {/* Sidebar */}
        <Box w="250px" bgColor="whiteAlpha.500" p={4} color="white">
          <UnorderedList p={0}>
            <li style={listItemStyle}>
              <Button
                colorScheme="teal"
                variant="ghost"
                leftIcon={<Icon as={FaHome} />}
              >
                Home
              </Button>
            </li>
            <li style={listItemStyle}>
              <Button
                colorScheme="teal"
                variant="ghost"
                leftIcon={<Icon as={FaBell} />}
              >
                Notifications
              </Button>
            </li>
            <li style={listItemStyle}>
              <Button
                colorScheme="teal"
                variant="ghost"
                leftIcon={<Icon as={FaEnvelope} />}
              >
                Messages
              </Button>
            </li>
            <li style={listItemStyle}>
              <Button
                colorScheme="teal"
                variant="ghost"
                leftIcon={<Icon as={FaUser} />}
              >
                Profile
              </Button>
            </li>
            <li style={listItemStyle}>
              <Button
                colorScheme="teal"
                variant="ghost"
                leftIcon={<Icon as={FaPowerOff} />}
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </li>
          </UnorderedList>
        </Box>

        {/* Main Content */}
        <Box
          flex="1"
          p={10}
          boxShadow={
            "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px"
          }
          width={'100%'}
        >
          {/* Tweet Input Box */}
  

          
          <form onSubmit={formik.handleSubmit}>
          <Flex className="tweet-container"
            padding={'0'}
            left='0'
            width={"100%"}
            >
              <Box boxSize={'150px'}
              marginRight={'2%'}>
                <Image 
                  rounded="full"
                  width="100%"
                  
                  objectFit={'cover'}
                  src="https://pbs.twimg.com/profile_images/1329647526807543809/2SGvnHYV_400x400.jpg"/>
                </Box>
            <Flex flexDirection={'column'} width={"100%"}>
            <Textarea
              name="tweet"
              value={formik.values.tweet}
              onChange={formik.handleChange}
              placeholder="What's happening?"
              mb={4}
              width={"100%"}
              
            />
            

            {/* Icons for Gallery, Voice Recording, and Emoticons */}
            <HStack spacing={4} mb={4} position={'relative'} marginBottom={20}>
              <IconButton
                icon={<Icon as={FaCamera} />}
                aria-label="Gallery"
                colorScheme="teal"
              />
              <IconButton
                icon={<Icon as={FaMicrophone} />}
                aria-label="Voice Recording"
                colorScheme="teal"
              />
              <IconButton
                icon={<Icon as={FaSmile} />}
                aria-label="Emoticons"
                colorScheme="teal"
              />
              <Button ml={'auto'}  colorScheme="teal" size="md" type="submit">
                Send Tweet
              </Button>
              
            </HStack>
            </Flex>
            </Flex>
            
          </form>
          

          {/* Send Tweet Button */}

          {/* Display Tweets */}
          {tweets.map((tweet, index) => (
            //   <VStack key={index} align="start" spacing={2} mb={4}>
            //   <Flex align="center">
            //     <Avatar size="sm" src="https://placekitten.com/200/200" mr={2} />
            //     <Text fontWeight="bold">{tweet.email}</Text>
            //     <Text ml={2} color="gray.500"></Text>
            //   </Flex>
            //   <Text>{tweet.tweet}</Text>
            //   <Divider />
            // </VStack>
            <Box
              key={index}
              boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
              // margin="5%"
            >
              <HStack>
                <Grid boxSize={"30px"} marginLeft={"5%"} marginTop={"3%"}>
                  <Image
                    rounded="full"
                    width="100%"
                    objectFit={"cover"}
                    src="https://pbs.twimg.com/profile_images/1329647526807543809/2SGvnHYV_400x400.jpg"
                  />
                </Grid>
                <Grid marginLeft={"2%"} marginTop={"3%"}>
                  <Text as={"b"}>{tweet.email}</Text>
                </Grid>
              </HStack>
              <VStack>
                <Box width={"100%"}>
                  <Box margin={"2% 5%"}>
                    <Text>{tweet.tweet}</Text>
                  </Box>
                </Box>
                <Grid
                  gridTemplateColumns={"1fr 1fr 1fr"}
                  width={"100%"}
                  marginBottom={"3%"}
                >
                  <Box margin={"auto"}>
                    <AiOutlineLike />
                  </Box>
                  <Box margin={"auto"}>
                    <BiComment />
                  </Box>
                  <Box margin={"auto"}>
                    <BiShare />
                  </Box>
                </Grid>
              </VStack>
            </Box>
          ))}
        </Box>

        {/* Who to Follow (Right Sidebar) */}
        <Box w="250px" p={4}>
          <Box mb={4}>
            <Text fontWeight="bold" mb={2}>
              Who to Follow
            </Text>
            <ul>
              {filteredUsers.map((item, index) => (
                <li style={listItemStyle}>
                  <Flex align="center">
                    {/* <Avatar size="sm" name="Jane Smith" src="https://placekitten.com/200/201" mr={2} /> */}
                    <Button
                      colorScheme="teal"
                      variant="ghost"
                      onClick={() => handleItemClick("User 1")}
                      leftIcon={<Icon as={SlUserFollow}></Icon>}
                    >
                      {item.name}
                    </Button>
                  </Flex>
                </li>
              ))}
            </ul>
            <Button margin="auto" color="teal">
                <Link to="/user-data">See More</Link>
            </Button>
          </Box>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
