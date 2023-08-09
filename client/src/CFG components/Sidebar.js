import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { color } from "framer-motion";
import { FiBook, FiFile, FiHome, FiSettings, FiUsers } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      bg="gray.900"
      color="white"
      w="60"
      h="100vh"
      px="4"
      py="6"
      position="fixed"
      left="0"
      top="0"
    >
      <Flex align="center" mb="8">
        <Text fontSize="2xl" fontWeight="bold">
          Logo
        </Text>
      </Flex>

      <VStack spacing="4" align="flex-start">
        <SidebarLink icon={FiHome} link="home" label="Home" />
        <SidebarLink icon={FiUsers} link="users" label="Users" />
        <SidebarLink icon={FiFile} link="labels" label="Labels" />
        <SidebarLink icon={FiBook} link="blogs" label="Blogs" />
        <SidebarLink icon={FiSettings} link="settings" label="Settings" />
      </VStack>
    </Box>
  );
};

const SidebarLink = ({ icon, label, link }) => {
  const pathName = window.location.pathname;
  console.log("pathName", pathName);
  return (
    <a href={`/${link}`}>
      <Flex
        align="center"
        color={pathName == `/${link}` ? "blue.200" : ""}
        cursor="pointer"
        _hover={{ color: "blue.200" }}
        className="test"
      >
        <Box as={icon} fontSize="xl" mr="2" />
        <Text>{label}</Text>
      </Flex>
    </a>
  );
};

export default Sidebar;
