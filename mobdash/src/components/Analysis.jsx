import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";

const Analysis = () => {
  return (
    <Flex flexDir={"column"} justifyContent={"space-between"} pt={20} pl={10} border={"0px solid red"} h={"100%"}>
      <Box>
      <Flex alignItems={"flex-end"} gap={2}>
        <Flex flexDirection={"column"} w={"25%"} gap={1}>
          <Text fontWeight={500}>Upload Bill</Text>
          <Input bg={"#B6B6B6"} pt={1} type="file" cursor={"pointer"} />
        </Flex>
        <Button color={"white"} bg={"#B73232"} w={"10%"} fontSize={17}>
          Start
        </Button>
      </Flex>
      <Text fontWeight={500} mt={"50px"}>
        Analysis :
      </Text>
      </Box>
      <Flex flexDirection={"column"}>
      

      <Button
        color={"white"}
        bg={"#B73232"}
        w={"10%"}
        fontSize={17}
      >
        Share
      </Button>
      </Flex>
    </Flex>
  );
};

export default Analysis;
