import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteData, getData } from '../Redux/action';
import { useColorMode ,Box,Image,Text,SkeletonCircle,SkeletonText, Flex, Heading, Avatar, Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
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
    </>
  }
  return (
<>
<Heading textAlign="center" mt={["20%","13%","10%","8%"]} >Employee Details</Heading>
<Box  boxShadow='xl' p='6' rounded='md' w={["70%","60%","","30%"]} margin="auto"  border="px solid red" mt={["8%","4%","2%"]}>
 
   <Image borderRadius="50%" w="50%" display="block" margin="auto" src={currentEmployee.Imageurl}/>
   <Box mt="2%" fontSize="20px" fontFamily="sans-serif" fontWeight="semibold">
   <Text textAlign="center" >Full-Name : <span>{currentEmployee.firstname}</span></Text>
   <Text textAlign="center" >Last-Name : <span>{currentEmployee.lastname}</span></Text>
    <Text textAlign="center" >{`Employee-Id : ${currentEmployee.employeeid}`}</Text>
    <Text textAlign='center' >{`Designation : ${currentEmployee.designation}`}</Text>
    <Text textAlign="center" >{`Age : ${currentEmployee.age}`}</Text>
    </Box>
    <Box align="center" mt="3%" >
    <Button onClick={()=>navigate(`/edit_employee/${id}`)} color="white" _hover={{ bg: '#03a9f4' }} bgColor="#03a9f4">Edit Details</Button>
    <Button onClick={handledelete} color="white" _hover={{ bg: 'red' }}  bgColor="red" ml="10px">Delete Employee</Button>
    </Box>
</Box>




  {/* <Box>
    <Image src={currentEmployee.Imageurl}/>
  </Box>
  <Box>
    <Text>{`full-Name : ${currentEmployee.firstname}${currentEmployee.lastname}`}</Text>
    <Text>{`Employee-Id : ${currentEmployee.employeeid}`}</Text>
    <Text>{`Designation : ${currentEmployee.designation}`}</Text>
    <Text>{`Age : ${currentEmployee.age}`}</Text>
    
  </Box>
   */}

</>
  )
}

export default Single_Employee_details_page