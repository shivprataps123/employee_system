import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {useDisclosure,Button,Modal,ModalBody,ModalOverlay,FormControl,Input,ModalFooter,FormLabel,ModalHeader,ModalCloseButton,ModalContent, Select} from "@chakra-ui/react";
import { addData, getData } from "../Redux/action";
import { useToast } from '@chakra-ui/react'
const Add_details = () => {
     const { isOpen, onOpen, onClose } = useDisclosure()
     const toast=useToast();
     const initialRef = React.useRef(null);
     const finalRef = React.useRef(null);
     const [firstname,setFirstName]=useState("");
     const [lastname,setLastName]=useState("");
     const [age,setAge]=useState("");
     const [designation,setDesignation]=useState("");
     const [employeeid,setId]=useState("");
     const [Imageurl,setImage]=useState("");
     const dispatch=useDispatch();
     const navigate=useNavigate();
     
     const submitHandler=(e)=>{
      e.preventDefault()
      if(firstname&&lastname&&age&&designation&&employeeid&&Imageurl){
        const payload={firstname,lastname,age,designation,employeeid,Imageurl}
        if(payload){
          dispatch(addData(payload))
          .then(()=>{
            toast({
              title: 'Success',
              description: "Employee added successfully.",
              status: 'success',
              duration: 4000,
              isClosable: true,
            })
            onClose()
          })
          }
      }else{
        toast({
          title: 'Empty field',
          description: "Kindly fill all the details.",
          status: 'warning',
          duration: 4000,
          isClosable: true,
        })
      }
     
      
     }
  return(
    <>
   <Button marginRight="10%"  onClick={onOpen}>Add Employee</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input value={firstname} onChange={(e)=>setFirstName(e.target.value)} ref={initialRef} placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input value={lastname} onChange={(e)=>setLastName(e.target.value)} placeholder='Last name' />
            </FormControl>
             <FormControl>
              <FormLabel>Age in years</FormLabel>
              <Input value={age} onChange={(e)=>setAge(e.target.value)} ref={initialRef} placeholder='Age' />
            </FormControl>
             <FormControl>
              <FormLabel>Designtion</FormLabel>
              {/* <Input ref={initialRef} placeholder='SDE-I/SDE-II' /> */}
              <Select value={designation} onChange={(e)=>setDesignation(e.target.value)} placeholder='Designation' ref={initialRef}>
                <option value="MANAGER">MANAGER</option>
                <option value="SDE-II">SDE-II</option>
                <option value="SDE-I">SDE-I</option>
                <option value="TRAINEE">TRAINEE</option>
                <option value="INTERN">INTERN</option>
              </Select>
            </FormControl>
             <FormControl>
              <FormLabel>Personal Id</FormLabel>
              <Input value={employeeid} onChange={(e)=>setId(e.target.value)} ref={initialRef} placeholder='Personal Id' />
            </FormControl>
            <FormControl>
              <FormLabel>Personal Id</FormLabel>
              <Input value={Imageurl} onChange={(e)=>setImage(e.target.value)} ref={initialRef} placeholder='Image url' type="text" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={submitHandler} colorScheme='blue' mr={3}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Add_details

