import { Box, Input, InputAddon, Heading } from "@chakra-ui/react";
import React from "react";
import { FiFile, FiSearch } from "react-icons/fi";

const Monitoring = () => {
  return (
    <Box py={16} px={6}>
      <Heading color="primary">
        <FiSearch style={{ display: "inline" }} /> Monitoring
      </Heading>
    </Box>
  );
};

export default Monitoring;
