import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const UploadReport = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [company, setCompany] = useState("");
  const [vendor, setVendor] = useState("");
  const [reportType, setReportType] = useState("");
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");
  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);

  const toast = useToast();

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
      setDate(""); // Reset the date if the validation fails
      e.target.value = ""; // Reset the input field
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCsvFile(file);
    }
  };

  const getCompanies = async () => {
    try {
      let data = await axios.get(
        "https://api.cyberbriefs.org/mobility/company_api_view"
      );
      setData(data.data);
      // console.log("compdata", data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const postFile = async () => {
    if (reportType === "Unbilled_Data_Usage") {
      if (
        !csvFile ||
        company == "" ||
        vendor == "" ||
        reportType == "" ||
        month == "" ||
        week == "" ||
        date == ""
      ) {
        toast({
          title: "Please select all the fields",
          description: "",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }
    } else {
      if (
        !csvFile ||
        company == "" ||
        vendor == "" ||
        reportType == "" ||
        month == ""
      ) {
        toast({
          title: "Please select all the fields",
          description: "",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append("csv_file", csvFile);
      formData.append("company", company);
      formData.append("vendor", vendor);
      formData.append("report_type", reportType);
      formData.append("month", month);
      formData.append("week", week);
      formData.append("date", date);

      

      if (reportType === "Unbilled_Data_Usage") {
        setLoading(true);
        const response = await axios.post(
          "https://api.cyberbriefs.org/mobility/report_upload_unbilled_data/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        if (response.data.success === "Data uploaded successfully.") {
          setLoading(false);
          toast({
            title: "File uploaded successfully",
            description: "",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else {
          setLoading(false);
          toast({
            title: response.data.error,
            description: "",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      } else if (reportType =="Billed_Data_Usage") {
        setLoading(true);
        const response = await axios.post(
          "https://api.cyberbriefs.org/mobility/report_upload_billed_data/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("aaaaaaa",response);
        if (response.data.success === "Data uploaded successfully.") {
          setLoading(false);
          toast({
            title: "File uploaded successfully",
            description: "",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else if(response.data.error === "Data for this company, vendor, and month is already present in the database."){
          setLoading(false);
          toast({
            title: response.data.error,
            description: "",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      }
    } catch (error) {
      setLoading(false);

      console.log(error);
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
  }, []);

  useEffect(() => {
    if (reportType == "Unbilled_Data_Usage") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [reportType]);

  return (
    <Flex
      flexDir={"column"}
      alignItems={"center"}
      rowGap={20}
      w={"60%"}
      m={"auto"}
      mt={10}
    >
      <Flex w={"100%"} alignItems={"center"} mt={10} gap={5} flexDir={"column"}>
        <Flex flexDirection={"column"} w={"100%"} gap={1}>
          <Text fontWeight={500}>
            Select Company <span style={{ color: "red" }}>*</span>
          </Text>
          <Select onChange={(e) => setCompany(e.target.value)}>
            <option value="">Select Company</option>
            {data.length > 0 &&
              data.map((el, i) => <option key={i}>{el.name}</option>)}
          </Select>
        </Flex>
        <Flex flexDirection={"column"} w={"100%"} gap={1}>
          <Text fontWeight={500}>
            Select Vendor <span style={{ color: "red" }}>*</span>
          </Text>
          <Select onChange={(e) => setVendor(e.target.value)}>
            <option value="">Select Vendor</option>
            <option value="verizon">Verizon</option>
            <option value="at&t">At&t</option>
          </Select>
        </Flex>
        <Flex flexDirection={"column"} w={"100%"} gap={1}>
          <Text fontWeight={500}>
            Select Report Type <span style={{ color: "red" }}>*</span>
          </Text>
          <Select onChange={(e) => setReportType(e.target.value)}>
            <option value="">Select Type</option>
            <option value="Unbilled_Data_Usage">Unbilled Data Usage</option>
            <option value="Billed_Data_Usage">Billed Data Usage</option>
          </Select>
        </Flex>
        <Flex flexDir={"column"} w={"100%"} rowGap={2}>
          <Text fontWeight={500}>
            Month <span style={{ color: "red" }}>*</span>
          </Text>
          <Select value={month} onChange={(e) => setMonth(e.target.value)}>
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
        {show && (
          <>
            <Flex flexDir={"column"} w={"100%"} rowGap={2}>
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
            <Flex flexDir={"column"} w={"100%"} rowGap={2}>
              <Text fontWeight={500}>
                Date <span style={{ color: "red" }}>*</span>
              </Text>
              <Input value={date} type="date" onChange={handleDateChange} />
            </Flex>
          </>
        )}
        <Flex flexDirection={"column"} w={"100%"} gap={1}>
          <Text fontWeight={500} mb={5}>
            Upload Report File <span style={{ color: "red" }}>*</span>
          </Text>
          <Input type="file" accept=".csv" onChange={handleFileChange} />
        </Flex>
      </Flex>
      <Button
        color={"white"}
        bg={"#B73232"}
        w={"100%"}
        onClick={postFile}
        isDisabled={loading}
      >
        {loading ? "Loading..." : "Upload"}
      </Button>
    </Flex>
  );
};

export default UploadReport;
