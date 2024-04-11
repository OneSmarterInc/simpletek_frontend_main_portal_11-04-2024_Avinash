// import React, { useContext, useEffect, useState } from "react";
// import MyContext from "../ContextApi/MyContext";
// import { Box, Flex, Text } from "@chakra-ui/layout";
// import Organisation from "./Organisation";
// import { Button } from "@chakra-ui/button";
// import { Input } from "@chakra-ui/input";
// import { Select } from "@chakra-ui/select";
// import {
//   Accordion,
//   AccordionButton,
//   AccordionIcon,
//   AccordionItem,
//   AccordionPanel,
// } from "@chakra-ui/accordion";
// import Mobile from "./Mobile";
// import EditBan from "../EditBan";
// import DeleteBanModal from "../DeleteBanModal";
// import EditPortal from "../EditPortal";
// import axios from "axios";
// import AddMoreLinesModal from "../AddMoreLinesModal";
// import { useParams } from "react-router-dom";

// const NewTab = () => {
//   const [baseData, setBaseData] = useState({});
//   const [mobileData, setMobileData] = useState([]);
//   const [companyData, setCompanyData] = useState({});
//   const [companyFilteredData, setCompanyFilteredData] = useState({});
//   const [raddress, setRAddress] = useState("");
//   const [rState, setRState] = useState("");
//   const [rZip, setRZip] = useState("");
//   const [rCity, setRCity] = useState("");
//   const [shouldRenderMobile, setShouldRenderMobile] = useState(false);

//   const handleNewtabViewBills = () => {
//     window.open(
//       `http://localhost:5173/viewbills/${baseData.company}/${baseData.vendor}/${baseData.AccountNumber}`,
//       "_blank",
//       "noopener noreferrer"
//     );
//   };

//   const handleNewtabViewContract = () => {
//     window.open(
//       `http://localhost:5173/viewcontract/${baseData.company}/${baseData.vendor}`,
//       "_blank",
//       "noopener noreferrer"
//     );
//   };

//   // const getMobileData = async () => {
//   //   try {
//   //     let res = await axios.get(
//   //       "https://api.cyberbriefs.org/mobility/api-data"
//   //     );
//   //     const filteredMobileData = res.data.filter(item => item.AccountNumber === baseData.AccountNumber);
//   //     console.log("api-data(mobile)",filteredMobileData);
//   //     setMobileData(filteredMobileData);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };
//   const getCompanies = async () => {
//     try {
//       let data = await axios.get(
//         "https://api.cyberbriefs.org/mobility/company_api_view"
//       );
//       // console.log("dataaa", data.data);
//       // filteredCompany = data.data.filter(
//       //   (item) => item.name === baseData.company
//       // );
//       // console.log(filteredCompany, "fileeee");
//       setCompanyData(data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   let filteredCompany;

//   let bdata = JSON.parse(localStorage.getItem("basedata")) || [];
//   let compdata = JSON.parse(localStorage.getItem("companydata")) || [];
//   filteredCompany = compdata.filter((item) => item.name === bdata[0].company);

//   filteredCompany = filteredCompany[0];
//   console.log("bdata+++", bdata);
//   console.log("compdata+++", compdata);
//   console.log("filterdcomp+++", filteredCompany);
//   localStorage.setItem("filteredCompanyData", JSON.stringify(filteredCompany));

//   function parseAddress(input) {
//     // Split the input string by commas
//     const parts = input.split(" ");
//     console.log(parts,"ppppppppppppp");

//     // Extract the address, city, state, and zip code

//     // Format the result
//     const formattedAddress = {
//       Address:`${parts[0]} ${parts[1]} ${parts[2]} `,
//       State: parts[4],
//       Zip: parts[5],
//       City: parts[3],
//     };

//     return formattedAddress;
//   }

//   // Example usage
//   const params = useParams();

