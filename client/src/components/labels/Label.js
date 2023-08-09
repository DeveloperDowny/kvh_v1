import {useState, useEffect} from 'react'
import LabelTable from '../Dashboard/LabelTable'
import { Box, Heading, Input, InputGroup, InputLeftAddon, InputRightElement, Image, InputAddon } from '@chakra-ui/react'
import { FiFile, FiList } from 'react-icons/fi'
import { Search2Icon, SearchIcon } from '@chakra-ui/icons'
import APIRequests from '../../api'

const Label = () => {
  const [data, setData] = useState([])

    useEffect(() => {
        APIRequests.getLabels().then((res) => {
            let arr = []

            let label = res.data.foundTransaction

            for (let i = 0; i < label.length; i++) {
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
        <FiList style={{ display: 'inline' }} /> Labels
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
        <LabelTable data={data} />
      </Box>
    </Box>
  )
}

export default Label