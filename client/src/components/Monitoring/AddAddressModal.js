import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    InputAddon,
    InputGroup
} from '@chakra-ui/react'
import { regexes, typeToImgMap } from '../navbar/navbar'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setMCryptoType } from '../../reducers/SiteCustom'

const AddAddressModal = ({ isOpen, onOpen, onClose }) => {
    const [address, setAddress] = useState('')
    const [cryptoType, setCryptoType] = useState('unk')
    const dispatch = useDispatch()

    const onAddressChange = (e) => {
        let walletAddress = e.target.value
        for (const type in regexes) {
            if (regexes[type].some((pattern) => pattern.test(walletAddress))) {
                setCryptoType(type); // Set the matched crypto type in state
                dispatch(setMCryptoType(type));
                // dispatch(setAddress(inputValue));
                return; // Break the loop once a match is found
            } 
        }
        setCryptoType('unk'); // If no match is found, crypto type is unknown
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent color={'primary'} >
                    <ModalHeader>Add wallet address</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Enter wallet address</FormLabel>
                            <InputGroup>
                                <InputAddon>
                                    <img height={20} width={20} src={typeToImgMap[cryptoType]} alt="" />
                                </InputAddon>
                                <Input onChange={onAddressChange} type='email' placeholder='0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' />
                            </InputGroup>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} >
                            Add
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddAddressModal