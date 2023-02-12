import { Heading,Select,Box,Input,Button } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import {getData, updateData} from '../Redux/action'
import {useEffect, useState} from "react";
import axios from "axios";
import { useToast } from '@chakra-ui/react'

const Edit_page = () => {
  const toast=useToast();
  const {id}=useParams();
  const employee=useSelector((store)=>store.employees);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [currentdata, setcurrentdata] = useState({
    firstname: "",
    lastname:"",
    employeeid:"",
    age: "",
    designation: "",
    Imageurl:""
   });
   const Submithandler = (e) => {
    e.preventDefault();
    dispatch(updateData(id, currentdata));
    toast({
      title: 'Success',
      description: "Employee detail updated successfully.",
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
    navigate("/");
   };
 
  const gettData = async () => {
    const response = await axios(`https://techflitter.onrender.com/employees/${id}`);
    const responseData = await response.data;
    setcurrentdata({
     ...currentdata,
     firstname: responseData?.firstname,
     lastname: responseData?.lastname,
     employeeid: responseData?.employeeid,
     age: responseData?.age,
     designation: responseData?.designation,
     Imageurl:responseData?.Imageurl
    });
   };
  useEffect(()=>{
    gettData();

  },[dispatch,employee.length])

  const Handleadd = (e) => {
    const { name, value } = e.target;
    setcurrentdata({ ...currentdata, [name]: value });
   };
  
 
  return (
   <>
     <Box w={["70%","","50%"]} margin="auto" boxShadow='xl' p='6' rounded='md' mt={["18%","16%","10%"]}>
    <Heading textAlign="center">EDIT DETAILS</Heading>
    <form action="" onSubmit={Submithandler}>
     <Input
      type="text"
      name="firstname"
      placeholder="First Name "
      value={currentdata?.firstname}
      onChange={Handleadd}
     />
     <br /> <br />
     <Input
      type="text"
      name="lastname"
      placeholder="Last Name"
      value={currentdata?.lastname}
      onChange={Handleadd}
     />
     <br /> <br />
     <Input
      type="text"
      placeholder="Employee Id"
      name="employeeid"
      value={currentdata?.employeeid}
      onChange={Handleadd}
      
     />
     <br /> <br />
     <Input
      type="number"
      placeholder="Edit Age "
      name="age"
      value={currentdata?.age}
      onChange={Handleadd}
    
     />
     <br /> <br />
     <Select name="designation" value={currentdata?.designation} onChange={Handleadd} placeholder='Designation'>
                <option value="MANAGER">MANAGER</option>
                <option value="SDE-II">SDE-II</option>
                <option value="SDE-I">SDE-I</option>
                <option value="TRAINEE">TRAINEE</option>
                <option value="INTERN">INTERN</option>
              </Select>
     <br /> <br />
     <Input
      type="text"
      placeholder="Image url"
     name="Imageurl"
     value={currentdata?.Imageurl}
     onChange={Handleadd}
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