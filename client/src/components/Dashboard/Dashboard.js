import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { AiFillDashboard } from "react-icons/ai";
import LabelTable from "./LabelTable";
import WebHook from "./WebHook";
import APIRequests from "../../api";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    APIRequests.getLabels()
      .then((res) => {
        let arr = [];
        let label = res.data.foundTransaction;

        for (let i = 0; i < 10; i++) {
          arr.push({
            label: label[i].title,
            boardId: label[i].boardID ?? "",
            cryptoType: label[i].network,
          });
        }

        setData(arr);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  return (
    <Box py={16} px={6}>
      <Heading color="primary">
        <AiFillDashboard style={{ display: "inline" }} /> Dashboard
      </Heading>

      <Grid
        mt={6}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
      >
        <GridItem boxShadow={"lg"} rounded={"lg"} rowSpan={2} colSpan={1}>
          {isLoading ? (
            <Flex w={"100%"} h={"100%"} justify={"center"} align={"center"}>
              <Spinner />
            </Flex>
          ) : (
            <LabelTable data={data} />
          )}
        </GridItem>
        <GridItem boxShadow={"lg"} rounded={"lg"} colSpan={2}>
          {/* {loading ? <Box textAlign={'center'}><Spinner /></Box> :<WebHook />} */}
          <WebHook />
        </GridItem>
        <GridItem colSpan={2} bg="papayawhip" />
        <GridItem colSpan={4} bg="tomato" />
      </Grid>
    </Box>
  );
};

export default Dashboard;
