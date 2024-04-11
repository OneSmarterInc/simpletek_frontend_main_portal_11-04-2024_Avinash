import { Box, Button, Flex, Select, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DeleteMobileModel from "../DeleteMobileModel";
import EditMobileData from "../EditMobileData";
import MyContext from "../ContextApi/MyContext";

const Mobile = ({ accountNumber }) => {
  // const [data, setData] = useState([]);

  const { data, setData } = useContext(MyContext);

  const getData = async () => {
    try {
      let res = await axios.get(
        "https://api.cyberbriefs.org/mobility/api-data"
      );
      // console.log("api-data(mobile)", res.data);
      let data = res.data.filter(
        (el) => {
          if(el["Account_number"]!== null){
            return el["Account_number"] === accountNumber;
          } 
          else{
            return el["Account_number_y"] === accountNumber;
          }

        }
        
      );
      console.log("api-data(mobileee)", data);

      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    console.log(accountNumber, "mobbbbb");
  }, []);

  return (
    <Box w={"100%"} m={"auto"}>
      {data.length > 0 &&
        data.map((el, i) => {
          return (
            <Box key={i}>
              <Flex
                w={"100%"}
                justifyContent={"space-between"}
                p={4}
                bg={"#dedede"}
                alignItems={"center"}
              >
                <Text fontWeight={700}>Line # : {el["Wireless number"]}</Text>
                <Flex
                  border={"0px solid red"}
                  gap={1.5}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Flex
                    border={"0px solid red"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    gap={1}
                    w={"60%"}
                  >
                    <Text fontWeight={700} w={"80%"}>
                      Move to BAN :
                    </Text>
                    <Select bg={"#FFFFFF"} fontWeight={500}>
                      <option value="">342125539-00001</option>
                    </Select>
                  </Flex>
                  {/* <Button color={"white"} bg={"#4BCA6E"}>
                    Edit Ban
                  </Button> */}
                  <EditMobileData
                    phoneNumber={el["Wireless_number"]}
                    userName={el["User_name"]}
                    planType={el.Plans}
                    location={el.Location}
                    vendorNumber={el.vendor_number}
                    vendorName={el.vendor}
                    accountNumber={el["Account_number"]}
                    deviceID={el["Current_device_ID_4G_only"]}
                    mobileDevice={el["Device_model"]}
                    mobileIMEI={el.IMEI_NUMBER}
                    mobileSIMNum={el["SIM"]}
                    upgradeEligibleDate={el.Upgrade_eligibility_date}
                  />
                  <DeleteMobileModel
                    accountNumber={accountNumber}
                    phoneNumber={el["Wireless_number"]}
                  />
                </Flex>
              </Flex>
              <Flex
                w={"100%"}
                justifyContent={"space-between"}
                p={4}
                gap={4}
                border={"0px solid red"}
              >
                <Flex gap={1} border={"0px solid red"} w={"25%"}>
                  <Text fontWeight={500}>Phone_Number:</Text>
                  <Text>{el["Wireless_number"]}</Text>
                </Flex>
                <Flex gap={1} border={"0px solid red"} w={"25%"}>
                  <Text fontWeight={500}>User_Name:</Text>
                  <Text>{el["User_name"]}</Text>
                </Flex>
                <Flex gap={1} border={"0px solid red"} w={"25%"}>
                  <Text fontWeight={500}>Plan Type:</Text>
                  <Text>{el.Plans}</Text>
                </Flex>
                <Flex gap={1} border={"0px solid red"} w={"25%"}>
                  <Text fontWeight={500}>Location:</Text>
                  <Text>{el.Location}</Text>
                </Flex>
              </Flex>
              <Flex
                w={"100%"}
                justifyContent={"space-between"}
                p={4}
                gap={4}
                border={"0px solid red"}
              >
                <Flex gap={1} border={"0px solid red"} w={"25%"}>
                  <Text fontWeight={500}>Vendor Number:</Text>
                  <Text>{el.vendor_number}</Text>
                </Flex>
                <Flex gap={1} border={"0px solid red"} w={"25%"}>
                  <Text fontWeight={500}>Vendor Name:</Text>
                  <Text>{el.vendor}</Text>
                </Flex>
                <Flex gap={1} border={"0px solid red"} w={"25%"}>
                  <Text fontWeight={500}>Account#:</Text>
                  <Text>{el["Account_number"]}</Text>
                </Flex>
                <Flex gap={1} border={"0px solid red"} w={"25%"}>
                  <Text fontWeight={500}>Device ID:</Text>
                  <Text>{el["Current_device_ID_4G_only"]}</Text>
                </Flex>
              </Flex>
              <Flex
                w={"100%"}
                justifyContent={"space-between"}
                p={4}
                gap={4}
                border={"0px solid red"}
              >
                <Flex gap={1} border={"0px solid red"} w={"25%"}>
                  <Text fontWeight={500}>Mobile Device:</Text>
                  <Text>{el["Device_model"]}</Text>
                </Flex>
                <Flex gap={1} border={"0px solid red"} w={"25%"}>
                  <Text fontWeight={500}>Mobile IMEI:</Text>
                  <Text>{el.IMEI_NUMBER}</Text>
                </Flex>
                <Flex gap={1} border={"0px solid red"} w={"25%"}>
                  <Text fontWeight={500}>Mobile SIM Num:</Text>
                  <Text>{el["SIM"]}</Text>
                </Flex>
                <Flex gap={1} border={"0px solid red"} w={"25%"}>
                  <Text fontWeight={500}>Upgrade Eligible Date:</Text>
                  <Text>{el.Upgrade_eligibility_date}</Text>
                </Flex>
              </Flex>
            </Box>
          );
        })}
    </Box>
  );
};

export default Mobile;
