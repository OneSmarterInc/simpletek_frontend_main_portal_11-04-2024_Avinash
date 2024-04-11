import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import Notification from './Notification';

const Progressbar = () => {
  return (
    <Flex className="progress" border={"0px solid red"} w={"100%"} m={"auto"} mt={10} mb={40} >
      <Box className="complete" bg="#03A200" w="16%" h="5px" pos="relative">
         <Flex direction="column" alignItems="center" ml="8px">
        {/* <Box className="not_complete" bg="#BDBDBD" w="5%" h="5px" pos="relative"> */}
          <Box
            content=""
            w="20px"
            h="20px"
            borderRadius="50%"
            pos="absolute"
            right="-7.5px"
            top="-8px"
            bg="#03A200"
            zIndex="100"
          />
        {/* </Box> */}
        <Text mt="2" textAlign="center" fontSize="sm" color="black" fontWeight={500}>
          Uploading
        </Text>
		</Flex>
      </Box>


      <Box className="not_complete" bg="#BDBDBD" w="16%" h="5px" pos="relative" ml="8px">
	  <Flex direction="column" alignItems="center" ml="8px">
        {/* <Box className="not_complete" bg="#BDBDBD" w="5%" h="5px" pos="relative"> */}
          <Box
            content=""
            w="20px"
            h="20px"
            borderRadius="50%"
            pos="absolute"
            right="-7.5px"
            top="-8px"
            bg="#BC0B00"
            zIndex="100"
          />
        {/* </Box> */}
        <Text mt="2" textAlign="center" fontSize="sm" color="black" fontWeight={500}>
          Processing
        </Text>
		</Flex>
      </Box>

      <Box className="not_complete" bg="#BDBDBD" w="16%" h="5px" pos="relative" ml="8px">
	  <Flex direction="column" alignItems="center" ml="8px">
        {/* <Box className="not_complete" bg="#BDBDBD" w="16%" h="5px" pos="relative"> */}
          <Box
            content=""
            w="20px"
            h="20px"
            borderRadius="50%"
            pos="absolute"
            right="-7.5px"
            top="-8px"
            bg="#BC0B00"
            zIndex="100"
          />
        {/* </Box> */}
        <Text mt="2" textAlign="center" fontSize="sm" color="black" fontWeight={500}>
          Mapping
        </Text>
		</Flex>
      </Box>

      <Box className="not_complete" bg="#BDBDBD" w="16%" h="5px" pos="relative" ml="8px">
	  <Flex direction="column" alignItems="center" ml="8px">
        {/* <Box className="not_complete" bg="#BDBDBD" w="16%" h="5px" pos="relative"> */}
          <Box
            content=""
            w="20px"
            h="20px"
            borderRadius="50%"
            pos="absolute"
            right="-7.5px"
            top="-8px"
            bg="#BC0B00"
            zIndex="100"
          />
        {/* </Box> */}
        <Text mt="2" textAlign="center" fontSize="sm" color="black" fontWeight={500}>
          RDD
        </Text>
		</Flex>
      </Box>

      <Box className="not_complete" bg="#BDBDBD" w="16%" h="5px" pos="relative" ml="8px">
	  <Flex direction="column" alignItems="center" ml="8px">
        {/* <Box className="not_complete" bg="#BDBDBD" w="16%" h="5px" pos="relative"> */}
          <Box
            content=""
            w="20px"
            h="20px"
            borderRadius="50%"
            pos="absolute"
            right="-7.5px"
            top="-8px"
            bg="#BC0B00"
            zIndex="100"
          />
        {/* </Box> */}
        <Text mt="2" textAlign="center" fontSize="sm" color="black" fontWeight={500}>
			Authorise
        </Text>
		</Flex>
      </Box>

      <Box className="not_complete" bg="#BDBDBD" w="16%" h="5px" pos="relative" ml="8px">
	  <Flex direction="column" alignItems="center" ml="8px">
        {/* <Box className="not_complete" bg="#BDBDBD" w="16%" h="5px" pos="relative"> */}
          <Box
            content=""
            w="20px"
            h="20px"
            borderRadius="50%"
            pos="absolute"
            right="-7.5px"
            top="-8px"
            bg="#BC0B00"
            zIndex="100"
          />
        {/* </Box> */}
        <Text mt="2" textAlign="center" fontSize="sm" color="black" fontWeight={500}>
          Complete
        </Text>
		</Flex>
      </Box>
    </Flex>
  );
};

export default Progressbar;
