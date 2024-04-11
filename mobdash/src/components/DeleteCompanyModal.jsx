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
    Text,
    useToast,
  } from "@chakra-ui/react";
  import axios from "axios";
  import { useState } from "react";
  
  const DeleteCompanyModal = ({AccountNumber,BillDate}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
  
    const toast = useToast();
  
  
    const handleDelete = async () => {
        console.log(AccountNumber);
        const accNum = {
          Account_number : AccountNumber,
          Bill_Date: BillDate
        }
        try {
       
          setLoading(true);
          let response = await axios.post(
            "https://api.cyberbriefs.org/mobility/delete_ban",
            accNum
          );
          // console.log(response); 
          
         if (response.status == 200) {
            setLoading(false);
            toast({
              title: "Bill Deleted Successfully",
              description: "",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            onClose();
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
          toast({
            title: "There is something wrong",
            description: "",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
    }
    return (
      <>
        <Button onClick={onOpen} color={"white"} bg={"#B73232"}>
          Delete BAN
        </Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontWeight={700}>Are you sure?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight={500}>
                This action cannot be undone. BAN will be deleted permenently.
              </Text>
            </ModalBody>
  
            <ModalFooter>
              <Button onClick={handleDelete} bg={"#D11A2A"} color={"white"} mr={3}>
                Delete
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default DeleteCompanyModal;
  