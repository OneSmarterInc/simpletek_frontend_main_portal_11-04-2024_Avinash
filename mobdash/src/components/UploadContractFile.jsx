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
    Input,
    Text,
    Flex,
  } from '@chakra-ui/react'


const UploadContractFile = ()=> {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen} bg={"#4BCA6E"} size={"sm"} color={"white"}>Upload File</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Upload File</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Flex alignItems={"center"}>
                <Text fontWeight={500}>Select File:</Text>
                <Input type='file' />
                </Flex>
                <Flex alignItems={"center"} mt={5}>
                <Text fontWeight={500}>Add Remarks:</Text>

                <Input type='text'/>
                </Flex>
            
            </ModalBody>
  
            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
              <Button bg={"#4BCA6E"} color={"white"}>Upload</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }


  export default UploadContractFile;