import React, { useContext, useState } from 'react';
import { Box, Button, Flex, Input, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import MyContext from './ContextApi/MyContext';

const RDD = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const {
    showUploading,
    setShowUploading,
    showMapping,
    setShowMapping,
    showRDD,
    setShowRDD,
  } = useContext(MyContext);


  const handleToggle = ()=>{
    setShowUploading(true);
    setShowRDD(false);
  }

  const handleGoMapping = ()=>{
    setShowMapping(true);
    setShowRDD(false);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCsvFile(file);
    }
  };

  const postFile = async () => {
    if (!csvFile) {
      alert('Please select a CSV file.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', csvFile);
      setLoading(true);
      const response = await axios.post(
        "https://api.cyberbriefs.org/mobility/uploadcsv",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if(response.data.status == "success"){
      setLoading(false);
      setShowMapping(true)
      setShowRDD(false)
        toast({
          title: "File uploaded successfully",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
      
      console.log(response);
    } catch (error) {
      setLoading(false);

      console.log(error);
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

  return (
    <Box w={"100%"} m={"auto"} mt={100}>
      <Flex w={"100%"} justifyContent={"space-evenly"} alignItems={"flex-end"} mt={10}>
        <Flex flexDirection={"column"} w={"25%"} gap={1}>
          <Text fontWeight={500}>Upload Inventory File</Text>
          <Input type='file' accept=".csv" onChange={handleFileChange} />
        </Flex>
        <Button color={"white"} bg={"#B73232"} w={"15%"} onClick={postFile} isDisabled={loading}>{loading ? "Loading..." : "Start"}</Button>
      </Flex>
      <Text color={"green"} mt={10}>Note: Uploading CSV File is optional, if you don't want to upload CSV , then you can go to inventoy to see bill details of your uploaded bills.</Text>
      <Button mt={10} color={"white"} bg={"#B73232"} w={"15%"} onClick={handleToggle}>Go Back to Bill Upload</Button>
      {/* <Button ml={10} mt={10} color={"white"} bg={"#B73232"} w={"15%"} onClick={handleGoMapping}>Go to Mapping</Button> */}
      
    </Box>
  );
};

export default RDD;
