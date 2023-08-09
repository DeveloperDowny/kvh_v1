import { Box, Input, InputAddon, Heading, Flex, Stack, Divider, Button } from "@chakra-ui/react";
import React from "react";
import { FiFile, FiSearch } from "react-icons/fi";
import WebHook from "../Dashboard/WebHook";
import CurrenNode from "./CurrentNode";
import Tile from "./Tile";

const Monitoring = () => {
  return (
    <Flex py={16} px={6} w={'full'} align={'center'} flexDirection={'column'} >
      <Heading color="primary" alignSelf={'flex-start'}>
        <FiSearch style={{ display: "inline" }} /> Monitoring <Button variant={'outline'} colorScheme="blue">+</Button>
      </Heading>
      <Flex mt={6} w={'75%'} flexDirection={'column'} justify={'center'} align={'center'} >
        <CurrenNode />
        <Divider />
        <Stack w={'full'} align={'center'} mt={10}>
          <Tile />
          <Tile />
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Monitoring;
