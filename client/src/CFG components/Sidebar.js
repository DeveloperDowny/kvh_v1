import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { color } from "framer-motion";
import { FiHome, FiSettings, FiUsers } from "react-icons/fi";

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
        <SidebarLink icon={FiHome} label="Home" />
        <SidebarLink icon={FiUsers} label="Users" />
        <SidebarLink icon={FiSettings} label="Settings" />
      </VStack>
    </Box>
  );
};

const SidebarLink = ({ icon, label }) => {
  return (
    <Flex align="center" cursor='pointer' _hover={{ color: 'red.100' }} className="test">
      <Box as={icon} fontSize="xl" mr="2" />
      <Text>{label}</Text>
    </Flex>
  );
};

export default Sidebar;
