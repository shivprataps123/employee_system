import { Box, Button, Flex, IconButton, Link, Text, useColorMode } from "@chakra-ui/react";
import {FaLightbulb} from  'react-icons/fa'
import Add_details from "../Pages/Add_details";
function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
    position="fixed"
    zIndex="999"
    top="0"
    w="100%"
     h="70px"
     px="50px"
     display="flex"
     justifyContent="space-between"
     alignItems="center"
     bg={colorMode === "light" ? "#03a9f4 " : "rgb(33,33,33)"}
     >
      <Text cursor="pointer" display={["none","block","block"]} fontFamily="sans-serif" fontSize="30px" fontWeight="bold" color="white">Employees</Text>
   <Box display="flex">
    <Add_details/>
    <Box mt="3px">
   <FaLightbulb
    onClick={toggleColorMode}
     color="white"
     fontSize="32px" 
     text-align="center"
     cursor="pointer"
  />
  </Box>
 </Box>
    </Box>
  );
}
export default Navbar;