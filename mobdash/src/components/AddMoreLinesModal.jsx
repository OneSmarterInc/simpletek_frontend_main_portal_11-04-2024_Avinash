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
  useToast,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const AddMoreLinesModal = ({ accountNumber ,vendorName}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditable, setIsEditable] = useState(false);

  const [PhoneNumber, setPhoneNumber] = useState("");
  const [UserName, setUserName] = useState("");
  const [PlanType, setPlanType] = useState("");
  const [Location, setLocation] = useState("");
  const [VendorNumber, setVendorNumber] = useState("");
  const [VendorName, setVendorName] = useState("");
  const [AccountNumber, setAccountNumber] = useState("");
  const [DeviceID, setDeviceID] = useState("");
  const [MobileDevice, setMobileDevice] = useState("");
  const [MobileIMEI, setMobileIMEI] = useState("");
  const [MobileSIMNum, setMobileSIMNum] = useState("");
  const [UpgradeEligibleDate, setUpgradeEligibleDate] = useState("");

  const [loading, setLoading] = useState(false);
  const  toast = useToast()

  const handleEditClick = () => {
    setIsEditable(true);
  };
  const handleSave = async () => {
    let addMobileDataObj = {
      Phone_number: PhoneNumber,
      User_name: UserName,
      Plan_Type: PlanType,
      vendor_name:VendorName,
      Account_number: AccountNumber,  
      Device_ID: DeviceID,
      Mobile_Device: MobileDevice,
      Mobile_SIM_Num: MobileSIMNum,
      location : Location,
      vendor_number:VendorNumber,
      IMEI_NUMBER: MobileIMEI,
      Upgrade_Eligible_Date: UpgradeEligibleDate,
    };

    //   Phone_number: "PhoneNumber2",
    //   User_name: "UserName",
    //   Plan_Type: "PlanType",
    //   vendor_name:"VendorName",
    //   Account_number: "AccountNumber",
    //   Device_ID: "DeviceID",
    //   Mobile_Device: "MobileDevice",
    //   Mobile_SIM_Num: "MobileSIMNum",
    //   location : "Location",
    //   vendor_number:"VendorNumber",
    //   IMEI_NUMBER: "MobileIMEI",
    //   Upgrade_Eligible_Date: "UpgradeEligibleDate",
    // };
    console.log(addMobileDataObj);
    try {
      setLoading(true);
      let response = await axios.post(
        "https://api.cyberbriefs.org/mobility/add_more_lines",
        addMobileDataObj
      );
      console.log(response);
     if (response.status=200) {
      setLoading(false);
      toast({
        title: "Mobile added Successfully",
        description: "",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
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
    if (isOpen) {
      setAccountNumber(accountNumber);
      setVendorName(vendorName);
      console.log(AccountNumber);
    }
  }, [isOpen]);

  return (
    <>
      <Button onClick={onOpen} bg={"#4BCA6E"} color={"white"}>
        Add More Lines
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={"#f7e9c3"}>Add Line #</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              border={"0px solid red"}
              justifyContent={"space-between"}
              mt={20}
            >
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>Phone_Number :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={PhoneNumber}
                  
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Flex>
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>User_name :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={UserName}
                  
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Flex>
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>Plan Type :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={PlanType}
                  
                  onChange={(e) => setPlanType(e.target.value)}
                />
              </Flex>
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>Location :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={Location}
                  
                  onChange={(e) => setLocation(e.target.value)}
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
                <Text fontWeight={500}>Vendor_Number :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={VendorNumber}
                  
                  onChange={(e) => setVendorNumber(e.target.value)}
                />
              </Flex>
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>Vendor_name :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={VendorName}
                  isDisabled
                  onChange={(e) => setVendorName(e.target.value)}
                />
              </Flex>
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>Account # :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={AccountNumber}
                  isDisabled
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </Flex>
              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}>Device ID :</Text>
                <Input
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={DeviceID}
                  
                  onChange={(e) => setDeviceID(e.target.value)}
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
            </Flex>
          </ModalBody>

          <ModalFooter>

              <Button isDisabled={loading} onClick={handleSave} bg={"#4BCA6E"} color={"white"}>
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

export default AddMoreLinesModal;
