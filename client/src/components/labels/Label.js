import React from 'react'
import LabelTable from '../Dashboard/LabelTable'
import { Box, Heading, Input, InputGroup, InputLeftAddon, InputRightElement, Image, InputAddon } from '@chakra-ui/react'
import { AiFillDashboard } from 'react-icons/ai'
import { FiFile } from 'react-icons/fi'
import { searchBar } from '../searchbar/searchbar'
import { Search2Icon, SearchIcon } from '@chakra-ui/icons'
import { typeToImgMap } from '../navbar/navbar'

const Label = () => {
  return (
    <Box py={16} px={6}>
      <Heading color='primary'>
        <FiFile style={{ display: 'inline' }} /> Labels
      </Heading>
      <InputGroup mt={6} rounded={'md'}>
        <InputAddon pointerEvents="none">
          <Search2Icon color="gray.300" />
        </InputAddon>
        <Input
          type="text"
          variant={'outline'}
          placeholder="Search labels here"
          background={"white"}
          color={'primary'}
          
          w={'50%'}
        />

      </InputGroup>
      <Box mt={6}>
        <LabelTable />
      </Box>
    </Box>
  )
}

export default Label