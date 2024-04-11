import { Box, Button, Flex, Select, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import MyContext from "./ContextApi/MyContext";

const Mapping = () => {
  const [selectedValues, setSelectedValues] = useState({});
  const [columnsdata, setColumnsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableAccounts, setAvailableAccounts] = useState([]);
  const [billDate, setBillDate] = useState([]);

  const [wirelessNumber, setWirelessNumber] = useState("NA");
  const [userName, setUserName] = useState("NA");
  const [monthlyCharges, setMonthlyCharges] = useState("NA");
  const [superCharges, setSuperCharges] = useState("NA");
  const [thirdPartyCharges, setThirdPartyCharges] = useState("NA");
  const [totalCharges, setTotalCharges] = useState("NA");
  const [plans, setPlans] = useState("NA");
  const [currentDeviceId, setCurrentDeviceId] = useState("NA");
  const [sim, setSim] = useState("NA");
  const [deviceModel, setDeviceModel] = useState("NA");
  const [costCenter, setCostCenter] = useState("NA");
  const [simType, setSimType] = useState("NA");
  const [accountNumber, setAccountNumber] = useState("NA");

  const {
    showUploading,
    setShowUploading,
    showMapping,
    setShowMapping,
    showRDD,
    setShowRDD,
  } = useContext(MyContext);

  const toast = useToast();

  const handleToggle = () => {
    setShowRDD(true);
    setShowMapping(false);
  };

  const getColumnData = async () => {
    try {
      const res = await axios.get(
        "https://api.cyberbriefs.org/mobility/get_columns"
      );

      console.log("colmnss", res.data.length);
      const columns = res.data[res.data.length - 1]["columns"].split(",");
      setColumnsData(columns);
    } catch (error) {
      console.log(error);
    }
  };

  // const getAvailableAccounts = async () => {
  //   try {
  //     const res = await axios.get(
  //       "https://api.cyberbriefs.org/mobility/base_data_api"
  //     );
  //     console.log("current base data", res.data[0].AccountNumber);
  //     setBillDate(res.data);
  //     const uniqueAccounts = res.data.filter(
  //       (item, index, self) =>
  //         index ===
  //         self.findIndex((t) => t.AccountNumber === item.AccountNumber)
  //     );
  //     setAvailableAccounts(uniqueAccounts);
  //     console.log("uniqu", uniqueAccounts);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const postColumnsData = async () => {
    try {
      let obj = {
        Wireless_number: wirelessNumber,
        User_name: userName,
        Monthly_Charges: monthlyCharges,
        Surcharges_and_Other_Charges_and_Credits: superCharges,
        Third_Party_Charges_includes_Tax: thirdPartyCharges,
        Total_Charges: totalCharges,
        Plans: plans,
        Current_device_ID_4G_only: currentDeviceId,
        SIM: sim,
        Device_model: deviceModel,
        Cost_center: costCenter,
        Sim_Type: simType,
        Account_number: accountNumber,
      };
      console.log("Mapping obj",obj);
      setLoading(true);
      let response = await axios.post(
        "https://api.cyberbriefs.org/mobility/post_mapping_data",
        obj
      );
      console.log("res", response);
      if (response.status === 200) {
        setLoading(false);
        toast({
          title: "Mapping Successfull",
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
    getColumnData();
    // getAvailableAccounts();
  }, [selectedValues]);

  return (
    <Flex flexDirection="column" w="80%" m="auto" alignItems={"center"}>
      <Text color={"green"} fontWeight={500} mt={10}>Note: Your CSV file is successfully uploaded.</Text>
      <Text color={"#B73232"} fontWeight={500} fontSize={18}>Now don't go anywhere without doing mapping for that csv. Mapping is mandatory after uploading CSV.</Text>

      <Flex
        justifyContent="space-between"
        w="60%"
        m="auto"
        columnGap={3}
        mt={6}
        alignItems="center"
        border={"0px solid red"}
      >
        <Box w="50%" textAlign="right">
          <Text fontWeight={500}>Wireless_number</Text>
        </Box>

        <Select
          w="50%"
          border="1px solid black"
          onChange={(e) => setWirelessNumber(e.target.value)}
        >
          <option value="">Skip--</option>
          {columnsdata.length > 0 &&
            columnsdata.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
        </Select>
        <Box w="30%" />
      </Flex>

      <Flex
        justifyContent="space-between"
        w="60%"
        m="auto"
        columnGap={3}
        mt={2}
        alignItems="center"
        border={"0px solid red"}
      >
        <Box w="50%" textAlign="right">
          <Text fontWeight={500}>User_name</Text>
        </Box>

        <Select
          w="50%"
          border="1px solid black"
          onChange={(e) => setUserName(e.target.value)}
        >
          <option value="">Skip--</option>
          {columnsdata.length > 0 &&
            columnsdata.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
        </Select>
        <Box w="30%" />
      </Flex>
      <Flex
        justifyContent="space-between"
        w="60%"
        m="auto"
        columnGap={3}
        mt={2}
        alignItems="center"
        border={"0px solid red"}
      >
        <Box w="50%" textAlign="right">
          <Text fontWeight={500}>Monthly_charges</Text>
        </Box>

        <Select
          w="50%"
          border="1px solid black"
          onChange={(e) => setMonthlyCharges(e.target.value)}
        >
          <option value="">Skip--</option>
          {columnsdata.length > 0 &&
            columnsdata.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
        </Select>
        <Box w="30%" />
      </Flex>
      <Flex
        justifyContent="space-between"
        w="60%"
        m="auto"
        columnGap={3}
        mt={2}
        alignItems="center"
        border={"0px solid red"}
      >
        <Box w="50%" textAlign="right">
          <Text fontWeight={500}>Surcharges_and_Other_Charges</Text>
        </Box>

        <Select
          w="50%"
          border="1px solid black"
          onChange={(e) => setSuperCharges(e.target.target)}
        >
          <option value="">Skip--</option>
          {columnsdata.length > 0 &&
            columnsdata.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
        </Select>
        <Box w="30%" />
      </Flex>
      <Flex
        justifyContent="space-between"
        w="60%"
        m="auto"
        columnGap={3}
        mt={2}
        alignItems="center"
        border={"0px solid red"}
      >
        <Box w="50%" textAlign="right">
          <Text fontWeight={500}>Third_party_charges</Text>
        </Box>

        <Select
          w="50%"
          border="1px solid black"
          onChange={(e) => setThirdPartyCharges(e.target.value)}
        >
          <option value="">Skip--</option>
          {columnsdata.length > 0 &&
            columnsdata.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
        </Select>
        <Box w="30%" />
      </Flex>

      <Flex
        justifyContent="space-between"
        w="60%"
        m="auto"
        columnGap={3}
        mt={2}
        alignItems="center"
        border={"0px solid red"}
      >
        <Box w="50%" textAlign="right">
          <Text fontWeight={500}>Total_charges</Text>
        </Box>

        <Select
          w="50%"
          border="1px solid black"
          onChange={(e) => setTotalCharges(e.target.value)}
        >
          <option value="">Skip--</option>
          {columnsdata.length > 0 &&
            columnsdata.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
        </Select>
        <Box w="30%" />
      </Flex>
      <Flex
        justifyContent="space-between"
        w="60%"
        m="auto"
        columnGap={3}
        mt={2}
        alignItems="center"
        border={"0px solid red"}
      >
        <Box w="50%" textAlign="right">
          <Text fontWeight={500}>Plans</Text>
        </Box>

        <Select
          w="50%"
          border="1px solid black"
          onChange={(e) => setPlans(e.target.value)}
        >
          <option value="">Skip--</option>
          {columnsdata.length > 0 &&
            columnsdata.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
        </Select>
        <Box w="30%" />
      </Flex>
      <Flex
        justifyContent="space-between"
        w="60%"
        m="auto"
        columnGap={3}
        mt={2}
        alignItems="center"
        border={"0px solid red"}
      >
        <Box w="50%" textAlign="right">
          <Text fontWeight={500}>Current_device_id</Text>
        </Box>

        <Select
          w="50%"
          border="1px solid black"
          onChange={(e) => setCurrentDeviceId(e.target.value)}
        >
          <option value="">Skip--</option>
          {columnsdata.length > 0 &&
            columnsdata.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
        </Select>
        <Box w="30%" />
      </Flex>
      <Flex
        justifyContent="space-between"
        w="60%"
        m="auto"
        columnGap={3}
        mt={2}
        alignItems="center"
        border={"0px solid red"}
      >
        <Box w="50%" textAlign="right">
          <Text fontWeight={500}>Sim</Text>
        </Box>

        <Select
          w="50%"
          border="1px solid black"
          onChange={(e) => setSim(e.target.value)}
        >
          <option value="">Skip--</option>
          {columnsdata.length > 0 &&
            columnsdata.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
        </Select>
        <Box w="30%" />
      </Flex>
      <Flex
        justifyContent="space-between"
        w="60%"
        m="auto"
        columnGap={3}
        mt={2}
        alignItems="center"
        border={"0px solid red"}
      >
        <Box w="50%" textAlign="right">
          <Text fontWeight={500}>Device_model</Text>
        </Box>

        <Select
          w="50%"
          border="1px solid black"
          onChange={(e) => setDeviceModel(e.target.value)}
        >
          <option value="">Skip--</option>
          {columnsdata.length > 0 &&
            columnsdata.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
        </Select>
        <Box w="30%" />
      </Flex>
      <Flex
        justifyContent="space-between"
        w="60%"
        m="auto"
        columnGap={3}
        mt={2}
        alignItems="center"
        border={"0px solid red"}
      >
        <Box w="50%" textAlign="right">
          <Text fontWeight={500}>Cost_center</Text>
        </Box>

        <Select
          w="50%"
          border="1px solid black"
          onChange={(e) => setCostCenter(e.target.value)}
        >
          <option value="">Skip--</option>
          {columnsdata.length > 0 &&
            columnsdata.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
        </Select>
        <Box w="30%" />
      </Flex>
      <Flex
        justifyContent="space-between"
        w="60%"
        m="auto"
        columnGap={3}
        mt={2}
        alignItems="center"
        border={"0px solid red"}
      >
        <Box w="50%" textAlign="right">
          <Text fontWeight={500}>Sim_Type</Text>
        </Box>

        <Select
          w="50%"
          border="1px solid black"
          onChange={(e) => setSimType(e.target.value)}
        >
          <option value="">Skip--</option>
          {columnsdata.length > 0 &&
            columnsdata.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
        </Select>
        <Box w="30%" />
      </Flex>
      <Flex
        justifyContent="space-between"
        w="60%"
        m="auto"
        columnGap={3}
        mt={2}
        alignItems="center"
        border={"0px solid red"}
      >
        <Box w="50%" textAlign="right">
          <Text fontWeight={500}>Account_number</Text>
        </Box>

        <Select
          w="50%"
          border="1px solid black"
          onChange={(e) => setAccountNumber(e.target.value)}
        >
          <option value="">Skip--</option>
          {columnsdata.length > 0 &&
            columnsdata.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
        </Select>
        <Box w="30%" />
      </Flex>

      <Flex justifyContent="flex-end" mt={10} w="50%" gap={3}>
        <Button w="30%" bg="#B73232" color="white" onClick={handleToggle}>
          Go Back
        </Button>

        {/* <Button w="30%" bg="#F4F4F4" onClick={handleAssignClick}>
          Assign
        </Button> */}
        <Button
          isDisabled={loading}
          w="30%"
          bg="#B73232"
          color="white"
          onClick={postColumnsData}
        >
          {loading ? "Loading..." : "Submit"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Mapping;
