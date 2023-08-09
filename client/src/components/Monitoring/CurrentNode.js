import { Box, Text, TableContainer, Table, Th, Thead, Tbody, Badge, Flex, Divider, Stack, HStack, Tag, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { typeToImgMap } from '../navbar/navbar'
import { FiArrowRight, FiSearch } from 'react-icons/fi'
import APIRequests from '../../api'


const CurrenNode = () => {
    const [data, setData] = useState([])
    const mFetch =  async () => {
        const data = await APIRequests.setMonitorAddress()
        // console.log(data)
        setData(data.data.data[0].data)    
    }
    useEffect(() => {
        mFetch()
    }, [])

    console.log(data)
    return (
        <Box w={'full'} p={5} boxShadow={'lg'} rounded={'lg'} borderColor={'green.400'} justifyContent={'center'} alignItems={'center'} >
            
            <Stack align={'center'}>
                <Text fontSize={'3xl'} fontWeight={'bold'} color="primary" >
                     Current Address being tracked
                </Text>
                <HStack>
                    <img width={20} height={20} src={typeToImgMap['btc']} alt="" />
                    <Text ml={3} fontWeight={'semibold'} fontSize={'xl'}>{data.address}</Text>
                </HStack>
                <Divider />
                <Flex gap={4} mt={3} flexWrap={'wrap'}  justify={'space-evenly'} >
                    <Box display={'inline'}>
                        Balance:
                        <Tag ml={2} variant={'outline'} colorScheme="blue">{data?.value} ETH</Tag>
                    </Box>
                    <Box display={'inline'}>
                        Conformations:
                        <Tag ml={2} variant={'outline'} colorScheme="blue">{data.confirmations}</Tag>
                    </Box>
                    <Box display={'inline'}>
                        Time:
                        <Tag ml={2} variant={'outline'} colorScheme="blue">{data.time}</Tag>
                    </Box>
                    <Box display={'inline'}>
                        Token address:
                        <Tag ml={2} variant={'outline'} colorScheme="blue">0xdac17f958d2ee523a2206206994597c13d831ec7</Tag>
                    </Box>

                </Flex>
            </Stack>
        </Box>
    )
}

export default CurrenNode