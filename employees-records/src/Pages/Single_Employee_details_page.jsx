import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteData, getData } from '../Redux/action';
import { useColorMode ,Box,Image,Text,SkeletonCircle,SkeletonText, Flex, Heading, Avatar, Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import {ArrowBackIcon} from '@chakra-ui/icons';

const Single_Employee_details_page = () => {
  const { colorMode } = useColorMode();

  const {id}=useParams();
  const toast=useToast();

  const employees=useSelector((store)=>store.employees);
  const loading=useSelector((store)=>store.isLoading)
  const [currentEmployee,setCurrentEmployee]=useState({});
  const dispatch=useDispatch();
  const navigate=useNavigate();

  
  useEffect(()=>{
   if(employees.length===0){
    dispatch(getData())
   }
  },[employees.length,dispatch])
  useEffect(()=>{
    if(id){
      const employee=employees.find((item)=>item.id===Number(id))
      employee&&setCurrentEmployee(employee)
    }
  },[id])
  const handledelete = () => {
    dispatch(deleteData(id))
    toast({
      title: 'Success',
      description: "Employee deleted successfully.",
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
    navigate("/")
}
  if(loading){
    return <>
        <Box padding='6' boxShadow='lg' bg='white'>
      <SkeletonCircle size='10' />
      <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
    </Box>
    <Box padding='6' boxShadow='lg' bg='white'>
      <SkeletonCircle size='10' />
      <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
    </Box>
    </>
  }
  return (
<>

<Heading  mt={["20%","13%","","8%"]} ml={["20%","13%","26%"]}  >Employee Details</Heading>
<Box display={["block","","flex"]} boxShadow='xl' p='6' rounded='md' w={["70%","60%","","60%"]} margin="auto"  border="px solid red" mt={["8%","4%","","1%"]}>
 
   <Box w={["","","","60%"]} bgColor="hsl(0,0%,92%)" borderRadius="10px">
    <Image borderRadius="100%" w={["","","40%"]} display="block" margin="auto" src={currentEmployee.Imageurl}/>
  
     <Box pt="20px" align="center" mt="3%" >
    <Button onClick={()=>navigate(`/edit_employee/${id}`)} color="white" _hover={{ bg: '#03a9f4' }} bgColor="#03a9f4">Edit Details</Button>
    <Button onClick={handledelete} color="white" _hover={{ bg: 'red' }}  bgColor="red" mt={["8px","",""]} ml="10px">Delete Employee</Button>
    </Box>
   </Box>
   <Box  p="1%" fontSize={["18px","20px","25px"]} fontFamily="c" fontWeight="bold" lineHeight="10" >
   <Text textAlign="center"  >Full-Name : <span>{currentEmployee.firstname}</span></Text>
   <Text  textAlign="center" >Last-Name : <span>{currentEmployee.lastname}</span></Text>
    <Text  textAlign="center" >{`Employee-Id : ${currentEmployee.employeeid}`}</Text>
    <Text  textAlign="center" >{`Designation : ${currentEmployee.designation}`}</Text>
    <Text  textAlign="center" >{`Age : ${currentEmployee.age}`}</Text>
    
    </Box>
    
</Box>







</>
  )
}

export default Single_Employee_details_page