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
import { Table, Thead, Tbody, Tr, Th, Td, ButtonGroup } from "@chakra-ui/react";

const UploadBatch = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [clickedButtons, setClickedButtons] = useState({});
  const [date, setDate] = useState("");

  const toast = useToast();

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCsvFile(file);
    }
  };

  const postFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", csvFile);
      formData.append("date", date);

      setLoading(true);
      const response = await axios.post(
        "https://api.cyberbriefs.org/mobility/batch_input_excel/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      console.log("aaaaaaa", response);
      if (response.data.message === "File processed successfully") {
        setLoading(false);
        fetchData();
        toast({
          title: "File uploaded successfully",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else if (
        response.data.error ===
        "Data for this company, vendor, and month is already present in the database."
      ) {
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

  const fetchData = async () => {
    const response = await axios.get(
      "https://api.cyberbriefs.org/mobility/creditcard_batch"
    ); // Update with your correct endpoint
    setData(response.data);
    console.log(response.data);
  };

  const handleMove = async (id, destination) => {
    try {
      setLoading(true);
      const payload = {
        Payment_Mode: destination, // This should match the field expected by your backend.
      };

      const response = await axios.patch(
        `https://api.cyberbriefs.org/mobility/update_payment_mode/${id}/`, // Update with your actual API endpoint
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setClickedButtons((prev) => ({ ...prev, [id]: destination }));

      toast({
        title: `Payment mode changed to ${destination} successfully`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      if (response.data) {
        fetchData(); // Fetch the updated data again if necessary
      }
    } catch (error) {
      toast({
        title: "Error updating payment mode.",
        description: error.toString(),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box w="100%" m="auto" mt="10">
      {/* Existing upload UI elements */}
      <Flex
        flexDir={"column"}
        alignItems={"center"}
        rowGap={20}
        w={"60%"}
        m={"auto"}
        mt={10}
      >
        <Flex
          w={"100%"}
          alignItems={"center"}
          mt={10}
          gap={5}
          flexDir={"column"}
        >
          <Flex flexDirection={"column"} w={"100%"} gap={1}>
            <Text fontWeight={500} mb={5}>
              Upload Batch File <span style={{ color: "red" }}>*</span>
            </Text>
            <Input type="file" accept=".csv" onChange={handleFileChange} />
          </Flex>
          <Flex flexDir={"column"} w={"100%"} rowGap={2}>
            <Text fontWeight={500}>
              Date <span style={{ color: "red" }}>*</span>
            </Text>
            <Input value={date} type="date" onChange={handleDateChange} />
          </Flex>
        </Flex>
        <Button
          color={"white"}
          bg={"#B73232"}
          w={"50%"}
          onClick={postFile}
          isDisabled={loading}
        >
          {loading ? "Loading..." : "Upload"}
        </Button>
      </Flex>

      {/* Table structure for displaying data */}
      {data.length > 0 && (
        <Table variant="simple" mt={10} w={"300px"}>
          <Thead>
            <Tr>
              <Th>Cust_ID</Th>
              <Th>Customer_Vendor_Account_Number</Th>
              <Th>Location_Code</Th>
              <Th>Payment_Number</Th>
              <Th>Vendor_Address_1</Th>
              <Th>Vendor_City</Th>
              <Th>Vendor_State</Th>
              <Th>Vendor_Zip</Th>
              <Th>Invoice_Number</Th>
              <Th>Net_Amount</Th>
              <Th>Due_Date</Th>
              <Th>Invoice_Date</Th>
              <Th>Company</Th>
              <Th>Date</Th>
              <Th>Payment Mode</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.id}>
                <Td>{item.Cust_Id}</Td> {/* Example data field */}
                <Td>{item.Customer_Vendor_Account_Number}</Td>
                <Td>{item.Location_Code}</Td>
                <Td>{item.Payment_Number}</Td>
                <Td>{item.Vendor_Address_1}</Td>
                <Td>{item.Vendor_City}</Td>
                <Td>{item.Vendor_State}</Td>
                <Td>{item.Vendor_Zip}</Td>
                <Td>{item.Invoice_Number}</Td>
                <Td>{item.Net_Amount}</Td>
                <Td>{item.Due_Date}</Td>
                <Td>{item.Invoice_Date}</Td>
                <Td>{item.Company}</Td>
                <Td>{item.Date}</Td>
                <Td>{item.Payment_Mode}</Td>
                {/* <Td>{item.approved}</Td> */}
                <Td>
                  <ButtonGroup variant="outline" spacing="6">
                    {["ACH", "Cheque", "Credit Card"].map((mode) => (
                      <Button
                        key={mode}
                        colorScheme={
                          clickedButtons[item.id] === mode ? "green" : "red"
                        }
                        onClick={() => handleMove(item.id, mode)}
                      >
                        {mode}
                      </Button>
                    ))}
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default UploadBatch;
