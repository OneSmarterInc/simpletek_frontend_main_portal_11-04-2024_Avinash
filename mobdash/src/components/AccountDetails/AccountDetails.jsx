import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import MyContext from "../ContextApi/MyContext";

const AccountDetails = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [data, setData] = useState([]);
  const [baseData, setBaseData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const {newtab} = useContext(MyContext);

 
  const getBaseData = async () => {
    try {
      let res = await axios.get(
        "https://api.cyberbriefs.org/mobility/base_data_api"
      );
      setBaseData(res.data);
      console.log("baseData",res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getApiData = async () => {
    try {
      let res = await axios.get(
        "https://api.cyberbriefs.org/mobility/api-data"
      );

      console.log("apiData from accdetails",res.data);
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
      console.log("compp",data.data);
    } catch (error) {
      console.log(error);
    }
  };

 

  const handleSelectCompany = (e) => {
    const selectedName = e.target.value;
    setSelectedCompany(selectedName);
    filterData(selectedName, selectedVendor);
  };

  const handleSelectVendor = (e) => {
    const selectedName = e.target.value;
    setSelectedVendor(selectedName);
    filterData(selectedCompany, selectedName);
  };

  const filterData = (company, vendor) => {
    if (company && vendor) {
      const filtered = baseData.filter(
        (item) => item.company === company && item.vendor === vendor
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  const handleOpenNewTab = (ban) => {
     window.open(
      `http://localhost:5173/newtab/${selectedCompany}/${selectedVendor}/${ban}`,
      "_blank",
      "noopener noreferrer"
    );
  };


  useEffect(() => {
    getCompanies();
    getBaseData();
    getApiData();
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
          <Text fontWeight={500}>Vendor</Text>
          <Select onChange={handleSelectVendor}>
            <option value="">Select Vendor</option>
            <option value="verizon">Verizon</option>
            <option value="at&t">At&t</option>

          </Select>
        </Flex>
      </Flex>
      <Table mt={20} border="1" borderColor="#CCCCCC" borderRadius="md">
        <Thead bg={"#EEEEEE"} color="#333333">
          <Tr>
            <Th textAlign="center">No.</Th>
            <Th>Org. Name</Th>
            <Th>Vendor</Th>
            <Th>BAN</Th>
            {/* <Th>Service Qty</Th> */}
          </Tr>
        </Thead>
        <Tbody>
          {filteredData.map((item, index) => (
            <Tr key={index} onClick={()=>handleOpenNewTab(item.AccountNumber)} _hover={{bg:"gray.200",cursor:"pointer"}}>
              <Td textAlign="center">{index + 1}</Td>
              <Td>{item.company}</Td>
              <Td>{item.vendor}</Td>
              <Td>{item.AccountNumber}</Td>
              {/* <Td>{item.serviceQty}</Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AccountDetails;
