import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Select,
  Text,
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import logo from "./onetech.png";
import { AiOutlineMail } from "react-icons/ai";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditIcon } from "@chakra-ui/icons";
import EditCompany from "../EditCompany";

const Organisation = ({ companyData }) => {
  return (
    <>
      <Box w={"100%"} m={"auto"} mt={10} mb={5}>
        <Box
          borderRadius={10}
          w={"100%"}
          border={"1px solid black"}
          boxShadow={
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
          }
        >
          <Flex
            w={"100%"}
            border={"0px solid green"}
            columnGap={4}
            alignItems={"center"}
            p={2}
          >
            <Flex
              w={"50%"}
              border={"0px solid red"}
              alignItems={"center"}
              columnGap={2}
            >
              <Image src={logo} w={"6%"} />
              <Text fontWeight={700} fontSize={19}>
                {companyData.name}
              </Text>
            </Flex>
            <Divider
              orientation="vertical"
              border={"1px solid #000000"}
              h={"30px"}
            />
            <Flex
              w={"50%"}
              border={"0px solid red"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Flex
                fontSize={19}
                alignItems={"center"}
                columnGap={4}
                border={"0px solid red"}
              >
                <FiPhone />
                <Text>{companyData.contact_number}</Text>
              </Flex>
              <Flex
                border={"0px solid red"}
                columnGap={4}
                justifyContent={"space-between"}
              >
                {/* <CiEdit cursor={"pointer"} fontSize={30} color="#397200" />
                 */}
                <EditCompany
                  CName={companyData.name}
                  CWebsite={companyData.website}
                  CAddress={companyData.address}
                  CNumber={companyData.contact_number}
                  TID={companyData.tax_id}
                  DFirst={companyData.dm_first_name}
                  DLast={companyData.dm_last_name}
                  DMob={companyData.dm_mobile_number}
                  DEmail={companyData.dm_email}
                  CAgentNumber={companyData.sales_agent_number}
                  CAgentDetails={companyData.sales_agent_details}
                  N={companyData.notes}
                  CUlist={companyData.user_list}
                  CDate={companyData.date}
                  CVlist={companyData.vendor_list}
                  CPType={companyData.Payment_Type}
                />
                <MdDelete cursor={"pointer"} fontSize={30} color="#FF0000" />
              </Flex>
            </Flex>
          </Flex>
          <Flex borderTop={"1px solid black"}>
            <Flex
              flexDir={"column"}
              borderRight={"1px solid black"}
              w={"15%"}
              alignItems={"center"}
            >
              <Text
                pt={2}
                fontWeight={500}
                borderBottom={"0px solid black"}
                h={"30%"}
              >
                Tax ID
              </Text>
              <Divider border={"1px solid black"} />
              <Text
                pt={2}
                fontWeight={500}
                borderBottom={"0px solid black"}
                h={"30%"}
              >
                DM Name
              </Text>
              <Divider border={"1px solid black"} />

              <Flex
                pt={2}
                columnGap={2}
                justifyContent={"center"}
                alignItems={"center"}
                border={"0px solid red"}
                h={"30%"}
              >
                <FiPhone fontSize={20} />
                <Divider
                  orientation="vertical"
                  border={"1px solid #000000"}
                  h={"30px"}
                />
                <AiOutlineMail fontSize={20} />
              </Flex>
            </Flex>
            <Flex flexDir={"column"} borderRight={"1px solid black"}>
              <Text p={2} borderBottom={"0px solid black"} h={"30%"}>
                {companyData.tax_id}
              </Text>
              <Divider border={"1px solid black"} />

              <Text p={2} borderBottom={"0px solid black"} h={"30%"}>
                {`${companyData.dm_first_name} ${companyData.dm_last_name}`}{" "}
              </Text>
              <Divider border={"1px solid black"} />

              <Flex p={2} flexDirection={"column"} h={"30%"}>
                {companyData.dm_mobile_number}
                <Text borderBottom={"0px solid black"}></Text>
                {/* <Divider border={"1px solid black"} /> */}

                <Text>{companyData.dm_email}</Text>
              </Flex>
            </Flex>

            <Text borderRight={"1px solid black"} p={3}>
              {companyData.address}
            </Text>

            <Text p={3}>{companyData.notes}</Text>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Organisation;
