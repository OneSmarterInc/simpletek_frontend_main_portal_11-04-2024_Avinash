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
  Flex,
  Text,
  Input,
  Select,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const EditPortal = ({ url,accountNumber, vendor, company }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditable, setIsEditable] = useState(false);
  const [portalValue, setPortalValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [BAN, setBAN] = useState("");
  const [isAutomated, setAutomated] = useState("");
  const [isOnEmail, setOnEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const getPortalInfo = async () => {
    try {
      let data = await axios.get(
        "https://api.cyberbriefs.org/mobility/get_portal_info"
      );
      data = data.data;
      console.log("portal info", data);
      console.log("portal  acc", accountNumber);

      let filteredData = data.filter(
        (el) => el.Account_number === accountNumber
      );
      console.log("portal info fill");
      if(filteredData.length>0){
      filteredData = filteredData[0];
      setPortalValue(filteredData.URL);
      setUsernameValue(filteredData.Username);
      setPasswordValue(filteredData.Password);
      setAutomated(filteredData.Automated);
      setOnEmail(filteredData.On_Email);
      setUserEmail(filteredData.User_email_id);
      }
      else {
        setPortalValue(url);
        console.log("urrrrll",url);
      }
     
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSave = async () => {
    let editPortalObj = {
      URL: portalValue,
      Username: usernameValue,
      Password: passwordValue,
      Customer_Name: customerName,
      Vendor: vendorName,
      Account_number: accountNumber,
      User_email_id: userEmail,
      Automated: isAutomated,
      On_Email: isOnEmail,
    };
    console.log(editPortalObj);
    try {
      setLoading(true);
      let response = await axios.post(
        "https://api.cyberbriefs.org/mobility/post_portal_info",
        editPortalObj
      );
      console.log(response);
      // if (response.data == "Bill already exists,upload another one") {
      //   setLoading(false);
      //   toast({
      //     title: response.data,
      //     description: "",
      //     status: "error",
      //     duration: 5000,
      //     isClosable: true,
      //     position: "top",
      //   });
      // } else if (response.data.status == "success") {
      // setLoading(false);
      // setShowUploading(false);
      // setShowRDD(true);
      // toast({
      //   title: "Bill Uploaded Successfully",
      //   description: "",
      //   status: "success",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "top",
      // });
      // }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setIsEditable(false);
    setIsEditable(false);
  };

  useEffect(()=>{
    if (isOpen) {
    getPortalInfo();
    setCustomerName(company);
    setVendorName(vendor);
    setBAN(accountNumber);
    }
  },[isOpen])

  return (
    <>
      <Button onClick={onOpen} bg={"#D9D9D9"}>
        View/Edit Portal Info
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={"#f7e9c3"}>Portal Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              w={"70%"}
              border={"0px solid red"}
              justifyContent={"space-between"}
              mt={4}
            >
              <Flex gap={2} alignItems={"center"}>
                <Text fontWeight={500}>Customer :</Text>
                <Text bg={"#EEEEEE"} p={1} borderRadius={5} pr={2} pl={2}>
                  {customerName}
                </Text>
              </Flex>
              <Flex gap={2} alignItems={"center"}>
                <Text fontWeight={500}>Vendor :</Text>
                <Text bg={"#EEEEEE"} p={1} borderRadius={5} pr={2} pl={2}>
                  {vendorName}
                </Text>
              </Flex>
              <Flex gap={2} alignItems={"center"}>
                <Text fontWeight={500}>BAN :</Text>
                <Text bg={"#EEEEEE"} p={1} borderRadius={5} pr={2} pl={2}>
                  {BAN}
                </Text>
              </Flex>
            </Flex>
            <Flex
              border={"0px solid red"}
              justifyContent={"space-between"}
              mt={20}
            >
              <Flex
                w={"40%"}
                gap={2}
                alignItems={"flex-start"}
                flexDir={"column"}
              >
                <Text fontWeight={500}>Portal :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={portalValue}
                  readOnly={!isEditable}
                  onChange={(e) => setPortalValue(e.target.value)}
                />
              </Flex>
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>Username :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={usernameValue}
                  readOnly={!isEditable}
                  onChange={(e) => setUsernameValue(e.target.value)}
                />
              </Flex>
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>Password :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={passwordValue}
                  readOnly={!isEditable}
                  onChange={(e) => setPasswordValue(e.target.value)}
                />
              </Flex>

              <Flex
                gap={2}
                rowGap={3}
                alignItems={"center"}
                justifyContent={"center"}
                flexDir={"column"}
              >
                {isEditable ? (
                  <Button onClick={handleSave} bg={"#4BCA6E"} color={"white"}>
                    Save
                  </Button>
                ) : (
                  <>
                    <FaEdit
                      cursor={"pointer"}
                      fontSize={25}
                      color="#4BCA6E"
                      onClick={handleEditClick}
                    />
                  </>
                )}
              </Flex>
            </Flex>
            <Flex
              gap={10}
              border={"0px solid black"}
              alignItems={"center"}
              mt={5}
            >
              <Flex
                w={"40%"}
                gap={2}
                alignItems={"flex-start"}
                flexDir={"column"}
              >
                <Text fontWeight={500}>User Email :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={userEmail}
                  readOnly={!isEditable}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </Flex>
              <Flex gap={2} alignItems={"center"} flexDir={"column"}>
                <Text fontWeight={500}>Automated </Text>
                <Select
                  bg={"#EEEEEE"}
                  value={isAutomated}
                  onChange={(e) => setAutomated(e.target.value)}
                  isDisabled={!isEditable}
                >
                  <option value={""}>Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              </Flex>
              <Flex gap={2} alignItems={"center"} flexDir={"column"}>
                <Text fontWeight={500}>On Email </Text>
                <Select
                  bg={"#EEEEEE"}
                  value={isOnEmail}
                  onChange={(e) => setOnEmail(e.target.value)}
                  isDisabled={!isEditable}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button bg={"#E61A1A"} color={"white"} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditPortal;