//   useEffect(() => {
//     setBaseData(bdata[0]);
//       console.log("pppparrmmss",params);
//     const input = bdata[0].Remidence_Address;
//     console.log(input, "innnn");
//     const formatted = parseAddress(input);
//     setRAddress(formatted.Address);
//     setRState(formatted.State);
//     setRZip(formatted.Zip);
//     setRCity(formatted.City);
//     console.log(formatted);
//   }, []);
//   return (
//     <Box>
//       <Organisation />
//       <Flex w={"100%"} justifyContent={"space-between"} p={4} bg={"#EEEEEE"}>
//         <Text fontWeight={700}>BAN # 1 - BAN: {baseData.AccountNumber}</Text>
//         <Text fontWeight={700}>Last updated on 06/28/2023 08:35 by MDohac</Text>
//       </Flex>
//       <Flex w={"100%"} justifyContent={"space-between"} p={4} bg={"#EEEEEE"}>
//         <Text fontWeight={700}>Base Account</Text>
//         <Flex
//           border={"0px solid red"}
//           gap={1.5}
//           justifyContent={"space-between"}
//         >
//           <EditPortal accountNumber={baseData.AccountNumber} />
//           <EditBan
//             AccountNumber={baseData.AccountNumber}
//             Vendor={baseData.vendor}
//             Invoice={baseData.Invoice_Method}
//             BillDay={baseData.Bill_Date}
//             companyName={baseData.company}
//             PaymentType = {baseData.Payment_Type}
//             BillingCycle={baseData.Duration}
//             BillingName = {baseData.Billing_Name}
//             RemidanceAddress={raddress}
//             RemidanceCity={rCity}
//             RemidanceState={rState}
//             RemidanceZip = {rZip}
//           />
//           <DeleteBanModal AccountNumber={baseData.AccountNumber} />
//           <Button onClick={handleNewtabViewBills} bg={"#D9D9D9"}>
//             View Bills
//           </Button>
//           <Button onClick={handleNewtabViewContract} bg={"#D9D9D9"}>View Contract</Button>
//         </Flex>
//       </Flex>
//       <Flex
//         w={"100%"}
//         justifyContent={"flex-end"}
//         alignItems={"center"}
//         gap={2}
//         p={4}
//         bg={"#FFFFFF"}
//       >
//         <Text fontWeight={700}>BAN Status :</Text>
//         <Select w={"10%"} color={"green"} fontWeight={500}>
//           <option value="">Active</option>
//         </Select>
//       </Flex>
//       <Flex
//         w={"100%"}
//         bg={"#EEEEEE"}
//         justifyContent={"space-between"}
//         p={4}
//         border={"0px solid red"}
//       >
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}>Vendor:</Text>
//           <Text>{baseData.vendor}</Text>
//         </Flex>
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}>Vendor ID:</Text>
//           <Text></Text>
//         </Flex>
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}>Billing Currency:</Text>
//           <Text>USD</Text>
//         </Flex>
//       </Flex>
//       <Flex
//         w={"100%"}
//         justifyContent={"space-between"}
//         p={4}
//         border={"0px solid red"}
//       >
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}>BAN Type:</Text>
//           <Text> Mobile BAN</Text>
//         </Flex>
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}>Invoice Method:</Text>
//           <Text>{baseData.Invoice_Method}</Text>
//         </Flex>
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}>Payment Type:</Text>
//           <Text>{baseData.Payment_Type}</Text>
//         </Flex>
//       </Flex>
//       <Flex
//         w={"100%"}
//         justifyContent={"space-between"}
//         p={4}
//         border={"0px solid red"}
//       >
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}>Account Number:</Text>
//           <Text>{baseData.AccountNumber}</Text>
//         </Flex>
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//         <Text fontWeight={500}>Billing Cycle:</Text>
//           <Text>{baseData.Duration}</Text>
//         </Flex>
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//         <Text fontWeight={500}>Billing Day:</Text>
//           <Text>{baseData.Bill_Date}</Text>
//         </Flex>
//       </Flex>

//       {/* <Flex
//         w={"100%"}
//         justifyContent={"space-between"}
//         p={4}
//         border={"0px solid red"}
//       >
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}>Billing Cycle:</Text>
//           <Text>{baseData.Duration}</Text>
//         </Flex>
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}>Billing Day:</Text>
//           <Text>{baseData.Bill_Date}</Text>
//         </Flex>
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}></Text>
//           <Text></Text>
//         </Flex>
//       </Flex> */}
//       <Flex
//         w={"100%"}
//         justifyContent={"space-between"}
//         p={4}
//         border={"0px solid red"}
//       >
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}>Service Type:</Text>
//           <Text></Text>
//         </Flex>
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}></Text>
//           <Text></Text>
//         </Flex>
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}></Text>
//           <Text></Text>
//         </Flex>
//       </Flex>

//       <Flex
//         w={"100%"}
//         bg={"#EEEEEE"}
//         justifyContent={"space-between"}
//         p={4}
//         border={"0px solid red"}
//       >
//         <Text fontWeight={500}>Billing Information</Text>
//       </Flex>
//       <Flex
//         w={"100%"}
//         justifyContent={"space-between"}
//         p={4}
//         border={"0px solid red"}
//       >
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}>Name:</Text>
//           <Text>{baseData.Billing_Name}</Text>
//         </Flex>
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}>Address:</Text>
//           <Text>{baseData.Client_Address}</Text>
//         </Flex>
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Flex
//             w={"70%"}
//             justifyContent={"space-between"}
//             border={"0x solid red"}
//           >
//             <Flex border={"0px solid black"} w={"50%"} gap={2}>
//               <Text fontWeight={500}>State: </Text>
//               <Text> </Text>
//             </Flex>
//             <Flex border={"0px solid black"} w={"50%"} gap={2}>
//               <Text fontWeight={500}>Zip:</Text>
//               <Text></Text>
//             </Flex>
//           </Flex>
//           <Text></Text>
//         </Flex>
//       </Flex>
//       <Flex
//         w={"100%"}
//         justifyContent={"space-between"}
//         p={4}
//         border={"0px solid red"}
//       >
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}></Text>
//           <Text></Text>
//         </Flex>
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Flex border={"0px solid red"} w={"30%"}>
//             <Text fontWeight={500}>City:</Text>
//             <Text></Text>
//           </Flex>
//           <Flex>
//             <Text fontWeight={500}>Country:</Text>
//             <Text></Text>
//           </Flex>
//         </Flex>
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}>Attn:</Text>
//           <Text></Text>
//         </Flex>
//       </Flex>

//       <Flex
//         w={"100%"}
//         bg={"#EEEEEE"}
//         justifyContent={"space-between"}
//         p={4}
//         border={"0px solid red"}
//       >
//         <Text fontWeight={500}>Remittance Information</Text>
//       </Flex>
//       <Flex
//         w={"100%"}
//         justifyContent={"space-between"}
//         p={4}
//         border={"0px solid red"}
//       >
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}>Name:</Text>
//           <Text> Verizon</Text>
//         </Flex>
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}>Address:</Text>
//           <Text>{raddress}</Text>
//         </Flex>
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Flex
//             w={"70%"}
//             justifyContent={"space-between"}
//             border={"0px solid red"}
//           >
//             <Flex border={"0px solid black"} w={"50%"} gap={2}>
//               <Text fontWeight={500}>State: </Text>
//               <Text>{rState}</Text>
//             </Flex>
//             <Flex border={"0px solid black"} w={"50%"} gap={2}>
//               <Text fontWeight={500}>Zip:</Text>
//               <Text>{rZip}</Text>
//             </Flex>
//           </Flex>
//           <Text></Text>
//         </Flex>
//       </Flex>
//       <Flex
//         w={"100%"}
//         justifyContent={"space-between"}
//         p={4}
//         border={"0px solid red"}
//       >
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}></Text>
//           <Text></Text>
//         </Flex>
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Flex border={"0px solid red"} w={"30%"} gap={1}>
//             <Text fontWeight={500}>City:</Text>
//             <Text>{rCity}</Text>
//           </Flex>
//           <Flex>
//             <Text fontWeight={500} gap={1}>
//               Country:
//             </Text>
//             <Text>United States</Text>
//           </Flex>
//         </Flex>
//         <Flex gap={1} border={"0px solid red"} w={"30%"}>
//           <Text fontWeight={500}>Attn:</Text>
//           <Text></Text>
//         </Flex>
//       </Flex>
//       <Flex
//         w={"100%"}
//         justifyContent={"space-between"}
//         p={4}
//         mt={5}
//         border={"0px solid red"}
//       >
//         <Flex rowGap={2} flexDir={"column"} justifyContent={"flex-start"}>
//           <Text fontWeight={500}>Remarks:</Text>
//           <Input type="text" placeholder="Add remarks here" />
//           <Button bg={"#4BCA6E"} color={"white"}>
//             Add Remark
//           </Button>
//         </Flex>
//         <Flex rowGap={2} flexDir={"column"} justifyContent={"flex-start"}>
//           <Text fontWeight={500}>Upload File:</Text>
//           <Flex columnGap={2}>
//             <Input type="file" />
//             <Input type="text" placeholder="Enter name for the file" />
//           </Flex>

