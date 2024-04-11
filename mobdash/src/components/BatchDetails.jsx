import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { IoIosSend } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import BatchDetailModal from "./BatchDetailModal";

const BatchDetails = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [data, setData] = useState([]);
  const [baseData, setBaseData] = useState([]);
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailLoader, setEmailLoader] = useState(false);

  const toast = useToast();

  const getBatchData = async (company) => {
    try {
      let res = await axios.get(
        `https://api.cyberbriefs.org/mobility/filter_batch_data/${company}/`
      );

      setBaseData(res.data);
      if (res.data.length > 0) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
      console.log(res.data, "abaseeeeeeee");
    } catch (error) {
      console.log(error);
    }
  };

  const getCompanies = async () => {
    try {
      let data = await axios.get(
        "https://api.cyberbriefs.org/mobility/company_api_view"
      );
      setData(data.data);
      console.log("compp", data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectCompany = (e) => {
    const selectedName = e.target.value;
    getBatchData(selectedName);

    setSelectedCompany(selectedName);
    console.log(selectedName);
  };

  const handleSelectMonth = (e) => {
    const selectedMonth = e.target.value;
    setMonth(selectedMonth);
    console.log(selectedMonth);
  };

  const handleSelectWeek = (e) => {
    const selectedWeek = e.target.value;
    setWeek(selectedWeek);
    console.log(selectedWeek);
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      const transformeddata = baseData
        .filter((obj) => obj.approved === "True")
        .map((obj) => [
          obj.company,
          obj.Sub_Id,
          obj.Vendor_Number,
          obj.Location_Code,
          obj.Payment_Comments,
          obj.Payment_Number,
          obj.Vendor_Name_1,
          obj.Vendor_Name_2,
          obj.Vendor_Address_1,
          obj.Vendor_Address_2,
          obj.Vendor_City,
          obj.Vendor_State,
          obj.Vendor_Zip,
          obj.Vendor_Country,
          obj.Vendor_Tax_Id,
          obj.Vendor_Phone_Number,
          obj.Customer_Vendor_Account_Number,
          obj.Payment_Misc_1,
          obj.Invoice_Number,
          obj.Total_Amount,
          obj.Adjustment_Amount,
          obj.Net_Amount,
          obj.Due_Date,
          obj.Invoice_Date,
          obj.Invoice_Comments,
          obj.Invoice_Misc_1,
        ]);
      console.log("HHHHHHHHHH", transformeddata);
      if (transformeddata.length > 0) {
        let currentDate = new Date();
        let date = `${("0" + (currentDate.getMonth() + 1)).slice(-2)}/${(
          "0" + currentDate.getDate()
        ).slice(-2)}/${currentDate.getFullYear()}`;

        let obj = {
          file_name: `${transformeddata[0][0]}_${date.replace(/\//g, "-")}`,
          headings: [
            "Cust Id",
            "Sub Id",
            "Vendor Number",
            "Location Code",
            "Payment Comments",
            "Payment Number",
            "Vendor Name 1",
            "Vendor Name 2",
            "Vendor Address 1",
            "Vendor Address 2",
            "Vendor City",
            "Vendor State",
            "Vendor Zip",
            "Vendor Country",
            "Vendor Tax Id",
            "Vendor Phone Number",
            "Customer Vendor Account Number",
            "Payment Misc 1",
            "Invoice Number",
            "Total Amount",
            "Adjustment Amount",
            "Net Amount",
            "Due Date",
            "Invoice Date",
            "Invoice Comments",
            "Invoice Misc 1",
          ],
          data: transformeddata,
        };

        // API endpoint URL
        const apiUrl =
          "https://api.cyberbriefs.org/mobility/download_batch_excel";

        // Send POST request to the API
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
        console.log(response, "ressssssssss");
        // Check if the response is successful
        if (response.ok) {
          // Start downloading the Excel file
          setLoading(false);
          response.blob().then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${transformeddata[0][0]}_${date.replace(
              /\//g,
              "-"
            )}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          });
        } else {
          setLoading(false);
          // Handle error response
          console.error("Error:", response.statusText);
        }
      } else {
        setLoading(false);
        toast({
          title: "No approved data present.",
          description: "",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      toast({
        title: "There is something wrong.",
        description: "",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleSendEmail = async () => {
    try {
      setEmailLoader(true);
      // Reuse the transformed data logic from handleDownload
      const transformedData = baseData
        .filter((obj) => obj.approved === "True")
        .map((obj) => [
          obj.company,
          obj.Sub_Id,
          obj.Vendor_Number,
          obj.Location_Code,
          obj.Payment_Comments,
          obj.Payment_Number,
          obj.Vendor_Name_1,
          obj.Vendor_Name_2,
          obj.Vendor_Address_1,
          obj.Vendor_Address_2,
          obj.Vendor_City,
          obj.Vendor_State,
          obj.Vendor_Zip,
          obj.Vendor_Country,
          obj.Vendor_Tax_Id,
          obj.Vendor_Phone_Number,
          obj.Customer_Vendor_Account_Number,
          obj.Payment_Misc_1,
          obj.Invoice_Number,
          obj.Total_Amount,
          obj.Adjustment_Amount,
          obj.Net_Amount,
          obj.Due_Date,
          obj.Invoice_Date,
          obj.Invoice_Comments,
          obj.Invoice_Misc_1,
        ]);

      if (transformedData.length === 0) {
        setEmailLoader(false);
        toast({
          title: "No approved data to send.",
          description: "",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return; // Stop execution if there's no data
      }

      let currentDate = new Date();
      let date = `${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${(
        "0" + currentDate.getDate()
      ).slice(-2)}-${currentDate.getFullYear()}`;
      let fileName = `${transformedData[0][0]}_${date}`;

      const emailData = {
        file_name: fileName,
        recipients: [enteredEmail],
        subject: "Your requested Excel file",
        email_content: "Please find attached the Excel file you requested.",
        data: transformedData,
        headings: [
          "Cust Id",
          "Sub Id",
          "Vendor Number",
          "Location Code",
          "Payment Comments",
          "Payment Number",
          "Vendor Name 1",
          "Vendor Name 2",
          "Vendor Address 1",
          "Vendor Address 2",
          "Vendor City",
          "Vendor State",
          "Vendor Zip",
          "Vendor Country",
          "Vendor Tax Id",
          "Vendor Phone Number",
          "Customer Vendor Account Number",
          "Payment Misc 1",
          "Invoice Number",
          "Total Amount",
          "Adjustment Amount",
          "Net Amount",
          "Due Date",
          "Invoice Date",
          "Invoice Comments",
          "Invoice Misc 1",
        ],
      };

      const apiUrl =
        "https://api.cyberbriefs.org/mobility/send_email_with_excel";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        // Optionally, inform the user via UI that the email was sent
        setEmailLoader(false);
        toast({
          title: "Email sent successfully.",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setEnteredEmail("");
      } else {
        console.error("Error:", response.statusText);
        // Handle error response
        setEmailLoader(false);

        toast({
          title: "Something is wrong.",
          description: "",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      setEmailLoader(false);

      console.error("Error:", error);
      toast({
        title: "Error sending email.",
        description: error.toString(),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <Box w={"100%"} m={"auto"} mt={12} pt={2}>
      <Flex  justifyContent={"space-around"}>
        <Flex flexDir={"column"} w={"30%"} rowGap={2}>
          <Text fontWeight={500}>Organization</Text>
          <Select onChange={handleSelectCompany}>
            <option value="">Select Organization</option>
            {data.map((el, i) => (
              <option key={i} value={el.name}>
                {el.name}
              </option>
            ))}
          </Select>
        </Flex>
        <Flex flexDir={"column"} w={"30%"} rowGap={2}>
          <Text fontWeight={500}>Month</Text>
          <Select value={month} onChange={handleSelectMonth}>
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </Select>
        </Flex>
        <Flex flexDir={"column"} w={"30%"} rowGap={2}>
          <Text fontWeight={500}>Week</Text>
          <Select value={week} onChange={handleSelectWeek}>
            <option value="">Select Week</option>
            <option value="1">First Week</option>
            <option value="2">Second Week</option>
            <option value="3">Third Week</option>
            <option value="4">Fourth Week</option>
            <option value="5">Fifth Week</option>
          </Select>
        </Flex>
      </Flex>
      {showBtn && (
        <>
          <Flex mt={10} w={"18%"} alignItems={"center"} columnGap={2}>
            <Text w={"50%"} fontWeight={500}>
              Approved :
            </Text>
            <Text w={"50%"} bg={"green.100"} h={"20px"}></Text>
          </Flex>
          <Flex w={"18%"} alignItems={"center"} columnGap={2}>
            <Text w={"50%"} fontWeight={500}>
              Disapproved :
            </Text>
            <Text w={"50%"} h={"20px"} bg={"red.100"}></Text>
          </Flex>
        </>
      )}
      <Table
        maxH={400}
        mt={4}
        border="1"
        borderColor="#CCCCCC"
        borderRadius="md"
      >
        <Thead bg={"#EEEEEE"} color="#333333">
          <Tr>
            <Th>Vendor Name</Th>

            <Th>Customer Vendor Account Number</Th>
            <Th>Net Amount</Th>
            <Th>Due Date</Th>
            <Th>Details</Th>
          </Tr>
        </Thead>
        <Tbody>
          {baseData.length > 0 &&
            baseData.map((item, index) => (
              <Tr
                key={index}
                bgColor={
                  (item.approved == "True" ? "green.100" : "red.100") ||
                  (item.approved == null && "red.100")
                }
                _hover={{ cursor: "pointer" }}
              >
                <Td>{item.Vendor_Name_1}</Td>

                <Td>{item.Customer_Vendor_Account_Number}</Td>
                <Td>{item.Net_Amount}</Td>
                <Td>{item.Due_Date}</Td>
                <Td>
                  <BatchDetailModal
                    Cust_Id={item.company}
                    Vendor_Name={item.Vendor_Name_1}
                    raddress={item.Vendor_Address_1}
                    rCity={item.Vendor_City}
                    rState={item.Vendor_State}
                    rZip={item.Vendor_Zip}
                    Customer_Vendor_Account_Number={
                      item.Customer_Vendor_Account_Number
                    }
                    Invoice_Number={item.Invoice_Number}
                    Net_Amount={item.Net_Amount}
                    Due_Date={item.Due_Date}
                    Invoice_Date={item.Invoice_Date}
                    approved={item.approved}
                    id={item.id}
                    getBatchData={getBatchData}
                  />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      {showBtn && (
        <Flex gap={2} alignItems={"flex-end"}>
          <Button
            bg={"#4BCA6E"}
            color={"white"}
            w={"30%"}
            mt={5}
            isDisabled={loading}
            onClick={handleDownload}
          >
            {loading ? "Loading..." : "Download Excel File"}
          </Button>
          <Flex gap={2} w={"40%"} alignItems={"center"}>
            <Input
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              type="email"
              placeholder="Enter email to send excel file"
              bg={"gray.100"}
            />
            {emailLoader ? (
              <AiOutlineLoading3Quarters fontSize={30}
              color="#4BCA6E"/>

            ) : (
              <IoIosSend
                onClick={handleSendEmail}
                cursor={"pointer"}
                fontSize={30}
                color="#4BCA6E"
              />
            )}
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default BatchDetails;
