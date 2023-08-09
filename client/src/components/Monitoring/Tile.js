import { Box, Stack, Text, HStack, Flex } from '@chakra-ui/layout'
import React from 'react'
import { typeToImgMap } from '../navbar/navbar'
import { Button } from '@chakra-ui/button'

const Tile = () => {
    return (
        <Box w={'full'} p={5} boxShadow={'lg'}>
             <Flex justify={'space-between'} >
             <HStack>
                    <img width={20} height={20} src={typeToImgMap['btc']} alt="" />
                    <Text ml={3} fontWeight={'semibold'} fontSize={'xl'}>0xab5c66752a9e8167967685f1450532fb96d5d24f</Text>
                </HStack>
                <Button variant={'outline'} colorScheme='blue'>
                    Track
                </Button>
            </Flex>

        </Box>
    )
}

export default Tile