//           <Button bg={"#4BCA6E"} color={"white"}>
//             Upload
//           </Button>
//         </Flex>
//       </Flex>

//       <Accordion
//         allowToggle
//         bg={"#EEEEEE"}
//         mt={5}
//         onChange={() => setShouldRenderMobile(true)}
//       >
//         <AccordionItem>
//           <h2>
//             <AccordionButton _expanded={{ bg: "#F8E8C1", color: "black" }}>
//               <Flex
//                 border={"0px solid red"}
//                 w={"100%"}
//                 justifyContent={"space-between"}
//                 alignItems={"center"}
//               >
//                 <Box>
//                   <Box as="span" flex="1" textAlign="left" fontWeight={"600"}>
//                     Mobile
//                   </Box>
//                   <AccordionIcon />
//                 </Box>
//                 <AddMoreLinesModal accountNumber={baseData.AccountNumber} />
//                 {/* <Button bg={"#4BCA6E"} color={"white"}>
//                   Add More Lines
//                 </Button> */}
//               </Flex>
//             </AccordionButton>
//           </h2>
//           <AccordionPanel pb={4}>
//             {shouldRenderMobile && (
//               <Mobile accountNumber={baseData.AccountNumber} />
//             )}
//           </AccordionPanel>
//         </AccordionItem>
//       </Accordion>
//     </Box>
//   );
// };

// export default NewTab;

