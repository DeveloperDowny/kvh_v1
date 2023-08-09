import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { color } from "framer-motion";
import { AiFillDashboard } from "react-icons/ai";
import { FiCalendar,  FiHome, FiList, FiSearch, FiSettings, FiUsers } from "react-icons/fi";

const Sidebar = () => {
  
  return (
    <Box
      bg="gray.900"
      color="white"
      w="60"
      h="100vh"
      px="4"
      py="36"
      position="fixed"
      left="0"
      top="0"

    >

      <VStack spacing="4" align="flex-start">
        <SidebarLink icon={FiHome} link='home' label="Home" />
        <SidebarLink icon={AiFillDashboard} link='dashboard' label="Dashboard" />
        <SidebarLink icon={FiCalendar} link='boards' label="Boards" />
        <SidebarLink icon={FiUsers} link='users' label="Users" />
        <SidebarLink icon={FiList} link='labels' label="Labels" />
        <SidebarLink icon={FiSearch} link='monitoring' label="Monitoring" />
        <SidebarLink icon={FiSettings} link='settings' label="Settings" />
      </VStack>
    </Box>
  );
};

const SidebarLink = ({ icon, label, link }) => {
  const pathName = window.location.pathname;
  console.log("pathName", pathName)
  return (
    <a href={`/${link}`}>
      <Flex align="center" color={pathName == `/${link}` ? 'blue.300' : ''}  cursor='pointer' _hover={{ color: 'blue.200' }} className="test">
        <Box as={icon} fontSize="xl" mr="2" />
        <Text>{label}</Text>
      </Flex>
    </a>
  );
};

export default Sidebar;
