import { Box, Text, TableContainer, Table, Th, Thead, Tbody, Badge, Flex, Divider, Stack, HStack, Tag, Heading } from '@chakra-ui/react'
import React from 'react'
import { typeToImgMap } from '../navbar/navbar'
import { FiArrowRight, FiSearch } from 'react-icons/fi'




const CurrenNode = () => {
    return (
        <Box w={'full'} p={5} boxShadow={'lg'} rounded={'lg'} borderColor={'green.400'} justifyContent={'center'} alignItems={'center'} >
            
            <Stack align={'center'}>
                <Text fontSize={'3xl'} fontWeight={'bold'} color="primary" >
                     Current Address being tracked
                </Text>
                <HStack>
                    <img width={20} height={20} src={typeToImgMap['btc']} alt="" />
                    <Text ml={3} fontWeight={'semibold'} fontSize={'xl'}>0xab5c66752a9e8167967685f1450532fb96d5d24f</Text>
                </HStack>
                <Divider />
                <Flex gap={4} mt={3} flexWrap={'wrap'}  justify={'space-evenly'} >
                    <Box display={'inline'}>
                        Balance:
                        <Tag ml={2} variant={'outline'} colorScheme="blue">0.9 ETH</Tag>
                    </Box>
                    <Box display={'inline'}>
                        Conformations:
                        <Tag ml={2} variant={'outline'} colorScheme="blue">2</Tag>
                    </Box>
                    <Box display={'inline'}>
                        Time:
                        <Tag ml={2} variant={'outline'} colorScheme="blue">15/08/2023</Tag>
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