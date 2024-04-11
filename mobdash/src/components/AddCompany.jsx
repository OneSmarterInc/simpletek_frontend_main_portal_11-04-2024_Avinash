import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const AddCompany = () => {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [tax_id, setTaxId] = useState("");
  const [address, setAddress] = useState("");
  const [dm_first_name, setDmFirstName] = useState("");
  const [dm_last_name, setDmLastName] = useState("");
  const [dm_mobile_number, setDmMobileNumber] = useState("");
  const [sales_agent_number, setSalesAgentNumber] = useState("");
  const [sales_agent_details, setSalesAgentDetails] = useState("");
  const [notes, setNotes] = useState("");
  const [user_list_input, setUserListInput] = useState("");
  const [user_list, setUserList] = useState([]);
  const [paymentType, setPaymentType] = useState("");
  const [vendorList, setVendorList] = useState("");
  const [dmEmail, setDmEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPaymentDay, setShowPaymentDay] = useState(false);
  const [paymentDay, setPaymentDay] = useState("");
  const toast = useToast();

  const getCompanies = async () => {
    try {
      let data = await axios.get(
        "https://api.cyberbriefs.org/mobility/company_api_view"
      );
      console.log("compdata", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserListArray = () => {
    setUserList((prev) => [...prev, user_list_input]);
    setUserListInput("");
    console.log(user_list);
  };

  const postCompany = async () => {
    const now = new Date(Date.now());
    const formattedDate = now.toISOString();
    const formatted_users = user_list.join(", ");

    if (
      name === "" ||
      website === "" ||
      contact_number === "" ||
      tax_id === "" ||
      address === "" ||
      dm_first_name === "" ||
      dm_last_name === "" ||
      dm_mobile_number === "" ||
      vendorList === "" ||
      paymentType === "" ||
      dmEmail === "" ||
     (showPaymentDay && paymentDay ==="")
      ) {
      toast({
        title: "Please fill all the required fields",
        description: "",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      let company = {
        name,
        website,
        contact_number,
        tax_id,
        address,
        dm_first_name,
        dm_last_name,
        dm_mobile_number,
        sales_agent_number:
          sales_agent_number.length > 0 ? sales_agent_number : "",
        sales_agent_details:
          sales_agent_details.length > 0 ? sales_agent_details : "",
        notes: notes.length > 0 ? notes : "",
        // user_list: formatted_users.length > 0 ? formatted_users : "",
        date: formattedDate,
        vendor_list: vendorList,
        Payment_Type: paymentType,
        dm_email: dmEmail,
        Payment_Day: paymentDay
      };

      // console.log("compony", company);

      try {
        setLoading(true);
        let data = await axios.post(
          "https://api.cyberbriefs.org/mobility/post_company_data",
          company
        );
        console.log(data.status);
        if (data.status === 200) {
          setLoading(false);
          toast({
            title: "Company added successfully",
            description: "",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          setName("");
          setWebsite("");
          setContactNumber("");
          setTaxId("");
          setAddress("");
          setDmFirstName("");
          setDmLastName("");
          setDmMobileNumber("");
          setSalesAgentNumber("");
          setSalesAgentDetails("");
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
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  useEffect(() => {
    if (paymentType == "weekly") {
      setShowPaymentDay(true);
    } else {
      setShowPaymentDay(false);
    }
  }, [paymentType]);

  return (
    <Box w={"100%"} h={"100vh"} bg={"white"} mt={14}>
      <Flex
        display={"flex"}
        w={"70%"}
        m={"auto"}
        mt={10}
        justifyContent={"space-between"}
        border={"0px solid black"}
      >
        <VStack alignItems={"start"} w={"30%"}>
          <label>
            Company Name<span style={{ color: "red" }}>*</span>
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            bg={"#EEEEEE"}
            placeholder="Enter Name"
            required
          />
        </VStack>
        <VStack alignItems={"start"} w={"30%"}>
          <label>
            Website<span style={{ color: "red" }}>*</span>
          </label>
          <Input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            bg={"#EEEEEE"}
            type="website"
            placeholder="Enter Website"
          />
        </VStack>
        <VStack alignItems={"start"} w={"30%"}>
          <label>
            Contact Number<span style={{ color: "red" }}>*</span>
          </label>
          <Input
            value={contact_number}
            type="number"
            onChange={(e) => setContactNumber(e.target.value)}
            bg={"#EEEEEE"}
            placeholder="Enter Contact"
          />
        </VStack>
      </Flex>
      <Flex
        display={"flex"}
        w={"70%"}
        m={"auto"}
        mt={3}
        justifyContent={"space-between"}
        border={"0px solid black"}
      >
        <VStack alignItems={"start"} w={"30%"}>
          <label>
            Tax ID<span style={{ color: "red" }}>*</span>
          </label>
          <Input
            value={tax_id}
            onChange={(e) => setTaxId(e.target.value)}
            bg={"#EEEEEE"}
            type="number"
            placeholder="Enter tax ID"
          />
        </VStack>
        <VStack alignItems={"start"} w={"65%"}>
          <label>
            Address<span style={{ color: "red" }}>*</span>
          </label>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            bg={"#EEEEEE"}
            placeholder="Enter Address"
          />
        </VStack>
      </Flex>
      <Flex
        display={"flex"}
        w={"70%"}
        m={"auto"}
        mt={3}
        justifyContent={"space-between"}
        border={"0px solid black"}
      >
        <VStack alignItems={"start"} w={"30%"}>
          <label>
            DM First Name<span style={{ color: "red" }}>*</span>
          </label>
          <Input
            value={dm_first_name}
            onChange={(e) => setDmFirstName(e.target.value)}
            bg={"#EEEEEE"}
            placeholder="Enter DM Name First"
          />
        </VStack>
        <VStack alignItems={"start"} w={"30%"}>
          <label>
            DM Last Name <span style={{ color: "red" }}>*</span>
          </label>
          <Input
            value={dm_last_name}
            onChange={(e) => setDmLastName(e.target.value)}
            bg={"#EEEEEE"}
            placeholder="Enter DM Name Last"
          />
        </VStack>
        <VStack alignItems={"start"} w={"30%"}>
          <label>
            DM Mobile Number<span style={{ color: "red" }}>*</span>
          </label>
          <Input
            value={dm_mobile_number}
            onChange={(e) => setDmMobileNumber(e.target.value)}
            bg={"#EEEEEE"}
            type="number"
            placeholder="Enter DM Mobile"
          />
        </VStack>
      </Flex>

      <Flex
        display={"flex"}
        w={"70%"}
        m={"auto"}
        mt={3}
        justifyContent={"space-between"}
        border={"0px solid black"}
      >
        <VStack alignItems={"start"} w={"30%"}>
          <label>
            DM Email<span style={{ color: "red" }}>*</span>
          </label>
          <Input
            value={dmEmail}
            onChange={(e) => setDmEmail(e.target.value)}
            bg={"#EEEEEE"}
            placeholder="Enter Sales Agent Name"
          />
        </VStack>
        <VStack alignItems={"start"} w={"30%"}>
          <label>Sales Agent Name</label>
          <Input
            value={sales_agent_number}
            onChange={(e) => setSalesAgentNumber(e.target.value)}
            bg={"#EEEEEE"}
            placeholder="Enter Sales Agent Name"
          />
        </VStack>
        <VStack alignItems={"start"} w={"30%"}>
          <label>Sales Agent Details</label>
          <Input
            value={sales_agent_details}
            onChange={(e) => setSalesAgentDetails(e.target.value)}
            bg={"#EEEEEE"}
            placeholder="Enter Sales Agent Details"
          />
        </VStack>
      </Flex>

      <VStack alignItems={"start"} w={"70%"} m={"auto"} mt={3}>
        <label>Notes</label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          bg={"#EEEEEE"}
          placeholder="Enter Notes"
          h={"100px"}
        />
      </VStack>
      <Flex border={"0px solid red"} w={"70%"} m={"auto"} mt={4} gap={4}>
        <VStack alignItems={"start"} w={"70%"} m={"auto"} mt={3}>
          <label>
            Bill Payment Type<span style={{ color: "red" }}>*</span>
          </label>
          <Select
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option value="">Select</option>
            <option value="realTime">Real Time</option>
            <option value="weekly">Weekly</option>
          </Select>
        </VStack>
        {showPaymentDay && (
          <VStack alignItems={"start"} w={"70%"} m={"auto"} mt={3}>
            <label>
              Select Payment Day<span style={{ color: "red" }}>*</span>
            </label>
            <Select
              value={paymentDay}
              onChange={(e) => setPaymentDay(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
            </Select>
          </VStack>
        )}

        <VStack alignItems={"start"} w={"70%"} m={"auto"} mt={3}>
          <label>
            Vendor List<span style={{ color: "red" }}>*</span>
          </label>
          <Select
            value={vendorList}
            onChange={(e) => setVendorList(e.target.value)}
          >
            <option value="">Select</option>
            <option value="verizon">Verizon</option>
            <option value="at&t">At&t</option>
          </Select>
        </VStack>

        <VStack
          display={"none"}
          alignItems={"start"}
          w={"70%"}
          m={"auto"}
          mt={3}
        >
          <label>Users List</label>
          <Flex w={"100%"} gap={2}>
            <Input
              value={user_list_input}
              onChange={(e) => setUserListInput(e.target.value)}
              bg={"#EEEEEE"}
              placeholder="Enter Users"
            />
            <Button
              bg={"#4BCA6E"}
              color={"white"}
              onClick={handleUserListArray}
            >
              Add
            </Button>
          </Flex>
        </VStack>
      </Flex>
      <Flex w={"70%"} m={"auto"} mt={6} justifyContent={"space-between"}>
        <Flex
          w={"70%"}
          border={"0px solid red"}
          justifyContent={"flex-start"}
          columnGap={4}
        >
          {user_list.length > 0 &&
            user_list.map((el, i) => (
              <Button key={i} bg={"#EEEEEE"}>
                {el}
              </Button>
            ))}
        </Flex>
        <Button
          onClick={postCompany}
          bg={"#4BCA6E"}
          color={"white"}
          w={"30%"}
          mt={5}
          isDisabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </Button>
      </Flex>
    </Box>
  );
};

export default AddCompany;
