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
import Progressbar from "./ProgressBar";
import RDD from "./RDD";
import Mapping from "./Mapping";
import MyContext from "./ContextApi/MyContext";
import CVModal from "./CVModal";

const Uploading = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState("");
  const [vendor, setVendor] = useState("");

  const {
    showUploading,
    setShowUploading,
    showMapping,
    setShowMapping,
    showRDD,
    setShowRDD,
  } = useContext(MyContext);

  const toast = useToast();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const postBill = async () => {
    // console.log(company, vendor);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("company_name", company);
      formData.append("vendor_name", vendor);

      setLoading(true);
      let response = await axios.post(
        "https://api.cyberbriefs.org/mobility/uploadfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response); // Assuming the response contains data
      if (response.data == "Bill already exists,upload another one") {
        setLoading(false);
        toast({
          title: response.data,
          description: "",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else if (response.data.message == "File uploaded successfully ..") {
        setLoading(false);
        setShowUploading(false);
        setShowRDD(true);
        toast({
          title: "Bill Uploaded Successfully",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
      else if(response.data.message =="File uploaded successfully With account number which already exists in database."){
        setLoading(false);
        toast({
          title: "Bill Uploaded Successfully",
          description: "Bill with this BAN is already onboarded to our system, so there is no need to onboard it again.",
          status: "success",
          duration: 10000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getCompanies = async () => {
    try {
      let data = await axios.get(
        "https://api.cyberbriefs.org/mobility/company_api_view"
      );
      setData(data.data);
      console.log("compdata", data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoCv = () => {
    setShowRDD(true);
    setShowUploading(false);
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <Box w={"100%"} m={"auto"} mt={100}>
      <Progressbar />
      {showUploading && (
        <Flex flexDirection={"column"}>
          <Flex
            w={"100%"}
            justifyContent={"space-evenly"}
            alignItems={"flex-end"}
            mt={10}
            border={"0px solid black"}
          >
            <Flex flexDirection={"column"} w={"25%"} gap={1}>
              <Text fontWeight={500}>Select Company</Text>
              <Select onChange={(e) => setCompany(e.target.value)}>
                <option value="">Select Company</option>
                {data.length > 0 &&
                  data.map((el, i) => <option key={i}>{el.name}</option>)}
              </Select>
            </Flex>
            <Flex flexDirection={"column"} w={"25%"} gap={1}>
              <Text fontWeight={500}>Select Vendor</Text>
              <Select onChange={(e) => setVendor(e.target.value)}>
                <option value="">Select Vendor</option>
                <option value="verizon">Verizon</option>
                <option value="at&t">At&t</option>
              </Select>
            </Flex>
            <Flex flexDirection={"column"} w={"25%"} gap={1}>
              <Text fontWeight={500}>Upload Bill (RDD File/PDF File)</Text>
              <Input
                type="file"
                cursor={"pointer"}
                onChange={handleFileChange}
              />
            </Flex>
            <Button
              isDisabled={loading}
              color={"white"}
              bg={"#B73232"}
              w={"15%"}
              onClick={postBill}
            >
              {loading ? "Loading" : "Start"}
            </Button>
          </Flex>
          <Button mt={12} color={"white"} bg={"#B73232"} w={"15%"} onClick={handleGoCv}>
            Go to CSV Upload
          </Button>
        </Flex>
      )}
      {showRDD && <RDD />}
      {showMapping && <Mapping />}
    </Box>
  );
};

export default Uploading;
