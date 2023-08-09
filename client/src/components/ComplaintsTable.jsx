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
    category: "Fraud",
    dateTime: "2023-08-09 10:30 AM",
    suspectAccountType: "Email",
    suspectAccountLink: "example@example.com",
    suspectWalletAddress: "0x1234567890abcdef",
    transactionId: "abc123",
    otherDetails: "Some additional details about the case.",
    status: "Unassigned",
  },
  {
    category: "Money Laundering",
    dateTime: "2023-08-09 02:15 PM",
    suspectAccountType: "Username",
    suspectAccountLink: "@fakeuser",
    suspectWalletAddress: "0x9876543210fedcba",
    transactionId: "def456",
    otherDetails: "Additional information related to the case.",
    status: "In Progress",
  },
  {
    category: "Scam",
    dateTime: "2023-08-09 05:45 AM",
    suspectAccountType: "Phone Number",
    suspectAccountLink: "+1234567890",
    suspectWalletAddress: "0xfedcba0987654321",
    transactionId: "ghi789",
    otherDetails: "Detailed description of the case.",
    status: "Closed",
  },
  {
    category: "Identity Theft",
    dateTime: "2023-08-10 01:30 PM",
    suspectAccountType: "Social Media",
    suspectAccountLink: "@identitythief",
    suspectWalletAddress: "0x6543210987abcdef",
    transactionId: "jkl012",
    otherDetails: "Additional context about the case.",
    status: "Unassigned",
  },
  {
    category: "Hacking",
    dateTime: "2023-08-11 11:00 AM",
    suspectAccountType: "IP Address",
    suspectAccountLink: "192.168.1.1",
    suspectWalletAddress: "0x0123456789abcdef",
    transactionId: "mno345",
    otherDetails: "Elaboration on the case details.",
    status: "In Progress",
  },
  {
    category: "Insider Trading",
    dateTime: "2023-08-11 03:45 PM",
    suspectAccountType: "Employee ID",
    suspectAccountLink: "#12345",
    suspectWalletAddress: "0xabcdef0123456789",
    transactionId: "pqr567",
    otherDetails: "Additional insights into the case.",
    status: "Closed",
  },
  {
    category: "Phishing",
    dateTime: "2023-08-12 09:20 AM",
    suspectAccountType: "URL",
    suspectAccountLink: "http://fakephish.com",
    suspectWalletAddress: "0x56789abcdef0123",
    transactionId: "stu789",
    otherDetails: "Further notes about the case.",
    status: "Unassigned",
  },
  {
    category: "Embezzlement",
    dateTime: "2023-08-12 01:00 PM",
    suspectAccountType: "Bank Account",
    suspectAccountLink: "1234567890",
    suspectWalletAddress: "0x89abcdef01234567",
    transactionId: "vwx890",
    otherDetails: "More information about the case.",
    status: "In Progress",
  },
  {
    category: "Bribery",
    dateTime: "2023-08-13 10:10 AM",
    suspectAccountType: "Company Name",
    suspectAccountLink: "FakeCorp",
    suspectWalletAddress: "0x0123456789abcdef",
    transactionId: "yz012",
    otherDetails: "Additional case context.",
    status: "Closed",
  },
  {
    category: "Data Breach",
    dateTime: "2023-08-13 03:30 PM",
    suspectAccountType: "Server IP",
    suspectAccountLink: "123.456.78.90",
    suspectWalletAddress: "0xabcdef0123456789",
    transactionId: "abc123",
    otherDetails: "In-depth information about the case.",
    status: "Unassigned",
  },
];

const ComplainsTable = () => {
  return (
    <ChakraProvider>
      <Table variant="striped" colorScheme="blue">
        <Thead color="white" bg="#0262AF">
          <Tr>
            <Th color="white">Category</Th>
            <Th color="white">Date/Time</Th>
            <Th color="white">Suspect Account Type</Th>
            <Th color="white">Suspect Account Link</Th>
            <Th color="white">Suspect Wallet Address</Th>
            <Th color="white">Transaction ID</Th>
            <Th color="white">Other Details</Th>
            {/* <Th>Case Status</Th> */}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((entry, index) => (
            <Tr key={index}>
              <Td>{entry.category}</Td>
              <Td>{entry.dateTime}</Td>
              <Td>{entry.suspectAccountType}</Td>
              <Td>{entry.suspectAccountLink}</Td>
              {/* <Td>{entry.suspectWalletAddress}</Td> */}
              <Td>
                <a
                  href={`/boards/${entry.suspectWalletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-underline"
                >
                  {entry.suspectWalletAddress}
                </a>
              </Td>
              <Td>{entry.transactionId}</Td>
              <Td>{entry.otherDetails}</Td>
              {/* <Td>{entry.status}</Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </ChakraProvider>
  );
};

export default ComplainsTable;
