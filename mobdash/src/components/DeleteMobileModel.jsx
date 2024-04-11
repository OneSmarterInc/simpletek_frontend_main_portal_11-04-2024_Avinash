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
  import { useContext, useState } from "react";
import MyContext from "./ContextApi/MyContext";
  
  const DeleteMobileModel = ({phoneNumber, accountNumber}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const {data, setData} = useContext(MyContext);


    const toast = useToast();


    const getData = async () => {
      try {
        let res = await axios.get(
          "https://api.cyberbriefs.org/mobility/api-data"
        );
        console.log("api-data(mobile)", res.data);
        let data = res.data.filter(
          (el) => el["Account_number_x"] == accountNumber
        );
        console.log("api-data(mobileee)", data);
  
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleDelete = async () => {
        console.log(phoneNumber);
        const accNum = {
          Phone_number : phoneNumber
        }
        try {
       
          setLoading(true);
          let response = await axios.post(
            "https://api.cyberbriefs.org/mobility/delete_mob",
            accNum
          );
          // console.log(response);
          if (response.status == 200) {
            setLoading(false);
            toast({
              title: "Mobile Deleted Successfully",
              description: "",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            getData();
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
          Delete Mobile
        </Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontWeight={700}>Are you sure?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight={500}>
                This action cannot be undone. This Mobile will be deleted permenently.
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
  
  export default DeleteMobileModel;
  