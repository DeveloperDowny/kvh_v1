import { Box, Input, InputAddon, Heading, Flex, Stack, Divider, Button, useDisclosure, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FiFile, FiSearch } from "react-icons/fi";
import WebHook from "../Dashboard/WebHook";
import CurrenNode from "./CurrentNode";
import Tile from "./Tile";
import AddAddressModal from "./AddAddressModal";
import APIRequests from "../../api";
import { typeToImgMap } from "../navbar/navbar";
import { useSelector } from "react-redux";


const Monitoring = () => {

  const { onOpen, isOpen, onClose } = useDisclosure()

  const [untrackedAddress, setUntrackedAddress] = useState([])
  const [loading, setLoading] = useState(true)
  const trackedAddress = useSelector(state => state.siteCustom.trackedAddress)

  const mFetchData = async () => {

    const nwList = Object.keys(typeToImgMap)
    let arr = []
    const awaitsArr = []
    nwList.forEach((nw) => {
      console.log(nw)
      if (nw === 'tron') {
        nw = 'trx'
      }
      awaitsArr.push(APIRequests.showMonitorAddress(nw))
    })
    setLoading(true)
    const myData = await Promise.all(awaitsArr)
    myData.forEach((nwData) => {
      const addressList = nwData.data.data.data.list
      const nw = nwData.data.data.network
      addressList.forEach((address) => {
        arr.push({
          address: address,
          cryptoType: nw
        })
      })

      setUntrackedAddress(arr)
      setLoading(false)
    })
  }

  useEffect(() => {
    mFetchData()
  }, [])

  // console.log(untrackedAddress)
  console.log(trackedAddress)

  return (
    <Flex py={16} px={6} w={'full'} align={'center'} flexDirection={'column'} >
      <Heading color="primary" alignSelf={'flex-start'}>
        <FiSearch style={{ display: "inline" }} /> Monitoring
        <Button ml={2} variant={'outline'} colorScheme="blue" onClick={onOpen} >+</Button>
        <AddAddressModal onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
      </Heading>
      <Flex mt={6} w={'75%'} flexDirection={'column'} justify={'center'} align={'center'} >
        <CurrenNode />
        <Divider />
        <Stack w={'full'} align={'center'} mt={10}>
          {loading && <Box textAlign={'center'}   ><Spinner /></Box>}
          {untrackedAddress && untrackedAddress.map((address, index) => {
            console.log(address.cryptoType)
            if (trackedAddress === address.address  )return
            return <Tile key={index} address={address.address} cryptoType={address.cryptoType} />
          })
          }
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Monitoring;
