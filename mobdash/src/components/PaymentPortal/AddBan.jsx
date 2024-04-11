import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Flex,
  GridItem,
  Input,
  Select,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Box, Grid, FormControl, FormLabel } from "@chakra-ui/react";

const AddBan = () => {
  const [ban, setBan] = useState("");
  const [url, setUrl] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [bankName, setBankName] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [selectedVendors, setSelectedVendors] = useState(""); // Stores the list of selected vendors as objects

  const [vendorName, setVendorName] = useState(""); //vendor to be uploaded

  const [vendors, setVendors] = useState([]);

  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState("");
  const [authenticatorAppOption, setAuthenticatorAppOption] = useState("");
  const [authAppName, setAuthAppName] = useState("");
  const [authAppEmail, setAuthAppEmail] = useState("");
  const [authAppMobile, setAuthAppPhone] = useState("");
  const [authAppMobileName, setAuthAppPhoneName] = useState("");
  const [authAppEmailName, setAuthAppEmailName] = useState("");

  const [vendorLoader, setVendorLoader] = useState(false);
  const [companyLoader, setCompanyLoader] = useState(false);

  const toast = useToast();

  const getVendors = async () => {
    try {
      const response = await axios.get(
        "https://api.cyberbriefs.org/mobility/vendor_payment"
      );
      console.log(response);
      setVendors(response.data); // Assuming response.data is an array of vendor objects
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to fetch companies",
        description: error.message,
        status: "error",
      });
    }
  };

  const handleVendorAdd = async () => {
    try {
      setVendorLoader(true);
      const response = await axios.post(
        "https://api.cyberbriefs.org/mobility/vendor_payment",
        {
          vendor_name: vendorName,
        }
      );
      console.log(response.data);
      if (response.data) {
        setVendorLoader(false);

        toast({
          title: "Vendor added successfully",
          description: "Now you can see the added vendor into vendor List",
          status: "success",
        });
        setVendorName("");
      }
    } catch (error) {
      console.error(error);
      setVendorLoader(false);
      toast({
        title: "Failed to fetch vendors",
        description: error.message,
        status: "error",
      });
    }
  };

  const handleSave = async () => {
    let obj = {
      account_number: ban,
      ban_remmitance_address: address,
      ban_remmitance_city: city,
      ban_remmitance_state: state,
      ban_remmitance_zip: zip,
      ban_payment_mode: paymentMode,
      ban_url: url,
      ban_password: password,
      ban_username: userName,
      ban_phone_number: phone,
      vendor_name: selectedVendors,
      bank_name: bankName,
      bank_account_number: accountNumber,
      bank_routing_number: routingNumber,
      bank_account_type: accountType,
    };
    console.log("objjj", obj);
    try {
      setCompanyLoader(true);
      const response = await axios.post(
        "https://api.cyberbriefs.org/mobility/ban_payment",
        obj
      );
      if (response.data) {
        companyLoader(false);
        toast({
          title: "Company added successfully",
          status: "success",
        });

        setBan("");
        setUrl("");
        setUserName("");
        setPassword("");
        setAddress("");
        setCity("");
        setState("");
        setZip("");
        setPhone("");
        setPaymentMode("");
        setAccountType("");
        setBankName("");
        setRoutingNumber("");
        setSelectedVendors("");
        setVendorName("");
      }
    } catch (error) {
      console.error(error);
      setCompanyLoader(false);
      toast({
        title: "Failed to fetch vendors",
        description: error.message,
        status: "error",
      });
    }
  };

  const handleClear = () => {
    setBan("");
    setUrl("");
    setUserName("");
    setPassword("");
    setAddress("");
    setCity("");
    setState("");
    setZip("");
    setPhone("");
    setPaymentMode("");
    setAccountType("");
    setBankName("");
    setRoutingNumber("");
    setSelectedVendors("");
    setVendorName("");
  };

  useEffect(() => {
    getVendors();
  }, []);

  return (
    <div>
      <div className="bg-white col-span-9 space-x-2">
        <Box
          backgroundColor={"gray.800"}
          color="white"
          p="5"
          my="5"
          h={"50px"}
          mt={10}
          display={"flex"}
          alignItems={"center"}
          fontWeight="semibold"
          fontSize="md"
        >
          BAN Details :
        </Box>
        <Grid templateColumns="repeat(3, 1fr)" gap="2" mx="5">
          <FormControl>
            <FormLabel
              htmlFor="DMname"
              color="purple.800"
              fontWeight="semibold"
            >
              BAN Number
            </FormLabel>
            <Input
              type="number"
              placeholder="Ban Number"
              value={ban}
              onChange={(e) => setBan(e.target.value)}
              bg="blueGray.100"
            />
          </FormControl>
          <FormControl>
            <FormLabel
              htmlFor="DMemail"
              color="purple.800"
              fontWeight="semibold"
            >
              URL
            </FormLabel>
            <Input
              type="text"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              bg="blueGray.100"
            />
          </FormControl>
          <FormControl>
            <FormLabel
              htmlFor="DMphone"
              color="purple.800"
              fontWeight="semibold"
            >
              Username
            </FormLabel>
            <Input
              type="text"
              placeholder="Usarname"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              bg="blueGray.100"
            />
          </FormControl>
          <FormControl>
            <FormLabel
              htmlFor="DMphone"
              color="purple.800"
              fontWeight="semibold"
            >
              Password
            </FormLabel>
            <Input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="blueGray.100"
            />
          </FormControl>
          <FormControl>
            <FormLabel
              htmlFor="DMphone"
              color="purple.800"
              fontWeight="semibold"
            >
              Autopay Enabled
            </FormLabel>
            <Select>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </FormControl>
        </Grid>

        <Flex
          backgroundColor={"gray.800"}
          color="white"
          p="5"
          my="5"
          h={"50px"}
          display={"flex"}
          alignItems={"center"}
          fontWeight="semibold"
          fontSize="md"
          justifyContent=""
          mt={10}
        >
          Two Factor Authentication :
        </Flex>

        <Flex justifyContent="space-evenly">
          <Box
            className="payment-mode"
            d="flex"
            flexDirection="column"
            justifyContent="center"
            width="60"
          >
            <Box mb="4">
              <FormControl>
                <FormLabel color="gray.700" fontWeight="bold">
                  Is two factor authentication enabled ?
                </FormLabel>
                <Select
                  value={isTwoFactorEnabled}
                  onChange={(e) => setIsTwoFactorEnabled(e.target.value)}
                  shadow="base"
                  borderColor="gray.200"
                  rounded="md"
                  w="full"
                  py="2"
                  px="1"
                  color="gray.700"
                  focusBorderColor="blue.500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box className="payment-detail" w="96">
            {isTwoFactorEnabled == "Yes" && (
              <div className="mx-5">
                <div className="flex flex-col">
                  <label className="block text-gray-700 font-bold mb-2">
                    Select Option
                  </label>
                  <Select
                    value={authenticatorAppOption}
                    onChange={(e) => setAuthenticatorAppOption(e.target.value)}
                  >
                    <option value="">Select Option</option>
                    <option value="Authenticator App">Authenticator App</option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                  </Select>
                  {authenticatorAppOption == "Authenticator App" && (
                    <div className="mb-4 mt-4">
                      <label className="block text-gray-700 font-bold mb-2">
                        Person's Name Having Authenticator App
                      </label>
                      <input
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Enter account number"
                        name="accountNumber"
                        onChange={(e) => setAuthAppName(e.target.value)}
                      />
                    </div>
                  )}
                  {authenticatorAppOption == "Email" && (
                    <>
                      <div className="mb-4 mt-4">
                        <label className="block text-gray-700 font-bold mb-2">
                          Enter Email Receiver's Name
                        </label>
                        <input
                          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          placeholder="Enter name"
                          onChange={(e) => setAuthAppEmailName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4 mt-4">
                        <label className="block text-gray-700 font-bold mb-2">
                          Enter Email
                        </label>
                        <input
                          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          placeholder="Enter bank name"
                          onChange={(e) => setAuthAppEmail(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  {authenticatorAppOption == "Phone" && (
                    <>
                      <div className="mb-4 mt-4">
                        <label className="block text-gray-700 font-bold mb-2">
                          Enter Otp Receiver's Name
                        </label>
                        <input
                          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          placeholder="Enter bank name"
                          onChange={(e) => setAuthAppPhoneName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4  mt-4">
                        <label className="block text-gray-700 font-bold mb-2">
                          Enter Phone Number
                        </label>
                        <input
                          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="number"
                          placeholder="Enter Phone Number"
                          onChange={(e) => setAuthAppPhone(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </Box>
        </Flex>
        <div className="mb-4" style={{"width" :"50%"}}>
          <label className="block text-gray-700 font-bold mb-2">Remark :</label>
          <input
            className="w-100 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter remark here"
            
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>
        <Box
          backgroundColor={"gray.800"}
          color="white"
          p="5"
          my="5"
          h={"50px"}
          mt={10}
          display={"flex"}
          alignItems={"center"}
          fontWeight="semibold"
          fontSize="md"
        >
          Remmitance:
        </Box>
        <Grid templateColumns="repeat(3, 1fr)" gap="2" mx="5" mt="4">
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel
                htmlFor="street"
                color="purple.800"
                fontWeight="semibold"
              >
                Remmitance Address
              </FormLabel>
              <Input
                id="street"
                placeholder="Street Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                bg="blueGray.100"
              />
            </FormControl>
            <Grid templateColumns="repeat(3, 1fr)" gap="2">
              <FormControl>
                <FormLabel htmlFor="city">City</FormLabel>
                <Input
                  id="city"
                  name="city"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  bg="blueGray.100"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="state">State</FormLabel>
                <Input
                  id="state"
                  name="state"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  bg="blueGray.100"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="zip">Zip</FormLabel>
                <Input
                  id="zip"
                  name="zip"
                  placeholder="Zip Code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  bg="blueGray.100"
                />
              </FormControl>
            </Grid>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel
                htmlFor="phone"
                color="purple.800"
                fontWeight="semibold"
              >
                Phone
              </FormLabel>
              <Input
                type="tel"
                placeholder="Eg. 123-456-7890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                bg="blueGray.100"
              />
            </FormControl>
          </GridItem>
        </Grid>
        <Flex
          backgroundColor={"gray.800"}
          color="white"
          p="5"
          my="5"
          h={"50px"}
          display={"flex"}
          alignItems={"center"}
          fontWeight="semibold"
          fontSize="md"
          justifyContent=""
          mt={10}
        >
          Payment Mode:
        </Flex>

        <Flex justifyContent="space-evenly">
          <Box
            className="payment-mode"
            d="flex"
            flexDirection="column"
            justifyContent="center"
            width="60"
          >
            <Box mb="4">
              <FormControl>
                <FormLabel color="gray.700" fontWeight="bold">
                  Payment Mode
                </FormLabel>
                <Select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  shadow="base"
                  borderColor="gray.200"
                  rounded="md"
                  w="full"
                  py="2"
                  px="3"
                  color="gray.700"
                  focusBorderColor="blue.500"
                >
                  <option value="">Select Mode</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="ACH">ACH</option>
                  <option value="Cheque">Cheque</option>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box className="payment-detail" w="96">
            {(paymentMode == "Cheque" || paymentMode == "ACH") && (
              <div className="mx-5">
                <div className="flex flex-col">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Account Number
                    </label>
                    <input
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Enter account number"
                      name="accountNumber"
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Bank Name
                    </label>
                    <input
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Enter bank name"
                      name="bankName"
                      onChange={(e) => setBankName(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Account Type
                    </label>
                    <Select
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value)}
                    >
                      <option value="">Select Account Type</option>

                      <option value="Checking">Checking</option>
                      <option value="Savings">Savings</option>
                    </Select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Routing Number
                    </label>
                    <input
                      className="shadow w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Routing Number"
                      name="routingNumber"
                      onChange={(e) => setRoutingNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </Box>
        </Flex>

        <Flex flexDirection="column" alignItems="center" mt="10">
          <Text
            fontSize="md"
            fontWeight="semibold"
            backgroundColor={"gray.800"}
            color="white"
            h={"50px"}
            display={"flex"}
            alignItems={"center"}
            p="5"
            w="full"
            textAlign=""
          >
            Vendor :
          </Text>
          <Flex gap="10" mt="3" alignItems="center">
            <VStack mb="5" alignItems="start" w="40%">
              <label>Vendor Name</label>
              <Flex w="100%" gap="2">
                <Select
                  placeholder="Select Vendor"
                  onChange={(e) => setSelectedVendors(e.target.value)}
                >
                  {vendors.length > 0 &&
                    vendors.map((vendor) => (
                      <option key={vendor.id} value={vendor.vendor_name}>
                        {vendor.vendor_name}
                      </option>
                    ))}
                </Select>
              </Flex>
            </VStack>
            <Text alignSelf="center">OR</Text>
            <VStack alignItems="start" w="40%" mb="5">
              <label>Add Vendor</label>
              <Flex w="100%" gap="2">
                <Input
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  bg="#EEEEEE"
                  placeholder="Enter Vendor"
                />
                <Button
                  bg="#4BCA6E"
                  color="white"
                  onClick={handleVendorAdd}
                  isLoading={vendorLoader}
                >
                  Add
                </Button>
              </Flex>
            </VStack>
          </Flex>
        </Flex>

        <Flex justifyContent="end" alignItems="end" mt="10" gap="4">
          <Button
            bg="red.400"
            color="white"
            rounded="full"
            w="28"
            fontSize="xl"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            onClick={handleSave}
            bg="blue.400"
            color="white"
            rounded="full"
            w="28"
            fontSize="xl"
            isLoading={companyLoader}
          >
            Save
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default AddBan;
