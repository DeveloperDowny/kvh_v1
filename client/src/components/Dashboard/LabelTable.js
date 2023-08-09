import React from 'react'

import { Table, Text, Th, Thead, Tbody, TableContainer, Td, Tr } from '@chakra-ui/react'
const LabelTable = ({ data }) => {
    console.log(data)
    return (
        <>
            <TableContainer>
                <Table variant="striped">
                    <Thead bgColor='primary' >
                        <Th color='white'>Label</Th>
                        <Th color='white'>BoardLink</Th>
                        <Th color='white'>Crypto</Th>
                    </Thead>
                    <Tbody>
                        {data && data.length > 0 ? data.map((data, id) => (
                            <TableRow key={id} label={data.label} boardId={data.boardId} cryptoType={data.cryptoType} />
                        )) : <Text p={5}>No Labels Found</Text>}

                    </Tbody>
                </Table>
                {/* <EmptyState show={false} /> */}
            </TableContainer>
        </>
    )
}

const TableRow = ({ label, boardId, cryptoType }) => {

    return (
        <Tr>
            <Td>{label}</Td>
            <Td maxW={'400px'} pr={10} overflow={'hidden'}>
                <a href={`/${boardId}`}>
                    {boardId}
                </a>
            </Td>
            <Td maxW={'400px'} pr={10} overflow={'hidden'}>
                {cryptoType}
            </Td>
        </Tr>
    );
};

export default LabelTable