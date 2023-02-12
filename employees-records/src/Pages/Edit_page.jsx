import { Heading,Box,Input,Button } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import {getData, updateData} from '../Redux/action'
import {useEffect, useState} from "react";
import { useToast } from '@chakra-ui/react'

const Edit_page = () => {
  const toast=useToast();
  const {id}=useParams();
  const employee=useSelector((store)=>store.employees);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [currentEmployee,setCurrentEmployee]=useState({
    firstname:"",
    lastname:"",
    employeeid:"",
    age:"",
    designation:"",
    Imageurl:""

  })
  useEffect(()=>{
    getData();

  },[dispatch,employee.length])

  const dataHandle=(e)=>{
    setCurrentEmployee(e.target.currentEmployee)
  }
  const formHandler=(e)=>{
    e.preventDefault();
    console.log(currentEmployee);
    
    // // dispatch(updateData(id,currentEmployee));
    // toast({
    //   title: 'Success',
    //   description: "Employee detail updated successfully.",
    //   status: 'success',
    //   duration: 4000,
    //   isClosable: true,
    // })
    // navigate("/")
  }
  return (
   <>
    
    <Box w={["70%","","50%"]} margin="auto" boxShadow='xl' p='6' rounded='md' mt={["18%","16%","10%"]}>
    <Heading textAlign="center">EDIT DETAILS</Heading>
    <form action="" onSubmit={formHandler}>
     <Input
      type="text"
      placeholder="First Name "
      onChange={dataHandle}
      value={currentEmployee.firstname}
     />
     <br /> <br />
     <Input
      type="text"
      placeholder="Last Name "
      onChange={dataHandle}
      value={currentEmployee.lastname}
     />
     <br /> <br />
     <Input
      type="text"
      placeholder="Employee Id"
      onChange={dataHandle}
      value={currentEmployee.employeeid}
      
     />
     <br /> <br />
     <Input
      type="number"
      placeholder="Edit Age "
      onChange={dataHandle}
      value={currentEmployee.age}
    
     />
     <br /> <br />
     <Input
      type="text"
      placeholder="Edit Designation "
      onChange={dataHandle}
      value={currentEmployee.designation}
     />
     <br /> <br />
     <Input
      type="text"
      placeholder="Image url"
      onChange={dataHandle}
      value={currentEmployee.Imageurl}
     />
     <br />
     <Button mt="4%" bgColor="#03a9f4" type="submit">
      Submit
     </Button>
    </form>
   </Box>
   </>
  )
}

export default Edit_page