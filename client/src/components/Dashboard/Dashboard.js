import { Box, Grid, GridItem, HStack, Heading, Spinner} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { AiFillDashboard } from 'react-icons/ai'
import LabelTable from './LabelTable'
import WebHook from './WebHook'
import APIRequests from '../../api'

const Dashboard = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

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
            setLoading(false)
        })
            .catch((err) => {
                console.log(err)
                setLoading(false)
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
                {loading ? <Box textAlign={'center'}><Spinner /></Box> : <LabelTable data={data} />}
                </GridItem>
                <GridItem boxShadow={'lg'} rounded={'lg'} colSpan={2}>
                    {/* {loading ? <Box textAlign={'center'}><Spinner /></Box> :<WebHook />} */}
                    <WebHook />
                </GridItem>
                <GridItem colSpan={2} bg='papayawhip' />
                <GridItem colSpan={4} bg='tomato' />
            </Grid>
        </Box>
    )
}



export default Dashboard