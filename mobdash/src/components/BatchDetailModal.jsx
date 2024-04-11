import React, { useEffect, useState } from "react";
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
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const BatchDetailModal = ({
  Cust_Id,
  Vendor_Name,
  raddress,
  rCity,
  rState,
  rZip,
  Customer_Vendor_Account_Number,
  Invoice_Number,
  Net_Amount,
  Due_Date,
  Invoice_Date,
  approved,
  id,
  getBatchData,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditable, setIsEditable] = useState(false);
  const [custID, setCustId] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [netAmount, setNetAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [remittenceAddress, setRemittenceAddress] = useState("");
  const [editLoader, setEditLoader] = useState("");
  const [deleteLoader, setDeleteLoader] = useState("");
  const [approveLoader, setApproveLoader] = useState("");
  const [fetchApprovedData, setFetchApprovedData] = useState(approved);
  const toast = useToast();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from event target
    setFormData({
      ...formData, // Spread the current state
      [name]: value, // Update the value of the specific field
    });
  };

  const handleApprove = async () => {
    try {
      setApproveLoader(true);
      let obj = { approved: "True" };
      const response = await axios.put(
        `https://api.cyberbriefs.org/mobility/edit_batch_data/${id}`,
        obj
      );
      if (response.data) {
        toast({
          title: "Data successfully approved",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setApproveLoader(false);
        getBatchData(custID);
      }
    } catch (error) {
      toast({
        title: "There is something wrong",
        description: "",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setApproveLoader(false);
      console.log(error.message);
    }
  };

  const handleDisApprove = async () => {
    try {
      let obj = {approved: "False" };
      const response = await axios.put(
      `https://api.cyberbriefs.org/mobility/edit_batch_data/${id}`,
        obj
      );
      if (response.data) {
        toast({
          title: "Data successfully disapproved",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setApproveLoader(false);
        getBatchData(custID);
      }
      console.log(response, "");
    } catch (error) {
      toast({
        title: "There is something wrong",
        description: "",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setApproveLoader(false);
      console.log(error.message);
    }
  };

  const handleEdit = async () => {
    setIsEditable(true);
  };

  const handleSave = async () => {
    console.log(formData, "formmmmmmmmm");
    setIsEditable(false);
    try {
      setEditLoader(true);
      const response = await axios.put(
        `https://api.cyberbriefs.org/mobility/edit_batch_data/${id}`,
        formData
      );

      if (response.data) {
        toast({
          title: "Data successfully edited",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        setEditLoader(false);
        getBatchData(custID);
      }
    } catch (error) {
      toast({
        title: "There is something wrong",
        description: "",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setEditLoader(false);
      console.log(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoader(true);
      let obj = { id };
      const response = await axios.post(
        "https://api.cyberbriefs.org/mobility/delete_batch_data",
        obj
      );
      if (response.data) {
        toast({
          title: "Data successfully deleted",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setDeleteLoader(false);
        getBatchData(custID);
        onClose();
      }
    } catch (error) {
      toast({
        title: "There is something wrong",
        description: "",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setDeleteLoader(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    setCustId(Cust_Id);
    setVendorName(Vendor_Name);
    setAddress(raddress);
    setCity(rCity);
    setState(rState);
    setZip(rZip);
    setAccountNumber(Customer_Vendor_Account_Number);
    setInvoiceNumber(Invoice_Number);
    setNetAmount(Net_Amount);
    setDueDate(Due_Date);
    setInvoiceDate(Invoice_Date);
  }, [isOpen]);

  useEffect(() => {
    setRemittenceAddress(`${address}  ${city},${state} ${zip}`);
  }, [address, city, state, zip]);

  return (
    <>
      <Text color="blue" onClick={onOpen}>
        View Details
      </Text>
      <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Batch Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="simple">
              <Thead></Thead>
              <Tbody>
                <>
                  <Tr _hover={{ bg: "gray.200", cursor: "pointer" }}>
                    <Td fontWeight="500">Customer Id</Td>
                    <Td>
                      <Input defaultValue={custID} readOnly />
                    </Td>
                  </Tr>

                  <Tr _hover={{ bg: "gray.200", cursor: "pointer" }}>
                    <Td fontWeight="500">Vendor Name</Td>
                    <Td>
                      <Input readOnly defaultValue={vendorName} />
                    </Td>
                  </Tr>

                  <Tr _hover={{ bg: "gray.200", cursor: "pointer" }}>
                    <Td fontWeight="500">Vendor Address</Td>
                    <Td>
                      <Input
                        name="Vendor_Address_1"
                        readOnly={!isEditable}
                        defaultValue={
                          raddress
                        }
                        onChange={(e) => handleChange(e)}
                      />
                    </Td>
                  </Tr>

                  <Tr _hover={{ bg: "gray.200", cursor: "pointer" }}>
                    <Td fontWeight="500">Vendor City</Td>
                    <Td>
                      <Input
                        name="Vendor_City"
                        readOnly={!isEditable}
                        defaultValue={rCity}
                        onChange={(e) => handleChange(e)}
                      />
                    </Td>
                  </Tr>
                  <Tr _hover={{ bg: "gray.200", cursor: "pointer" }}>
                    <Td fontWeight="500">Vendor State</Td>
                    <Td>
                      <Input
                        name="Vendor_State"
                        readOnly={!isEditable}
                        defaultValue={
                          rState
                        }
                        onChange={(e) => handleChange(e)}
                      />
                    </Td>
                  </Tr>
                  <Tr _hover={{ bg: "gray.200", cursor: "pointer" }}>
                    <Td fontWeight="500">Vendor Zip</Td>
                    <Td>
                      <Input
                        name="Vendor_Zip"
                        readOnly={!isEditable}
                        defaultValue={rZip}
                        onChange={(e) => handleChange(e)}
                      />
                    </Td>
                  </Tr>
                  <Tr _hover={{ bg: "gray.200", cursor: "pointer" }}>
                    <Td fontWeight="500">Customer Vendor Account Number</Td>
                    <Td>
                      <Input
                        readOnly
                        defaultValue={accountNumber}
                      />
                    </Td>
                  </Tr>
                  <Tr _hover={{ bg: "gray.200", cursor: "pointer" }}>
                    <Td fontWeight="500">Invoice Number</Td>
                    <Td>
                      <Input readOnly defaultValue={invoiceNumber} />
                    </Td>
                  </Tr>
                  <Tr _hover={{ bg: "gray.200", cursor: "pointer" }}>
                    <Td fontWeight="500">Net Amount</Td>
                    <Td>
                      <Input
                        name="Net_Amount"
                        readOnly={!isEditable}
                        defaultValue={netAmount}
                        onChange={(e) => handleChange(e)}
                      />
                    </Td>
                  </Tr>
                  <Tr _hover={{ bg: "gray.200", cursor: "pointer" }}>
                    <Td fontWeight="500">Due Date</Td>
                    <Td>
                      <Input
                        name="Due_Date"
                        readOnly={!isEditable}
                        defaultValue={dueDate}
                        onChange={(e) => handleChange(e)}
                      />
                    </Td>
                  </Tr>
                  <Tr _hover={{ bg: "gray.200", cursor: "pointer" }}>
                    <Td fontWeight="500">Invoice Date</Td>
                    <Td>
                      <Input
                        name="Invoice_Date"
                        readOnly={!isEditable}
                        defaultValue={
                          invoiceDate
                          }
                        onChange={(e) => handleChange(e)}
                      />
                    </Td>
                  </Tr>
                </>
              </Tbody>
            </Table>
          </ModalBody>

          <ModalFooter>
            {(approved == "False" || approved == null) && (
              <Button
                backgroundColor="#4BCA6E"
                color={"white"}
                mr={3}
                onClick={handleApprove}
                isLoading={approveLoader}
              >
                Approve
              </Button>
            )}
            {approved == "True" && (
              <Button
                backgroundColor="#B73232"
                color={"white"}
                mr={3}
                onClick={handleDisApprove}
              >
                Disapprove
              </Button>
            )}
            {!isEditable && (
              <Button
                backgroundColor="#4BCA6E"
                color={"white"}
                mr={3}
                onClick={handleEdit}
              >
                Edit
              </Button>
            )}
            {isEditable && (
              <Button
                backgroundColor="#4BCA6E"
                color={"white"}
                mr={3}
                onClick={handleSave}
                isLoading={editLoader}
              >
                Save
              </Button>
            )}
            <Button
              backgroundColor="#B73232"
              color={"white"}
              onClick={handleDelete}
              isLoading={deleteLoader}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BatchDetailModal;
