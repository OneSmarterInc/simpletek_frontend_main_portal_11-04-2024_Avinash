import { Box, Button, Flex, Text, Select, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSave } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import UploadContractFile from "./UploadContractFile";
import { useParams } from "react-router-dom";

const ViewContract = () => {
  const [data, setData] = useState([]);
  const [contractData, setContractData] = useState([]);
  const [editableIndex, setEditableIndex] = useState(-1);
  const [companyName, setCompanyName] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [pdfLink, setPdfLink] = useState("");
  const [contractPerson, setContractPerson] = useState("");
  const [date, setDate] = useState("");
  const [term, SetTerm] = useState("");
  const [fileName, setFileName] = useState("");
  const [contractStatus, setContractStatus] = useState("");
  const [contractNotes, setContractNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const { company, vendor } = useParams();
  console.log(company, vendor);

  const toast = useToast();

  const getCompanies = async () => {
    try {
      let data = await axios.get(
        "https://api.cyberbriefs.org/mobility/company_api_view"
      );
      // console.log("compdata", data.data);
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getViewContracts = async () => {
    try {
      let response = await axios.get(
        "https://api.cyberbriefs.org/mobility/view_contract"
      );

      response = response.data.filter(
        (el) =>
          el.contract_company_name == vendorName &&
          el.contract_vendor_name == companyName
      );
        if(response.length > 0){
          setShow(true);
      setPdfLink(response[0].contract_pdf_path);
      setFileName(response[0].contract_filename);
      setContractPerson(response[0].person_name);
      setDate(response[0].Date_signed);
      SetTerm(response[0].Term);
      setContractNotes(response[0].contract_notes);
      setContractStatus(response[0].contract_status);
        }
      console.log("contraa",response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanies();

    setCompanyName(company);
    setVendorName(vendor);
  }, []);

 
  // Function to toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(true);
  };

  const handleSave =async () => {
    let editObj = {
      filename: fileName,
      company_name: vendorName,
      vendor_name: companyName,
      Person_name: contractPerson,
      Date_Signed: date,
      Terms: term,
      contract_notes: contractNotes,
      contract_status: contractStatus,
    };
    // console.log("emobbb",editObj);
    try {
      setLoading(true);
      let response = await axios.post(
        "https://api.cyberbriefs.org/mobility/edit_contract",
        editObj
      );
      console.log(response);
     if (response.status == 200) {
      setLoading(false);
      toast({
        title: "Data Edited Successfully",
        description: "",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      window.location.reload();
      setIsEditing(false);
      
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
    getViewContracts();
  }, [companyName, vendorName]);


  const handleDelete = async () => {
    let deleteObj = {
      filename: fileName,
      company_name: vendorName,
      vendor_name: companyName
    };
    // console.log("emobbb",deleteObj);
    try {
      setLoading(true);
      let response = await axios.post(
        "https://api.cyberbriefs.org/mobility/delete_contract",
        deleteObj
      );
      console.log(response);
     if (response.status == 200) {
      setLoading(false);
      toast({
        title: "Data Deleted Successfully",
        description: "",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      getViewContracts()
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

  return (
    <Flex
      flexDirection={"column"}
      w={"100%"}
      border={"0px solid red"}
      m={"auto"}
      mt={14}
    >
      <Flex border={"0px solid red"} gap={5} mb={20}>
        <Flex
          flexDir={"column"}
          border={"0px solid black"}
          w={"30%"}
          rowGap={2}
        >
          <Text fontWeight={500}>Organization</Text>
          <Select value={companyName}>
            <option value="">Select Organization</option>
            {data.length > 0 &&
              data.map((el, i) => (
                <option key={i} value={el.name}>
                  {el.name}
                </option>
              ))}
          </Select>
        </Flex>
        <Flex flexDir={"column"} w={"30%"} rowGap={2}>
          <Text fontWeight={500}>Vendor</Text>
          <Select
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
          >
            <option value="">Select Vendor</option>
            <option value="verizon">Verizon</option>
            <option value="at&t">At&t</option>
          </Select>
        </Flex>
      </Flex>
      <Text fontWeight={500} color={"#6B1010"}>
        View Contract :
      </Text>
{show ?
      <Box
        boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
        borderRadius={10}
        mt={2}
        border={"0px solid red"}
        maxH={"500px"}
      >
        <Flex
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
          borderTopRadius={10}
          pb={2}
          pt={2}
          pl={2}
          bg={"#EEEEEE"}
          border={"0px solid black"}
          borderBottom={"0px"}
          justifyContent={"space-around"}
          alignItems={"center"}
          mb={3}
        >
          <Text w={"2%"} borderRight={"0px solid black"} fontWeight={500}>
            No.
          </Text>
          <Text w={"12%"} borderRight={"0px solid black"} fontWeight={500}>
            Vendor{" "}
          </Text>
          <Text w={"12%"} borderRight={"0px solid black"} fontWeight={500}>
            Contract Person
          </Text>
          <Text w={"9%"} borderRight={"0px solid black"} fontWeight={500}>
            Date Signed
          </Text>
          <Text w={"10%"} borderRight={"0px solid black"} fontWeight={500}>
            Due Date{" "}
          </Text>
          <Text w={"15%"} fontWeight={500}>
            Attachment
          </Text>
          <Text fontWeight={500} w={"15%"}>
            Edit/Delete
          </Text>
        </Flex>

        <Flex
          justifyContent={"space-around"}
          border={"0px solid black"}
          pt={1}
          pb={1}
          pl={2}
        >
          <Text w={"2%"} borderRight={"0px solid black"} fontWeight={500}>
            1
          </Text>

          <Input w={"12%"} value={vendorName} readOnly />

          <Input
            w={"12%"}
            
            value={contractPerson}
            readOnly={!isEditing}
            onChange={(e) => setContractPerson(e.target.value)}
          />

          <Input
            w={"9%"}
           
            
            value={date}
            readOnly={!isEditing}
            onChange={(e) => setDate(e.target.value)}
          />

          <Input
            w={"10%"}
           
            value={term}
            readOnly={!isEditing}
            onChange={(e) => SetTerm(e.target.value)}
          />

          <Text w={"15%"} color={"blue"}>
            <a
              href={`https://api.cyberbriefs.org${pdfLink}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Attachment
            </a>
          </Text>
          <Flex w={"15%"} gap={6}>
            {isEditing ? (
              <IoSave
                cursor={"pointer"}
                fontSize={25}
                color="#4BCA6E"
                onClick={handleSave}
              />
            ) : (
              <FaEdit
                cursor={"pointer"}
                fontSize={25}
                color="#4BCA6E"
                onClick={toggleEditMode}
              />
            )}
            <MdDelete onClick={handleDelete} cursor={"pointer"} fontSize={25} color="#D11A2A" />
          </Flex>
        </Flex>
        <Flex
          p={1}
          alignItems={"center"}
          bg={"#EEEEEE"}
          justifyContent={"space-between"}
          mt={2}
          pl={2}
          border={"0px solid red"}
        >
          <Flex gap={7} alignItems={"center"} border={"0px solid red"} w={"30%"}>
            {/* <Flex alignItems={"center"} gap={1}>
              <TbListDetails color="skyblue" fontSize={25} />
              <Text>View Contract Details</Text>
            </Flex> */}
           
           <Text fontWeight={500}>Notes:</Text>
           <Input border={"1px solid black"} value={contractNotes} onChange={(e)=>setContractNotes(e.target.value)} readOnly={!isEditing} />
            {/* <UploadContractFile /> */}
          </Flex>
          <Flex
            w={"30%"}
            gap={2}
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <Text w={"50%"} fontWeight={500}>
              Contract Status:
            </Text>
            <Select bg={"white"} value={contractStatus} onChange={(e)=>setContractStatus(e.target.value)} isDisabled={!isEditing}>
            <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Hold">Hold</option>

            </Select>
          </Flex>
        </Flex>
      </Box>
      :
      <Text fontWeight={500} fontSize={25} >No contracts found</Text>
      }
    </Flex>
  );
};

export default ViewContract;
