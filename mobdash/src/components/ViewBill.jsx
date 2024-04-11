import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Select,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { IoSave } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import MyContext from "./ContextApi/MyContext";
import DeleteBanModal from "./DeleteBanModal";
import ViewBillDetailModal from "./ViewBillDetailModal";
import DeleteBillModal from "./DeleteBillModal";

const ViewBill = () => {
  const [data, setData] = useState([]);
  const [showBillDetails, setShowBillDetails] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [billData, setBillData] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [mobiledata, setMobileData] = useState([]);
  const [statuss, setStatuss] = useState("");
  const [checkk, setCheckk] = useState("");
  const [paymentType, setPaymentType] = useState("");

  const { company, vendor, ban } = useParams();

  const { selectedOption, setSelectedOption } = useContext(MyContext);

  const toast = useToast();

  const getMobileData = async () => {
    try {
      let res = await axios.get(
        "https://api.cyberbriefs.org/mobility/api-data"
      );
      console.log("api-data(mobile)", accountNumber);

      let data = res.data.filter(
        (el) => el["Account_number"] == accountNumber
      );
      console.log("api-data(mobileee)", data);

      setMobileData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCompanies = async () => {
    try {
      let response = await axios.get(
        "https://api.cyberbriefs.org/mobility/company_api_view"
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getViewBills = async () => {
    try {
      // let obj = {
      //   Vendor: vendorName,
      //   BAN: accountNumber,
      //   Company: companyName,
      // };
      let response = await axios.get(
        "https://api.cyberbriefs.org/mobility/base_data_api"
      );
      // response = response.data.bill_data;
      // response = JSON.parse(response);

      response = response.data.filter(
        (el) =>
          el.AccountNumber === accountNumber &&
          el.company === companyName &&
          el.vendor === vendorName
      );
      console.log(response, "rrrrrrrrr");
      response.sort((a, b) => {
        // Assuming Bill_Date is in the format "Month Day Year"
        const dateA = new Date(a.Bill_Date);
        const dateB = new Date(b.Bill_Date);
        return dateB - dateA;
      });
      setBillData(response);
      console.log(response, "vvvvvvvvvv");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentChange = async (type, e, el) => {
    // setPaymentType(e.target.value)
    // console.log(el);
    let editedObj;
    if (type === "paymentType") {
      editedObj = {
        AccountNumber: el.AccountNumber,
        vendor: el.vendor,
        Billing_Date: el.Bill_Date,
        Billing_Name: el.Billing_Name,
        Duration: el.Duration,
        Payment_Type: e.target.value,
        Billing_Address: el.Billing_Address,
        billing_city: el.Billing_city,
        billing_state: el.Billing_State,
        billing_zip: el.Billing_zip,
        billing_attn: el.Billing_attn,
        billing_country: el.Billing_country,
        Invoice_Method: el.Invoice_Method,
        company: el.company,
        Entry_type: el.Entry_type,
        Vendor_id: el.Vendor_id,
        Ban_type: el.Ban_type,
        Ban_status: el.Ban_status,
        Remmitence_name: "remmitenceName",
        Remidence_Address: el.Remidence_Address,
        notes: el.notes,
        CHECK: el.CHECK,
        status: el.status,
        remarks: el.remarks,
      };
    } else if (type === "check") {
      editedObj = {
        AccountNumber: el.AccountNumber,
        vendor: el.vendor,
        Billing_Date: el.Bill_Date,
        Billing_Name: el.Billing_Name,
        Duration: el.Duration,
        Payment_Type: el.Payment_Type,
        Billing_Address: el.Billing_Address,
        billing_city: el.Billing_city,
        billing_state: el.Billing_State,
        billing_zip: el.Billing_zip,
        billing_attn: el.Billing_attn,
        billing_country: el.Billing_country,
        Invoice_Method: el.Invoice_Method,
        company: el.company,
        Entry_type: el.Entry_type,
        Vendor_id: el.Vendor_id,
        Ban_type: el.Ban_type,
        Ban_status: el.Ban_status,
        Remmitence_name: "remmitenceName",
        Remidence_Address: el.Remidence_Address,
        notes: el.notes,
        CHECK: e.target.value,
        status: el.status,
        remarks: el.remarks,
      };
    } else {
      editedObj = {
        AccountNumber: el.AccountNumber,
        vendor: el.vendor,
        Billing_Date: el.Bill_Date,
        Billing_Name: el.Billing_Name,
        Duration: el.Duration,
        Payment_Type: el.Payment_Type,
        Billing_Address: el.Billing_Address,
        billing_city: el.Billing_city,
        billing_state: el.Billing_State,
        billing_zip: el.Billing_zip,
        billing_attn: el.Billing_attn,
        billing_country: el.Billing_country,
        Invoice_Method: el.Invoice_Method,
        company: el.company,
        Entry_type: el.Entry_type,
        Vendor_id: el.Vendor_id,
        Ban_type: el.Ban_type,
        Ban_status: el.Ban_status,
        Remmitence_name: "remmitenceName",
        Remidence_Address: el.Remidence_Address,
        notes: el.notes,
        CHECK: el.CHECK,
        status: e.target.value,
        remarks: el.remarks,
      };
    }

    console.log("nnnnn", editedObj);
    try {
      // setLoading(true);
      let response = await axios.post(
        "https://api.cyberbriefs.org/mobility/post_edited_data",
        editedObj
      );
      console.log(response);
      if (response.status == 200) {
        // setLoading(false);
        toast({
          title: "Data successfully edited",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.log(error);

      // setLoading(false);
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

  const handleCheckChange = async (el) => {
    let editedObj = {
      AccountNumber: el.AccountNumber,
      vendor: el.vendor,
      Billing_Date: el.Bill_Date,
      Billing_Name: el.Billing_Name,
      Duration: el.Duration,
      Payment_Type: el.Payment_Type,
      Billing_Address: el.Billing_Address,
      billing_city: el.Billing_city,
      billing_state: el.Billing_State,
      billing_zip: el.Billing_zip,
      billing_attn: el.Billing_attn,
      billing_country: el.Billing_country,
      Invoice_Method: el.Invoice_Method,
      company: el.company,
      Entry_type: el.Entry_type,
      Vendor_id: el.Vendor_id,
      Ban_type: el.Ban_type,
      Ban_status: el.Ban_status,
      Remmitence_name: "remmitenceName",
      Remidence_Address: el.Remidence_Address,
      notes: el.notes,
      CHECK: checkk,
      status: el.status,
      remarks: el.remarks,
    };

    console.log("nnnnn", editedObj);
    try {
      // setLoading(true);
      let response = await axios.post(
        "https://api.cyberbriefs.org/mobility/post_edited_data",
        editedObj
      );
      console.log(response);
      if (response.status == 200) {
        // setLoading(false);
        toast({
          title: "Data successfully edited",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.log(error);

      // setLoading(false);
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
    getCompanies();
    setCompanyName(company);
    setAccountNumber(ban);
    setVendorName(vendor);
  }, []);

  useEffect(() => {
    getViewBills();
    getMobileData();
  }, [companyName, vendorName, accountNumber]);

  const toggleBillDetails = () => {
    setShowBillDetails(!showBillDetails);
    setShowAttachments(false);
  };

  const toggleAttachments = () => {
    setShowAttachments(!showAttachments);
    if (showBillDetails) {
      setShowBillDetails(false);
    }
  };

  return (
    <Flex flexDirection={"column"} w={"100%"} m={"auto"} mt={14}>
      <Flex justifyContent={"space-around"} mb={10}>
        <Flex flexDir={"column"} w={"30%"} rowGap={2}>
          <Text fontWeight={500}>Organization</Text>
          <Select
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          >
            <option value={""}>Select Organization</option>
            {data.length > 0 &&
              data.map((el, i) => (
                <option key={i} value={el.name}>
                  {el.name}
                </option>
              ))}
          </Select>
        </Flex>
        <Flex flexDir={"column"} w={"30%"} rowGap={2}>
          <Text fontWeight={500}>BAN Number</Text>
          <Select
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          >
            <option value="">Select BAN</option>
            <option value="342125539-00001">342125539-00001</option>
            <option value="685773812-00001">685773812-00001</option>
          </Select>
        </Flex>
        <Flex flexDir={"column"} w={"30%"} rowGap={2}>
          <Text fontWeight={500}>Vendor</Text>
          <Select
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
          >
            <option value="">Select Vendor</option>
            <option value="verizon">Verizon</option>
            <option value="at&t">At&t</option>
          </Select>
        </Flex>
      </Flex>
      {/* <Button onClick={()=>setSelectedOption("Add Bill")} bg={"#FDDB85"} width={"10%"} mb={10}>
        Add New Bill
      </Button> */}

      <Text fontWeight={500} color={"#6B1010"}>
        View Bills :
      </Text>

      <Box
        boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
        borderRadius={10}
        mt={2}
        maxH={"500px"}
        position="relative"
      >
        <Flex
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
          borderTopRadius={10}
          pb={2}
          pt={2}
          bg={"#EEEEEE"}
          borderBottom={"0px"}
          justifyContent={"space-around"}
          alignItems={"center"}
          mb={0}
        >
          <Text w={"2%"} borderRight={"0px solid black"} fontWeight={500}>
            ID
          </Text>
          <Text w={"19%"} borderRight={"0px solid black"} fontWeight={500}>
            BAN & Vendor{" "}
          </Text>
          <Text w={"16%"} borderRight={"0px solid black"} fontWeight={500}>
            Invoice Number
          </Text>
          <Text w={"20%"} borderRight={"0px solid black"} fontWeight={500}>
            Bill Dates{" "}
          </Text>
          <Text w={"9%"} borderRight={"0px solid black"} fontWeight={500}>
            Total Bill{" "}
          </Text>
          <Text w={"10%"} borderRight={"0px solid black"} fontWeight={500}>
            Payment Type{" "}
          </Text>
          <Text w={"15%"} fontWeight={500}>
            Status
          </Text>
        </Flex>
        {billData.length > 0 &&
          billData.map((el, i) => (
            <>
              <Flex
                justifyContent={"space-around"}
                pt={1}
                pb={1}
                mt={2}
                border={"0px solid red"}
              >
                <Text w={"2%"} borderRight={"0px solid black"} fontWeight={500}>
                  {i + 1}
                </Text>
                <Flex
                  w={"19%"}
                  borderRight={"0px solid black"}
                  flexDir={"column"}
                >
                  <Text>{el.AccountNumber}</Text>
                  <Text>{el.vendor}</Text>
                  <Text fontWeight={500}>
                    Auto-Pay Enabled: <span>No</span>
                  </Text>
                </Flex>
                <Text
                  w={"16%"}
                  borderRight={"0px solid black"}
                  fontWeight={500}
                >
                  {el.InvoiceNumber}
                </Text>
                <Flex
                  w={"20%"}
                  borderRight={"0px solid black"}
                  flexDir={"column"}
                >
                  <Text fontWeight={500}>
                    Bill Date: <span>{el.Bill_Date}</span>{" "}
                  </Text>
                  <Text fontWeight={500}>
                    Due Date: <span>{el.Date_Due}</span>
                  </Text>

                  <Text fontWeight={500}>
                    Date Entered: <span></span>{" "}
                  </Text>
                  <Text fontWeight={500}>
                    By: <span> </span>{" "}
                  </Text>
                </Flex>

                <Text w={"9%"} borderRight={"0px solid black"} fontWeight={500}>
                  USD {el.Total_Current_Charges}
                </Text>
                <Text
                  w={"10%"}
                  borderRight={"0px solid black"}
                  fontWeight={500}
                >
                  <Select
                    defaultValue={el.View_Bill_Payment_Type}
                    onChange={(e) => handlePaymentChange("paymentType", e, el)}
                  >
                    <option value="">Select</option>
                    <option value="check">Check</option>
                    <option value="ach">ACH</option>
                    <option value="creditCard">Credit Card</option>
                  </Select>
                </Text>
                <Flex w={"15%"} flexDir={"column"}>
                  <Select
                    defaultValue={el.status ? el.status : "active"}
                    onChange={(e) => handlePaymentChange("status", e, el)}
                  >
                    <option value="">Set Bill Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="closed">Closed</option>
                  </Select>
                  <Text color={"#4BCA6E"}>
                    Approved on: 19 Jan 2024 11:28 By SHarmo00
                  </Text>
                </Flex>
              </Flex>
              <Flex
                p={1}
                alignItems={"center"}
                bg={"#EEEEEE"}
                justifyContent={"space-between"}
                mt={5}
                border={"0px solid red"}
              >
                <Flex gap={2}>
                  <ViewBillDetailModal mobiledata={mobiledata} />
                  <a
              href={`https://api.cyberbriefs.org/mobility/media/${el.pdf_filename}`}
              target="_blank"
              rel="noopener noreferrer"
            >
                  <Button
                    bg={"#4BCA6E"}
                    color={"white"}
                    disabled={showBillDetails}
                  >
                    Attachments
                  </Button>
                  </a>
                  <DeleteBillModal
                    AccountNumber={el.AccountNumber}
                    BillDate={el.Bill_Date}
                  />
                </Flex>
                <Flex
                  gap={2}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                >
                  <Text fontWeight={500}>Check/Confirm:</Text>
                  <Input
                    bg={"white"}
                    border={"1px solid black"}
                    defaultValue={el.CHECK}
                    onChange={(e) => setCheckk(e.target.value)}
                  />
                  <IoSave
                    cursor={"pointer"}
                    onClick={() => handleCheckChange(el)}
                    fontSize={50}
                    color={"#4BCA6E"}
                  />
                </Flex>
              </Flex>
            </>
          ))}
      </Box>
    </Flex>
  );
};

export default ViewBill;

{
  /* <Box w={"100%"} boxShadow = {"rgba(0, 0, 0, 0.24) 0px 3px 8px"} borderRadius={10} m={"auto"} p={3} mt={5}>
      <Flex w={"100%"} justifyContent={"space-between"}>
        <Box>
          <Text fontWeight={500}>Build a Bear | Verizon | Akshay Agrawal </Text>
          <Text color={"#B6B6B6"} fontSize={"small"}>Status : Mapping | Date : 12-Dec-2023</Text>
        </Box>

        <Button w={"11%"} color={"white"} bg={"#B73232"}>
          View
        </Button>
      </Flex>
    </Box>
    <Box w={"100%"} boxShadow = {"rgba(0, 0, 0, 0.24) 0px 3px 8px"} borderRadius={10} m={"auto"} p={3} mt={5}>
    <Flex w={"100%"} justifyContent={"space-between"}>
      <Box>
        <Text fontWeight={500}>Build a Bear | Verizon | Avinash Kalmegh </Text>
        <Text color={"#B6B6B6"} fontSize={"small"}>Status : Mapping | Date : 12-Dec-2023</Text>
      </Box>

      <Button w={"11%"} color={"white"} bg={"#B73232"}>
        View
      </Button>
    </Flex>
  </Box>
  <Box w={"100%"} boxShadow = {"rgba(0, 0, 0, 0.24) 0px 3px 8px"} borderRadius={10} m={"auto"} p={3} mt={5}>
  <Flex w={"100%"} justifyContent={"space-between"}>
    <Box>
      <Text fontWeight={500}>Build a Bear | Verizon | Kunal Kalpande </Text>
      <Text color={"#B6B6B6"} fontSize={"small"}>Status : Mapping | Date : 12-Dec-2023</Text>
    </Box>

    <Button w={"11%"} color={"white"} bg={"#B73232"}>
      View
    </Button>
  </Flex>
</Box> */
}
