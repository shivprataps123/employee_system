import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getData } from '../Redux/action';
import { Box,Image,Text,SkeletonCircle,SkeletonText, Flex, Heading, Avatar } from '@chakra-ui/react';
const Single_Employee_details_page = () => {
  const {id}=useParams();
  console.log("sdfs",id);

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
<Box mt="20%">
  <Box>
    <Image src={currentEmployee.Imageurl}/>
  </Box>
  <Box>
    <Text>{`full-Name : ${currentEmployee.firstname}${currentEmployee.lastname}`}</Text>
    <Text>{`Employee-Id : ${currentEmployee.employeeid}`}</Text>
    <Text>{`Designation : ${currentEmployee.designation}`}</Text>
    <Text>{`Age : ${currentEmployee.age}`}</Text>
    
  </Box>
  
</Box>
</>
  )
}

export default Single_Employee_details_page