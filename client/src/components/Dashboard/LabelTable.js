import React from 'react'
import APIRequests from '../../api'
import { Table, Th, Thead, Tbody, TableContainer, Td, Tr } from '@chakra-ui/react'
const LabelTable = () => {
    const mfetch = async () => {
        console.log("fetching");
        const res = await APIRequests.getLabels().catch(
            (err) => console.log("error in mfetch")

        )
        if (!res) return
        console.log(res)
    }

    React.useEffect(() => {
        mfetch()
        // APIRequests.getLabels()
    }, [])

    return (
        <>
            <TableContainer>
                <Table variant="striped">
                    <Thead bgColor='primary' >
                        <Th color='white'>Label</Th>
                        <Th color='white'>BoardLink</Th>
                    </Thead>
                    <Tbody>
                        <TableRow linkData='asd' id='1' targetDomain='a' />
                        <TableRow linkData='asd' id='1' targetDomain='a' />
                        <TableRow linkData='asd' id='1' targetDomain='a' />
                        <TableRow linkData='asd' id='1' targetDomain='a' />
                        <TableRow linkData='asd' id='1' targetDomain='a' />
                        <TableRow linkData='asd' id='1' targetDomain='a' />
                        <TableRow linkData='asd' id='1' targetDomain='a' />
                        <TableRow linkData='asd' id='1' targetDomain='a' />
                        <TableRow linkData='asd' id='1' targetDomain='a' />
                        <TableRow linkData='asd' id='1' targetDomain='a' />
                    </Tbody>
                </Table>
                {/* <EmptyState show={false} /> */}
            </TableContainer>
        </>
    )
}

const TableRow = ({ linkData, id, targetDomain }) => {

    return (
        <Tr>
            <Td>asd</Td>
            <Td maxW={'400px'} pr={10} overflow={'hidden'}>
                asd
            </Td>
        </Tr>
    );
};

export default LabelTable