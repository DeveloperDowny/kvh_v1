import { Box, Grid, GridItem, HStack, Heading, } from '@chakra-ui/react'
import React from 'react'
import { AiFillDashboard } from 'react-icons/ai'
import LabelTable from './LabelTable'
import WebHook from './WebHook'

const Dashboard = () => {
    return (
        <Box py={16} px={6}>
            <Heading color='primary'>
                <AiFillDashboard style={{ display: 'inline' }} /> Dashboard
            </Heading>

            <Grid
                mt={6}
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(2, 1fr)'
                gap={4}
            >
                <GridItem boxShadow={'lg'} rounded={'lg'} rowSpan={2} colSpan={1}>
                        <LabelTable />
                </GridItem>
                <GridItem  boxShadow={'lg'} rounded={'lg'} colSpan={2}>
                    <WebHook />
                </GridItem>
                <GridItem colSpan={2} bg='papayawhip' />
                <GridItem colSpan={4} bg='tomato' />
            </Grid>
        </Box>
    )
}



export default Dashboard