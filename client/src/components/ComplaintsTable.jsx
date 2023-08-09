import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ChakraProvider,
} from "@chakra-ui/react";

const data = [
  {
    category: "",
    dateTime: "",
    suspectAccountType: "",
    suspectAccountLink: "",
    suspectWalletAddress: "",
    transactionId: "",
    otherDetails: "",
    status: "Unassigned",
  },
  // Add more data objects as needed
];

const ComplainsTable = () => {
  return (
    <ChakraProvider>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Category</Th>
            <Th>Date/Time</Th>
            <Th>Suspect Account Type</Th>
            <Th>Suspect Account Link</Th>
            <Th>Suspect Wallet Address</Th>
            <Th>Transaction ID</Th>
            <Th>Other Details</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((entry, index) => (
            <Tr key={index}>
              <Td>{entry.category}</Td>
              <Td>{entry.dateTime}</Td>
              <Td>{entry.suspectAccountType}</Td>
              <Td>{entry.suspectAccountLink}</Td>
              <Td>{entry.suspectWalletAddress}</Td>
              <Td>{entry.transactionId}</Td>
              <Td>{entry.otherDetails}</Td>
              <Td>{entry.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </ChakraProvider>
  );
};

export default ComplainsTable;