import React, { useContext, useEffect, useState } from "react";
import MyContext from "../ContextApi/MyContext";
import { Box, Flex, Text } from "@chakra-ui/layout";
import Organisation from "./Organisation";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import Mobile from "./Mobile";
import EditBan from "../EditBan";
import DeleteBanModal from "../DeleteBanModal";
import EditPortal from "../EditPortal";
import axios from "axios";
import AddMoreLinesModal from "../AddMoreLinesModal";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const NewTab = () => {
  const [baseData, setBaseData] = useState({});
  const [companyData, setCompanyData] = useState({});
  const [companyeData, setCompanyeData] = useState([]);
  const [baseeData, setBaseeData] = useState([]);

  const [raddress, setRAddress] = useState("");
  const [rState, setRState] = useState("");
  const [rZip, setRZip] = useState("");
  const [rCity, setRCity] = useState("");
  const [shouldRenderMobile, setShouldRenderMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contractFile, setContractFile] = useState(null);
  const [contractFileName, setcontractFileName] = useState("");
  const [remarkss, setremarkss] = useState("");
  const [loadingR, setLoadingR] = useState(false)
  const { company, ban, vendor } = useParams();

  const { newBillUrl, newContractUrl } = useContext(MyContext);

  const toast = useToast();

  const handleNewtabViewBills = () => {
    window.open(
      `${newBillUrl}/${baseData.company}/${baseData.vendor}/${baseData.AccountNumber}`,
      "_blank",
      "noopener noreferrer"
    );
  };

  const handleNewtabViewContract = () => {
    window.open(
      `${newContractUrl}/${baseData.company}/${baseData.vendor}`,
      "_blank",
      "noopener noreferrer"
    );
  };

  const getCompanies = async () => {
    try {
      let data = await axios.get(
        "https://api.cyberbriefs.org/mobility/company_api_view"
      );
      setCompanyeData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getBaseData = async () => {
    try {
      let data = await axios.get(
        "https://api.cyberbriefs.org/mobility/base_data_api"
      );
      setBaseeData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContractUpload = async () => {
    try {
      if (contractFileName === "" || contractFile === null) {
        toast({
          title: "Contract File Name and File Required.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      } else {
        const formData = new FormData();
        formData.append("file", contractFile);
        formData.append("filename", contractFileName);
        formData.append("vendor_name", baseData.company);
        formData.append("company_name", baseData.vendor);

        setLoading(true);
        let res = await axios.post(
          "https://api.cyberbriefs.org/mobility/upload_contract",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.status === 200) {
          setContractFile(null);
          setcontractFileName("");
          setLoading(false);
          // alert("File uploaded successfully!");
          toast({
            title: "File uploaded successfully!",
            description: "",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading file:", error);
      // alert("Error uploading file. Please try again.");
      toast({
        title: "There is something wrong!",
        description: "",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  console.log("fcdata=-=-=--=------=", companyData);
  console.log("fbdata=-=-=--=------=", baseData);

  let add = baseData.Remidence_Address;
  console.log(add, "aaaaaaaaaaaaaaaaa");

  const handleAddRemark = async () => {
    let editedObj = {
      AccountNumber: baseData.AccountNumber,
      vendor: baseData.vendor,
      Billing_Date: baseData.Bill_Date,
      Billing_Name: baseData.Billing_Name,
      Duration: baseData.Duration,
      Payment_Type: baseeData.Payment_Type,
      Billing_Address: baseData.Billing_Address,
      billing_city: baseData.Billing_city,
      billing_state: baseData.Billing_State,
      billing_zip: baseData.Billing_zip,
      billing_attn: baseData.Billing_attn,
      billing_country: baseData.Billing_country,
      Invoice_Method: baseData.Invoice_Method,
      company: baseData.company,
      Entry_type: baseData.Entry_type,
      Vendor_id: baseData.vendor_id,
      Ban_type: baseData.Ban_type,
      Ban_status: baseData.Ban_status,
      Remmitence_name: "remmitenceName",
      Remidence_Address: baseData.Remidence_Address,
      notes: baseData.notes,
      CHECK: baseData.CHECK,
      status: baseData.status,
      remarks: remarkss,
    };
    console.log("nnnnn", editedObj);
    try {
      setLoadingR(true);
      let response = await axios.post(
        "https://api.cyberbriefs.org/mobility/post_edited_data",
        editedObj
      );
     
      if (response.status == 200) {
        setLoadingR(false);
        toast({
          title: "Data successfully edited",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        window.location.reload();
      }
    } catch (error) {
      console.log(error);

      setLoadingR(false);
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
    getBaseData();
    getCompanies();
    console.log("********", baseData.Remidence_Address);
  }, []);

  useEffect(() => {
    const fcdata = companyeData.find((el) => el.name === company);
    const fbdata = baseeData.find(
      (el) =>
        el.AccountNumber === ban &&
        el.company === company &&
        el.vendor === vendor
    );
    if (fcdata) setCompanyData(fcdata);
    if (fbdata) {
      setBaseData(fbdata);
      // PO BOX 16810  NETWORK,NJ 07101-6810
      if (fbdata.Remidence_Address != null) {
        let parts = fbdata.Remidence_Address.split(",");

        let addresscity = parts[0];
        addresscity = addresscity.split(" ");
        let address = `${addresscity[0]} ${addresscity[1]} ${addresscity[2]}`;
        let city = `${addresscity[4]}`;
        let state = parts[1].split(" ")[0];
        let zip = parts[1].split(" ")[1];

        setRAddress(address);
        setRCity(city);
        setRZip(zip);
        setRState(state);
      }
    }
  }, [company, ban, vendor, companyeData, baseeData]);

  return (
    <Box>
      <Organisation companyData={companyData} />
      <Flex w={"100%"} justifyContent={"space-between"} p={4} bg={"#EEEEEE"}>
        <Text fontWeight={700}>BAN # 1 - BAN: {baseData.AccountNumber}</Text>
        <Text fontWeight={700}>Last updated on 06/28/2023 08:35 by MDohac</Text>
      </Flex>
      <Flex w={"100%"} justifyContent={"space-between"} p={4} bg={"#EEEEEE"}>
        <Text fontWeight={700}>Base Account</Text>
        <Flex
          border={"0px solid red"}
          gap={1.5}
          justifyContent={"space-between"}
        >
          <EditPortal
            url={baseData.Website}
            accountNumber={baseData.AccountNumber}
            vendor={baseData.vendor}
            company={baseData.company}
          />
          <EditBan
            AccountNumber={baseData.AccountNumber} 
            companyName={baseData.company}
            EntryType={baseData.Entry_type}
            Vendor={baseData.vendor}
            VendorID={baseData.vendor_id}
            Invoice={baseData.Invoice_Method}
            PaymentType={baseData.Payment_Type}
            BillingCycle={baseData.Duration}
            BillDay={baseData.Bill_Date}
            Notes={baseData.notes}
            BillingName={baseData.Billing_Name}
            BillingAddress={baseData.Billing_Address}
            RemidanceAddress={raddress}
            RemidanceCity={rCity}
            RemidanceState={rState}
            RemidanceZip={rZip}
            BANType={baseData.Ban_type}
            BANStatus={baseData.Ban_status}
            BillingCity={baseData.Billing_city}
            BillingState={baseData.Billing_State}
            BillingZip={baseData.Billing_zip}
            BillingAttn={baseData.Billing_attn}
            BillingCountry={baseData.Billing_country}
            Check={baseData.CHECK}
            Remarks={baseData.remarks}
            Status={baseData.status}
          />
          <DeleteBanModal
            AccountNumber={baseData.AccountNumber}
            BillDate={baseData.Bill_Date}
          />
          <Button onClick={handleNewtabViewBills} bg={"#D9D9D9"}>
            View Bills
          </Button>
          <Button onClick={handleNewtabViewContract} bg={"#D9D9D9"}>
            View Contract
          </Button>
        </Flex>
      </Flex>
      <Flex
        w={"100%"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        gap={2}
        p={4}
        bg={"#FFFFFF"}
      >
        <Text fontWeight={700}>BAN Status :</Text>
        <Text w={"10%"} color={"green"} fontWeight={500}>
        {baseData.Ban_status  ? baseData.Ban_status : "Active"}
        </Text>
      </Flex>
      <Flex
        w={"100%"}
        bg={"#EEEEEE"}
        justifyContent={"space-between"}
        p={4}
        border={"0px solid red"}
      >
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}>Vendor:</Text>
          <Text>{baseData.vendor}</Text>
        </Flex>
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}>Vendor ID:</Text>
          <Text>{baseData.vendor_id}</Text>
        </Flex>
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}>Billing Currency:</Text>
          <Text>USD</Text>
        </Flex>
      </Flex>
      <Flex
        w={"100%"}
        justifyContent={"space-between"}
        p={4}
        border={"0px solid red"}
      >
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}>BAN Type:</Text>
          <Text> Mobile BAN</Text>
        </Flex>
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}>Invoice Method:</Text>
          <Text>{baseData.Invoice_Method}</Text>
        </Flex>
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}>Payment Type:</Text>
          <Text>{baseData.Payment_Type}</Text>
        </Flex>
      </Flex>
      <Flex
        w={"100%"}
        justifyContent={"space-between"}
        p={4}
        border={"0px solid red"}
      >
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}>Account Number:</Text>
          <Text>{baseData.AccountNumber}</Text>
        </Flex>
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}>Billing Cycle:</Text>
          <Text>{baseData.Duration}</Text>
        </Flex>
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}>Billing Day:</Text>
          <Text>{baseData.Bill_Date}</Text>
        </Flex>
      </Flex>

      {/* <Flex
        w={"100%"}
        justifyContent={"space-between"}
        p={4}
        border={"0px solid red"}
      >
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}>Billing Cycle:</Text>
          <Text>{baseData.Duration}</Text>
        </Flex>
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}>Billing Day:</Text>
          <Text>{baseData.Bill_Date}</Text>
        </Flex>
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}></Text>
          <Text></Text>
        </Flex>
      </Flex> */}
      <Flex
        w={"100%"}
        justifyContent={"space-between"}
        p={4}
        border={"0px solid red"}
      >
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}></Text>
          <Text></Text>
        </Flex>
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}></Text>
          <Text></Text>
        </Flex>
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}></Text>
          <Text></Text>
        </Flex>
      </Flex>

      <Flex
        w={"100%"}
        bg={"#EEEEEE"}
        justifyContent={"space-between"}
        p={4}
        border={"0px solid red"}
      >
        <Text fontWeight={500}>Billing Information</Text>
      </Flex>
      <Flex
        w={"100%"}
        justifyContent={"space-between"}
        p={4}
        border={"0px solid red"}
      >
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}>Name:</Text>
          <Text>{baseData.Billing_Name}</Text>
        </Flex>
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}>Address:</Text>
          <Text>{baseData.Billing_Address}</Text>
        </Flex>
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Flex
            w={"70%"}
            justifyContent={"space-between"}
            border={"0x solid red"}
          >
            <Flex border={"0px solid black"} w={"50%"} gap={2}>
              <Text fontWeight={500}>State: </Text>
              <Text>{baseData.Billing_State} </Text>
            </Flex>
            <Flex border={"0px solid black"} w={"50%"} gap={2}>
              <Text fontWeight={500}>Zip:</Text>
              <Text>{baseData.Billing_zip}</Text>
            </Flex>
          </Flex>
          <Text></Text>
        </Flex>
      </Flex>
      <Flex
        w={"100%"}
        justifyContent={"space-between"}
        p={4}
        border={"0px solid red"}
      >
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}></Text>
          <Text></Text>
        </Flex>
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Flex border={"0px solid red"} w={"30%"}>
            <Text fontWeight={500}>City:</Text>
            <Text>{baseData.Billing_city}</Text>
          </Flex>
          <Flex>
            <Text fontWeight={500}>Country:</Text>
            <Text>{baseData.Billing_country}</Text>
          </Flex>
        </Flex>
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}>Attn:</Text>
          <Text>{baseData.Billing_attn}</Text>
        </Flex>
      </Flex>

      <Flex
        w={"100%"}
        bg={"#EEEEEE"}
        justifyContent={"space-between"}
        p={4}
        border={"0px solid red"}
      >
        <Text fontWeight={500}>Remittance Information</Text>
      </Flex>
      <Flex
        w={"100%"}
        justifyContent={"space-between"}
        p={4}
        border={"0px solid red"}
      >
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}>Name:</Text>
          <Text> {baseData.vendor}</Text>
        </Flex>
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}>Address:</Text>
          <Text>{raddress}</Text>
        </Flex>
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Flex
            w={"70%"}
            justifyContent={"space-between"}
            border={"0px solid red"}
          >
            <Flex border={"0px solid black"} w={"50%"} gap={2}>
              <Text fontWeight={500}>State: </Text>
              <Text>{rState}</Text>
            </Flex>
            <Flex border={"0px solid black"} w={"50%"} gap={2}>
              <Text fontWeight={500}>Zip:</Text>
              <Text>{rZip}</Text>
            </Flex>
          </Flex>
          <Text></Text>
        </Flex>
      </Flex>
      <Flex
        w={"100%"}
        justifyContent={"space-between"}
        p={4}
        border={"0px solid red"}
      >
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}></Text>
          <Text></Text>
        </Flex>
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Flex border={"0px solid red"} w={"30%"} gap={1}>
            <Text fontWeight={500}>City:</Text>
            <Text>{rCity}</Text>
          </Flex>
          <Flex>
            <Text fontWeight={500} gap={1}>
              Country:
            </Text>
            <Text>United States</Text>
          </Flex>
        </Flex>
        <Flex gap={1} border={"0px solid red"} w={"30%"}>
          <Text fontWeight={500}>Attn:</Text>
          <Text></Text>
        </Flex>
      </Flex>
      <Flex
        w={"100%"}
        justifyContent={"space-between"}
        p={4}
        mt={5}
        border={"0px solid red"}
      >
        <Flex rowGap={2} flexDir={"column"} justifyContent={"flex-start"}>
          <Text fontWeight={500}>Remarks:</Text>
          <Input onChange={(e)=>setremarkss(e.target.value)} defaultValue={baseData.remarks} type="text" placeholder="Add remarks here" />
          <Button
            onClick={handleAddRemark}
            bg={"#4BCA6E"}
            color={"white"}
            isDisabled={loadingR}
          >
            {loadingR ? "Loading..." : "Add Remark"}
           
          </Button>
        </Flex>
        <Flex rowGap={2} flexDir={"column"} justifyContent={"flex-start"}>
          <Text fontWeight={500}>Upload Contract File:</Text>
          <Flex columnGap={2}>
            <Input
              type="file"
              onChange={(e) => setContractFile(e.target.files[0])}
            />
            <Input
              type="text"
              placeholder="Enter name for the file"
              onChange={(e) => setcontractFileName(e.target.value)}
            />
          </Flex>

          <Button
            isDisabled={loading}
            onClick={handleContractUpload}
            bg={"#4BCA6E"}
            color={"white"}
          >
            {loading ? "Loading..." : "Upload"}
          </Button>
        </Flex>
      </Flex>

      <Accordion
        allowToggle
        bg={"#EEEEEE"}
        mt={5}
        onChange={() => setShouldRenderMobile(true)}
      >
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "#F8E8C1", color: "black" }}>
              <Flex
                border={"0px solid red"}
                w={"100%"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box>
                  <Box as="span" flex="1" textAlign="left" fontWeight={"600"}>
                    Mobile
                  </Box>
                  <AccordionIcon />
                </Box>
                <AddMoreLinesModal accountNumber={baseData.AccountNumber} vendorName ={baseData.vendor} />
                {/* <Button bg={"#4BCA6E"} color={"white"}>
                  Add More Lines
                </Button> */}
              </Flex>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {shouldRenderMobile && (
              <Mobile accountNumber={baseData.AccountNumber} />
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default NewTab;
