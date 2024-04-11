import React, { useEffect, useState } from "react";
import {
  Flex,
  Select,
  Input,
  Button,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Navbar from "./Navbar";

const Admin = () => {
  const [data, setData] = useState([]);
  const [link, setLink] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [reportType, setReportType] = useState("");
  const [date, setDate] = useState("");
  const [week, setWeek] = useState("");
  const [year, setYear] = useState("");

  const toast = useToast();

  const getCompanies = async () => {
    try {
      const response = await axios.get(
        "https://api.cyberbriefs.org/mobility/company_api_view"
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectCompany = (e) => {
    const selectedName = e.target.value;
    setSelectedCompany(selectedName);
    console.log(selectedName);
  };

  const handleSelectMonth = (e) => {
    // Function to handle month selection
    setSelectedMonth(e.target.value);
    console.log(e.target.value);
  };

  const validateDate = (inputDate) => {
    const selectedDate = new Date(inputDate);
    const dayOfWeek = selectedDate.getDay();

    // Days in JavaScript are 0-indexed starting with Sunday, so Monday is 1, Wednesday is 3, and Friday is 5
    if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
      return true;
    } else {
      toast({
        title: "Please select a date of Monday, Wednesday, or Friday.",
        description: "",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return false;
    }
  };

  const handleDateChange = (e) => {
    if (validateDate(e.target.value)) {
      setDate(e.target.value);
    } else {
      setDate("");
      e.target.value = "";
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(reportType);
    let obj = {
    };

    if (reportType === "Unbilled_Data_Usage") {
      obj = {
        company: selectedCompany,
      link: link,
      month: selectedMonth,
      year: year,
      report_type:reportType,
        date: date,
        week: week,
      };
    }
    else{
       obj = {
        company: selectedCompany,
        link: link,
        month: selectedMonth,
        year: year,
        report_type:reportType
      };
    }

    try {
      let response = await axios.post(
        "https://api.cyberbriefs.org/mobility/get_report_view/",
        obj
      );
      console.log(response);
      if (response.data.detail === "Report for this company already exists.") {
        toast({
          title: response.data.detail,
          description: response.data.message, // Example: Use a message returned from your API if available
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Data uploaded successfully",
          description: response.data.message, // Example: Use a message returned from your API if available
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

    // Reset the form
    // setLink("");
    // setSelectedCompany("");
    // setSelectedMonth("");
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <>
      <Box p={4} mt={20}>
        <Flex alignItems="center" gap="10px" flexDir={"column"}>
          <Flex flexDir={"column"} w={"30%"} rowGap={2}>
            <Text fontWeight={500}>
              Organization <span style={{ color: "red" }}>*</span>
            </Text>
            <Select onChange={(e) => setSelectedCompany(e.target.value)}>
              <option value="">Select Organization</option>
              {data.map((el, i) => (
                <option key={i} value={el.name}>
                  {el.name}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex flexDirection={"column"} w={"30%"} gap={1}>
            <Text fontWeight={500}>
              Select Report Type <span style={{ color: "red" }}>*</span>
            </Text>
            <Select onChange={(e) => setReportType(e.target.value)}>
              <option value="">Select Type</option>
              <option value="Unbilled_Data_Usage">Unbilled Data Usage</option>
              <option value="Billed_Data_Usage">Billed Data Usage</option>
            </Select>
          </Flex>

          {/* Conditional rendering based on reportType */}
          {reportType && (
            <>
              <Flex flexDir={"column"} w={"30%"} rowGap={2}>
                <Text fontWeight={500}>
                  Month <span style={{ color: "red" }}>*</span>
                </Text>
                <Select
                  placeholder="Select Month"
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </Select>
              </Flex>

              <Flex flexDir={"column"} w={"30%"} rowGap={2}>
                <Text fontWeight={500}>
                  Year <span style={{ color: "red" }}>*</span>
                </Text>
                <Input
                  placeholder="YYYY"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </Flex>

              <Flex flexDir={"column"} w={"30%"} rowGap={2}>
                <Text fontWeight={500}>
                  Link <span style={{ color: "red" }}>*</span>
                </Text>
                <Input
                  placeholder="Enter link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </Flex>
            </>
          )}

          {/* Additional fields for Unbilled_Data_Usage */}
          {reportType === "Unbilled_Data_Usage" && (
            <>
              <Flex flexDir={"column"} w={"30%"} rowGap={2}>
                <Text fontWeight={500}>
                  Week <span style={{ color: "red" }}>*</span>
                </Text>
                <Select value={week} onChange={(e) => setWeek(e.target.value)}>
                  <option value="">Select Week</option>
                  <option value="Week1">First Week</option>
                  <option value="Week2">Second Week</option>
                  <option value="Week3">Third Week</option>
                  <option value="Week4">Fourth Week</option>
                  <option value="Week5">Fifth Week</option>
                </Select>
              </Flex>

              <Flex flexDir={"column"} w={"30%"} rowGap={2}>
                <Text fontWeight={500}>
                  Date <span style={{ color: "red" }}>*</span>
                </Text>
                <Input value={date} type="date" onChange={handleDateChange} />
              </Flex>
            </>
          )}

          <Button onClick={handlesubmit} colorScheme="blue" w="30%">
            Submit
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default Admin;
