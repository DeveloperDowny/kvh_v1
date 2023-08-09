import { Box, Grid, GridItem, HStack, Heading, } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { AiFillDashboard } from 'react-icons/ai'
import LabelTable from './LabelTable'
import WebHook from './WebHook'
import APIRequests from '../../api'

const Dashboard = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        APIRequests.getLabels().then((res) => {
            let arr = []

            let label = res.data.foundTransaction

            for (let i = 0; i < 10; i++) {
                arr.push({
                    label: label[i].title,
                    boardLink: label[i].boardId ?? '',
                    cryptoType: label[i].network
                })
            }

            setData(arr)
        })
            .catch((err) => {
                console.log(err)
            })

    }, [])

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
                    <LabelTable data={data} />
                </GridItem>
                <GridItem boxShadow={'lg'} rounded={'lg'} colSpan={2}>
                    <WebHook />
                </GridItem>
                <GridItem colSpan={2} bg='papayawhip' />
                <GridItem colSpan={4} bg='tomato' />
            </Grid>
        </Box>
    )
}



export default Dashboard