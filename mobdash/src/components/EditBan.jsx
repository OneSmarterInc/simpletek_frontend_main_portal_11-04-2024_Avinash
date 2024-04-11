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
  Divider,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const EditBan = ({
  AccountNumber,
  Vendor,
  Invoice,
  BillDay,
  companyName,
  PaymentType,
  BillingCycle,
  BillingName,
  RemidanceAddress,
  RemidanceCity,
  RemidanceState,
  RemidanceZip,
  EntryType,
  VendorID,
  BANType,
  BANStatus,
  Notes,
  BillingCity,
  BillingState,
  BillingZip,
  BillingAttn,
  BillingCountry,
  BillingAddress,
  Check,
  Remarks,
  Status
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditable, setIsEditable] = useState(false);
  const [company, setCompany] = useState(companyName);
  const [entryType, setEntryType] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [vendorID, setVendorID] = useState("");
  const [banType, setBanType] = useState("");
  const [banStatus, setBanStatus] = useState("");
  const [invoiceMethod, setInvoiceMethod] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [billingCycle, setBillingCycle] = useState("");
  const [billingDay, setBillingDay] = useState("");
  const [notes, setNotes] = useState("");
  const [billingName, setBillingName] = useState("");
  const [finalBillingAddress, setFinalBillingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingZip, setBillingZip] = useState("");
  const [billingAttn, setBillingAttn] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [finalRemmitenceAddress, setFinalRemmitenceAddress] = useState("");
  const [RemmitenceAddress, setRemmitenceAddress] = useState("");
  const [RemmitenceCity, setRemmitenceCity] = useState("");
  const [RemmitenceState, setRemmitenceState] = useState("");
  const [RemmitenceZip, setRemmitenceZip] = useState("");
  const [RemmitenceAttn, setRemmitenceAttn] = useState("");
  const [RemmitenceCountry, setRemmitenceCountry] = useState("");
  const [checkk, setCheckk] = useState("");
  const [remarkss, setRemarkss] = useState("");
  const [statuss, setStatuss] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSave = async () => {
    let editedObj = {
      AccountNumber: accountNumber,
      vendor: vendorName,
      Billing_Date: billingDay,
      Billing_Name: billingName,
      Duration: billingCycle,
      Payment_Type: paymentType,
      Billing_Address: billingAddress,
      billing_city: billingCity,
      billing_state: billingState,
      billing_zip:billingZip,
      billing_attn : billingAttn,
      billing_country : billingCountry,
      Invoice_Method: invoiceMethod,
      company: company,
      Entry_type: entryType,
      Vendor_id: vendorID,
      Ban_type: banType,
      Ban_status: banStatus,
      Remmitence_name: "remmitenceName",
      Remidence_Address: finalRemmitenceAddress,
      notes: notes,
      CHECK:checkk,
      status:statuss,
      remarks:remarkss
    };
    console.log("nnnnn", editedObj);
    try {
      setLoading(true);
      let response = await axios.post(
        "https://api.cyberbriefs.org/mobility/post_edited_data",
        editedObj
      );
      console.log(response);
      if (response.status == 200) {
        setLoading(false);
        toast({
          title: "Data successfully edited",
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
    setIsEditable(false);
  };

  useEffect(() => {
    if (isOpen) {
      setCompany(companyName);
      setVendorName(Vendor);
      setInvoiceMethod(Invoice);
      setPaymentType(PaymentType);
      setBillingDay(BillDay);
      setBillingCycle(BillingCycle);
      setAccountNumber(AccountNumber);
      setBillingName(BillingName);
      setRemmitenceAddress(RemidanceAddress);
      setRemmitenceCity(RemidanceCity);
      setRemmitenceState(RemidanceState);
      setRemmitenceZip(RemidanceZip);
      setEntryType(EntryType);
      setVendorID(VendorID);
      setBanType(BANType);
      setBanStatus(BANStatus);
      setNotes(Notes);
      setBillingCity(BillingCity);
      setBillingState(BillingState);
      setBillingZip(BillingZip);
      setBillingAddress(BillingAddress);
      setBillingAttn(BillingAttn);
      setBillingCountry(BillingCountry);
      setCheckk(Check);
      setRemarkss(Remarks);
      setStatuss(Status);
      console.log("eennttt", Invoice);
    }
  }, [isOpen]);

  useEffect(() => {
    setFinalBillingAddress(
      `${billingAddress} ${billingCity} ${billingState} ${billingZip} ${billingAttn} ${billingCountry}`
    );
  }, [
    billingAddress,
    billingCity,
    billingState,
    billingZip,
    billingAttn,
    billingCountry,
  ]);

  useEffect(() => {
    setFinalRemmitenceAddress(
      `${RemmitenceAddress}  ${RemmitenceCity},${RemmitenceState} ${RemmitenceZip}`
    );
  }, [
    RemmitenceAddress,
    RemmitenceCity,
    RemmitenceState,
    RemmitenceZip,
    RemmitenceAttn,
    RemmitenceCountry,
  ]);

  return (
    <>
      <Button onClick={onOpen} color={"white"} bg={"#4BCA6E"}>
        Edit BAN
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={"#f7e9c3"}>MANAGE COMPANY ACCOUNT DATA</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              w={"60%"}
              border={"0px solid red"}
              justifyContent={"space-between"}
              mt={4}
            >
              <Flex gap={2} alignItems={"center"} w={"50%"}>
                <Text fontWeight={500}>Organisation :</Text>
                <Text bg={"#EEEEEE"} p={1} borderRadius={5} pr={2} pl={2}>
                  {company}
                </Text>
              </Flex>
              <Flex gap={2} alignItems={"center"} w={"50%"}>
                <Text fontWeight={500} w={"50%"}>
                  Entry Type :
                </Text>
                <Select
                  onChange={(e) => setEntryType(e.target.value)}
                  value={entryType}
                  bg={"#EEEEEE"}
                >
                  <option value={""}>Select</option>
                  <option value="base_account">Base Account</option>
                  <option value="master_account">Master Account</option>
                  <option value="sub_account">Sub Account</option>
                </Select>
              </Flex>
            </Flex>
            <Flex
              border={"0px solid red"}
              justifyContent={"space-between"}
              mt={20}
              gap={5}
              w={"100%"}
            >
              <Flex
                gap={2}
                alignItems={"flex-start"}
                flexDir={"column"}
                w={"25%"}
              >
                <Text fontWeight={500}>Vendor Name :</Text>
                <Select
                  onChange={(e) => setVendorName(e.target.value)}
                  value={vendorName}
                  isDisabled
                  bg={"#EEEEEE"}
                >
                  <option value="">Select</option>
                  <option value="verizon">Verizon Wireless</option>
                  <option value="at&t">At&t</option>
                </Select>
              </Flex>
              <Flex
                gap={2}
                alignItems={"flex-start"}
                flexDir={"column"}
                w={"25%"}
              >
                <Text fontWeight={500}>Vednor ID :</Text>
                <Input
                  onChange={(e) => setVendorID(e.target.value)}
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  value={vendorID}
                />
              </Flex>
              <Flex
                gap={2}
                alignItems={"flex-start"}
                flexDir={"column"}
                w={"25%"}
              >
                <Text fontWeight={500}>BAN Type :</Text>
                <Select
                  onChange={(e) => setBanType(e.target.value)}
                  value={banType}
                  bg={"#EEEEEE"}
                >
                  <option value="">Select</option>
                  <option value="Mobile BAN">Mobile BAN</option>
                </Select>
              </Flex>
              <Flex
                gap={2}
                alignItems={"flex-start"}
                flexDir={"column"}
                w={"25%"}
              >
                <Text fontWeight={500}>BAN Status :</Text>
                <Select
                  onChange={(e) => setBanStatus(e.target.value)}
                  bg={"#EEEEEE"}
                  value={banStatus? banStatus :"Active"}
                >
                  <option value="">Select</option>
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Hold">Hold</option>
                </Select>
              </Flex>
            </Flex>
            <Flex
              border={"0px solid red"}
              justifyContent={"space-between"}
              mt={14}
              gap={5}
              w={"100%"}
            >
              <Flex gap={2} flexDir={"column"} w={"25%"}>
                <Text fontWeight={500}>Invoice Method :</Text>
                <Select
                  onChange={(e) => setInvoiceMethod(e.target.value)}
                  bg={"#EEEEEE"}
                  value={invoiceMethod}
                >
                  <option value="">Select</option>
                  <option value="email">Email</option>
                  <option value="portalManual">Portal Manual</option>
                </Select>
              </Flex>

              <Flex
                gap={2}
                alignItems={"flex-start"}
                flexDir={"column"}
                w={"25%"}
              >
                <Text fontWeight={500}>Payment Type :</Text>
                <Select
                  onChange={(e) => setPaymentType(e.target.value)}
                  bg={"#EEEEEE"}
                  value={paymentType}
                >
                  <option value="">Select</option>
                  <option value="check">Check</option>
                  <option value="ach">ACH</option>
                  <option value="creditCard">Credit Card</option>
                </Select>
              </Flex>
              <Flex
                gap={2}
                alignItems={"flex-start"}
                flexDir={"column"}
                w={"25%"}
              >
                <Text fontWeight={500}>Account Number :</Text>
                <Input
                  onChange={(e) => setAccountNumber(e.target.value)}
                  bg={"#EEEEEE"}
                  borderRadius={5}
                  isDisabled
                  value={accountNumber}
                />
              </Flex>

              <Flex gap={2} alignItems={"flex-start"} flexDir={"column"}>
                <Text fontWeight={500}></Text>
              </Flex>
              <Flex gap={2} flexDir={"column"}>
                <Text fontWeight={500}></Text>
              </Flex>
            </Flex>
            <Flex border={"0px solid red"} mt={14} gap={16}>
              <Flex gap={2} flexDir={"column"}>
                <Text fontWeight={500}>Billing Cycle :</Text>
                <Flex gap={2}>
                  <Input
                    onChange={(e) => setBillingCycle(e.target.value)}
                    bg={"#EEEEEE"}
                    borderRadius={5}
                    value={billingCycle}
                  />
                </Flex>
              </Flex>
              <Flex gap={2} flexDir={"column"}>
                <Text fontWeight={500}>Billing Day :</Text>
                <Flex gap={2}>
                  <Input
                    onChange={(e) => setBillingDay(e.target.value)}
                    bg={"#EEEEEE"}
                    borderRadius={5}
                    value={billingDay}
                  />
                </Flex>
              </Flex>
            </Flex>
            <Flex flexDir={"column"} mt={5}>
              <Text fontWeight={500}>Notes :</Text>
              <Textarea
                onChange={(e) => setNotes(e.target.value)}
                value={notes}
                bg={"#EEEEEE"}
              />
            </Flex>
            <Flex flexDir={"column"} mt={10}>
              <Text bg={"#EEEEEE"} pt={3} pb={3} pl={3} fontWeight={500}>
                Billing Information
              </Text>
              <Flex border={"0px solid red"} mt={5} gap={16}>
                <Flex gap={2} flexDir={"column"}>
                  <Text fontWeight={500}>Name :</Text>
                  <Input
                    onChange={(e) => setBillingName(e.target.value)}
                    bg={"#EEEEEE"}
                    borderRadius={5}
                    value={billingName}
                  />
                </Flex>

                <Flex gap={2} flexDir={"column"}>
                  <Text fontWeight={500}>Address :</Text>
                  <Input
                    onChange={(e) => setBillingAddress(e.target.value)}
                    bg={"#EEEEEE"}
                    borderRadius={5}
                    value={billingAddress}
                  />
                </Flex>

                <Flex gap={2} flexDir={"column"}>
                  <Text fontWeight={500}>City :</Text>
                  <Input
                    onChange={(e) => setBillingCity(e.target.value)}
                    bg={"#EEEEEE"}
                    borderRadius={5}
                    value={billingCity}
                  />
                </Flex>
                <Flex gap={2} flexDir={"column"}>
                  <Text fontWeight={500}>State :</Text>
                  <Input
                    onChange={(e) => setBillingState(e.target.value)}
                    bg={"#EEEEEE"}
                    borderRadius={5}
                    value={billingState}
                  />
                </Flex>
              </Flex>
              <Flex border={"0px solid red"} mt={5} gap={16}>
                <Flex gap={2} flexDir={"column"}>
                  <Text fontWeight={500}>Zip :</Text>
                  <Input
                    onChange={(e) => setBillingZip(e.target.value)}
                    bg={"#EEEEEE"}
                    borderRadius={5}
                    value={billingZip}
                  />
                </Flex>

                <Flex gap={2} flexDir={"column"}>
                  <Text fontWeight={500}>Attn :</Text>
                  <Input
                    onChange={(e) => setBillingAttn(e.target.value)}
                    bg={"#EEEEEE"}
                    borderRadius={5}
                    value={billingAttn}
                  />
                </Flex>
                <Flex gap={2} flexDir={"column"}>
                  <Text fontWeight={500}>Country :</Text>
                  <Input
                    onChange={(e) => setBillingCountry(e.target.value)}
                    bg={"#EEEEEE"}
                    borderRadius={5}
                    value={billingCountry}
                  />
                </Flex>
              </Flex>
            </Flex>
            <Flex flexDir={"column"} mt={10}>
              <Text bg={"#EEEEEE"} pt={3} pb={3} pl={3} fontWeight={500}>
                Remittance Information
              </Text>
              <Flex border={"0px solid red"} mt={5} gap={16}>
                <Flex gap={2} flexDir={"column"}>
                  <Text fontWeight={500}>Name :</Text>
                  <Input isDisabled bg={"#EEEEEE"} borderRadius={5} value={vendorName} />
                </Flex>

                <Flex gap={2} flexDir={"column"}>
                  <Text fontWeight={500}>Address :</Text>
                  <Input
                    onChange={(e) => setRemmitenceAddress(e.target.value)}
                    bg={"#EEEEEE"}
                    borderRadius={5}
                    value={RemmitenceAddress}
                  />
                </Flex>

                <Flex gap={2} flexDir={"column"}>
                  <Text fontWeight={500}>City :</Text>
                  <Input
                    onChange={(e) => setRemmitenceCity(e.target.value)}
                    bg={"#EEEEEE"}
                    borderRadius={5}
                    value={RemmitenceCity}
                  />
                </Flex>
                <Flex gap={2} flexDir={"column"}>
                  <Text fontWeight={500}>State :</Text>
                  <Input
                    onChange={(e) => setRemmitenceState(e.target.value)}
                    bg={"#EEEEEE"}
                    borderRadius={5}
                    value={RemmitenceState}
                  />
                </Flex>
              </Flex>
              <Flex border={"0px solid red"} mt={5} gap={16}>
                <Flex gap={2} flexDir={"column"}>
                  <Text fontWeight={500}>Zip :</Text>
                  <Input
                    onChange={(e) => setRemmitenceZip(e.target.value)}
                    bg={"#EEEEEE"}
                    borderRadius={5}
                    value={RemmitenceZip}
                  />
                </Flex>

                <Flex gap={2} flexDir={"column"}>
                  <Text fontWeight={500}>Attn :</Text>
                  <Input
                    onChange={(e) => setRemmitenceAttn(e.target.value)}
                    bg={"#EEEEEE"}
                    borderRadius={5}
                    value={RemmitenceAttn}
                  />
                </Flex>
                <Flex gap={2} flexDir={"column"}>
                  <Text fontWeight={500}>Country :</Text>
                  <Input
                    onChange={(e) => setRemmitenceCountry(e.target.value)}
                    bg={"#EEEEEE"}
                    borderRadius={5}
                    value={"United States"}
                  />
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Flex gap={2}>
              <Button
                isDisabled={loading}
                onClick={handleSave}
                bg={"#4BCA6E"}
                color={"white"}
              >
                {loading ? "Loading..." : "Save"}
              </Button>
              <Button bg={"#E61A1A"} color={"white"} onClick={onClose}>
                Close
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditBan;
