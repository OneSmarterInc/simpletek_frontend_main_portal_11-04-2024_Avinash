import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";

const ViewBillDetailModal = ({ mobiledata }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log(mobiledata);
  }, [isOpen]);
  return (
    <>
      <Button bg={"#4BCA6E"} color={"white"} onClick={onOpen}>
        Bill Details
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexDir={"column"}
              maxH={"600px"}
              overflow={"scroll"}
              bg="gray.100"
            >
              <Flex
                justifyContent={"space-between"}
                w={"100%"}
                bg={"#A8A7A7"}
                p={2}
                fontWeight={500}
              >
                <Text>Wireless Numbers</Text>
                <Text>Amount</Text>
              </Flex>
              {mobiledata.length > 0 ? (
                mobiledata.map((el) => (
                  <Flex
                    justifyContent={"space-between"}
                    w={"100%"}
                    p={2}
                    borderBottom={"1px solid gray"}
                  >
                    <Text>{el.Wireless_number}</Text>
                    <Text>USD {el.Total_Charges ? el.Total_Charges : el.Charges}</Text>
                  </Flex>
                ))
              ) : (
                <Text>No data Found</Text>
              )}
            </Flex>
          </ModalBody>

         
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewBillDetailModal;
