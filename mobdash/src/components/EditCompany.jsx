import React, { useContext, useEffect, useState } from "react";
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
  Flex,
  Text,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import MyContext from "./ContextApi/MyContext";
import { CiEdit } from "react-icons/ci";

const EditCompany = ({
  CName,
  CWebsite,
  CAddress,
  CNumber,
  TID,
  DFirst,
  DLast,
  DMob,
  DEmail,
  CAgentNumber,
  N,
  CAgentDetails,
  CUlist,
  CDate,
  CVlist,
  CPType,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditable, setIsEditable] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [taxID, SetTaxID] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [dmFirstName, setDmFirstname] = useState("");
  const [dmLastName, setDmLastName] = useState("");
  const [dmMobileNumber, setDmMobileNumber] = useState("");
  const [dmEmail, setDmEmail] = useState("");
  const [salesAgentNumber, setSalesAgentNumber] = useState("");
  const [saleAgentDetails, setSalesAgentDetails] = useState("");
  const [userList, setUserList] = useState("");
  const [date, setDate] = useState("");
  const [vendorList, setVendorList] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleSave = async () => {
    let EditCompanyDataObj = {
      Name: companyName,
      Website: companyWebsite,
      Contact_number: contactNumber,
      Tax_id: taxID,
      Address: companyAddress,
      DM_first_name: dmFirstName,
      DM_last_name: dmLastName,
      DM_mobile_number: dmMobileNumber,
      DM_email_address: dmEmail,
      Sales_agent_number: salesAgentNumber,
      Sales_agent_details: saleAgentDetails,
      Notes: notes,
      User_list: userList,
      Date: date,
      Vendor_list: vendorList,
      Payment_Type: paymentType,
      vendor_name:vendorList,
      company_name:companyName,
    };
    console.log("editcompp",EditCompanyDataObj);
    try {
      setLoading(true);
      let response = await axios.post(
        "https://api.cyberbriefs.org/mobility/edit_company_data",
        EditCompanyDataObj
      );
      console.log(response);
     if (response.status == 200) {
      setLoading(false);
      toast({
        title: "Mobile Data Edited Successfully",
        description: "",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      window.location.reload();
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
  };

  useEffect(() => {
    setCompanyName(CName);
    setCompanyWebsite(CWebsite);
    setContactNumber(CNumber);
    SetTaxID(TID);
    setDmFirstname(DFirst);
    setDmLastName(DLast);
    setDmMobileNumber(DMob);
    setDmEmail(DEmail);
    setNotes(N);
    setCompanyAddress(CAddress);
    setSalesAgentNumber(CAgentNumber);
    setSalesAgentDetails(CAgentDetails);
    setUserList(CUlist);
    setVendorList(CVlist);
    setPaymentType(CPType);
    setDate(CDate);
  }, [isOpen]);

  return (
    <>
      {/* <Button onClick={onOpen} color={"white"} bg={"#4BCA6E"}>
        Edit Company Details
      </Button> */}
      <CiEdit
        onClick={onOpen}
        cursor={"pointer"}
        fontSize={30}
        color="#397200"
      />

      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={"#f7e9c3"}>Edit Company Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              border={"0px solid red"}
              justifyContent={"space-between"}
              mt={20}
            >
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>Company Name :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </Flex>
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>Contact Number :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </Flex>
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>Company Address :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                />
              </Flex>
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>Tax ID :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={taxID}
                  onChange={(e) => SetTaxID(e.target.value)}
                />
              </Flex>
            </Flex>
            <Flex
              gap={10}
              border={"0px solid black"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mt={5}
            >
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>Dm First Name :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={dmFirstName}
                  onChange={(e) => setDmFirstname(e.target.value)}
                />
              </Flex>
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>DM Last Name :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={dmLastName}
                  onChange={(e) => setDmLastName(e.target.value)}
                />
              </Flex>
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>Dm Mobile Number :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={dmMobileNumber}
                  onChange={(e) => setDmMobileNumber(e.target.value)}
                />
              </Flex>
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>DM Email :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={dmEmail}
                  onChange={(e) => setDmEmail(e.target.value)}
                />
              </Flex>
            </Flex>
            <Flex mt={4} gap={2} alignItems={"flex-start"} flexDir={"column"}>
              <Text fontWeight={500}>Notes :</Text>
              <Input
                bg={"#EEEEEE"}
                borderRadius={5}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Flex>
            {/* <Flex
              gap={10}
              border={"0px solid black"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mt={5}
            >
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>Mobile Device :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={MobileDevice}
                  
                  onChange={(e) => setMobileDevice(e.target.value)}
                />
              </Flex>
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>Mobile IMEI :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={MobileIMEI}
                  
                  onChange={(e) => setMobileIMEI(e.target.value)}
                />
              </Flex>
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>Mobile SIM Num:</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={MobileSIMNum}
                  
                  onChange={(e) => setMobileSIMNum(e.target.value)}
                />
              </Flex>
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>Upgrade Eligible Date:</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={UpgradeEligibleDate}
                  
                  onChange={(e) => setUpgradeEligibleDate(e.target.value)}
                />
              </Flex>
            </Flex> */}
          </ModalBody>

          <ModalFooter>
            <Button
              isDisabled={loading}
              onClick={handleSave}
              bg={"#4BCA6E"}
              color={"white"}
            >
              {loading ? "Loading..." : "Save"}
            </Button>
            <Button ml={5} bg={"#E61A1A"} color={"white"} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCompany;
