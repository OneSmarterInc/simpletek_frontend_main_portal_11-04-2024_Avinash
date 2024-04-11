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

const ViewReport = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [data, setData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [enteredMail, setEnteredMail] = useState("");

  const getCompanies = async () => {
    try {
      let data = await axios.get(
        "https://api.cyberbriefs.org/mobility/company_api_view"
      );
      setData(data.data);
      // console.log("compp", data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getReports = async () => {
    try {
      let data = await axios.get(
        "https://api.cyberbriefs.org/mobility/get_report_view/"
      );
      // setReportData(data.data);
      console.log("compp", data.data);
      setReportData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectCompany = (e) => {
    const selectedName = e.target.value;

    setSelectedCompany(selectedName);
  };

  const handleSelectMonth = (e) => {
    const selectedMonth = e.target.value;
    setMonth(selectedMonth);
    console.log(selectedMonth);
  };

  const handleOpenNewTab = (link) => {
    window.open(link, "_blank", "noopener noreferrer");
  };

  const handleEmailSend = async(link,company, month, reportType, year,date) => {
    console.log(reportType, year,date);
   let obj = {};
    if(reportType === "Billed_Data_Usage"){
      obj ={
        link:link,
        email:enteredMail,
        company,
        month,
        year,
        reportType
      }
    }
    else{
      obj ={
        link:link,
        email:enteredMail,
        company,
        date,
        reportType
      }
    }
   
    let res = await axios.post(`https://api.cyberbriefs.org/mobility/send_report_email/`,obj);
    console.log(res);
  }

  useEffect(() => {
    getCompanies();
    getReports();
  }, []);

  return (
    <Box w={"100%"} m={"auto"} mt={12} pt={2}>
      <Flex justifyContent={"space-around"}>
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
      </Flex>

      <Table
        maxH={400}
        mt={4}
        border="1"
        borderColor="#CCCCCC"
        borderRadius="md"
      >
        <Thead bg={"#EEEEEE"} color="#333333">
          <Tr>
            <Th>Company</Th>

            <Th>Month</Th>
            <Th>Link</Th>
            <Th>Send report to email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reportData?.length > 0 &&
            reportData.map((item, index) => (
              <Tr
                key={index}
                bgColor={"gray.100"}
                _hover={{ cursor: "pointer" }}
              >
                <Td>{item.company}</Td>
              <Td>April</Td>
                <Td onClick={() => handleOpenNewTab(item.link)} color={"blue"}>
                  Click to open
                </Td>
                <Td>
                  <Flex gap={2} alignItems={"center"}>
                  <Input
                    type="email"
                    placeholder="Enter email"
                    bg={"white"}
                    
                    onChange={(e)=>setEnteredMail(e.target.value)}
                  />
                  <IoIosSend onClick={()=>handleEmailSend(item.link, item.company, item.month, item.report_type, item.year, item.date)} fontSize={30} color="#4BCA6E" />
                  </Flex>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ViewReport;
