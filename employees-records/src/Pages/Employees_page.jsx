import {Select, TableCaption,TableContainer,Tr,Th,Thead,Tbody,Table,Td,Image,Skeleton,Stack,Box, Button, Input,Text,Accordion,AccordionButton,AccordionIcon,Checkbox,AccordionItem,AccordionPanel} from '@chakra-ui/react';
import { useState,useEffect } from 'react';
import {Link,useLocation, useSearchParams} from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { getData, SearchData } from '../Redux/action';
import Pagination from './Pagination';



const Employees_page= () => {
   const employees=useSelector((store)=>store.employees)
   const loading=useSelector((store)=>store.isLoading)
   const {activePage,perPage}=useSelector((store)=>store)
  
   const location=useLocation();
   const [page,setPage]=useState(1)

   const [searchParams,setSearchParams]=useSearchParams();
  const initialDesignation=searchParams.getAll("designation");
  const [designation,setDesignation]=useState(initialDesignation||[])
   const [searchValue,setSearchValue]=useState("")
   const dispatch=useDispatch();
   const handleFilterCheckbox=(e)=>{
    const newDesignations=[...designation]
    if(newDesignations.includes(e.target.value)){
      newDesignations.splice(newDesignations.indexOf(e.target.value),1)
    }else{
      newDesignations.push(e.target.value)
    }
    setDesignation(newDesignations)
   }
   useEffect(()=>{
    let params={}
    params.designation=designation;
    setSearchParams(params)
   },[designation,setSearchParams])
  
  useEffect(()=>{
    if(location||employees.length===0){
      const getDesignationParams={
        params:{
          designation:searchParams.getAll("designation"),
          _page:page,
          _limit:5
         
        
        }
        
      }
      
      dispatch(getData(getDesignationParams))
    }
  },[location.search,setSearchParams,page])
 //page

  
    const handleSearch=()=>{
      dispatch(SearchData(searchValue));
      setSearchValue("");
    }
//    if(loading){
//     return <>
//     <Stack w="50%" m="auto" mt={["40%","24%","","12%"]}>
//   <Skeleton height='20px' />
//   <Skeleton height='20px' />
//   <Skeleton height='20px' />
//   <Skeleton height='20px' />
//   <Skeleton height='20px' />
//   <Skeleton height='20px' />
//   <Skeleton height='20px' />
//   <Skeleton height='20px' />
//   <Skeleton height='20px' />
//   <Skeleton height='20px' />
//   <Skeleton height='20px' />
//   <Skeleton height='20px' />
//   <Skeleton height='20px' />
//   <Skeleton height='20px' />
//   <Skeleton height='20px' />
  
// </Stack>
//     </>
//    }
 
   return (
    <>
  <Box border="px solid red" display="flex" justifyContent="space-between" mt={["18%","12%","10%","6%"]}>
  
  <Box border="px solid red" display="flex" w={["","","","20%"]} ml="2%" mt={["3%","1%","1%","none"]}  >
      <Button isDisabled={page==1} onClick={()=>setPage(page-1)}>Previous</Button>
        <Button ml="5%" color="black">{page}</Button>
        <Button ml="5%" isDisabled={page==10}  onClick={()=>setPage(page+1)}>Next</Button>
    </Box>
 <Box display='flex' mt="13px">
 
  <Input value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder="Search..."/>
  <Button ml="4px" onClick={()=>handleSearch()}>{employees.length>2?"Search":"Reset"}</Button>
 
 </Box>
 {/* <Pagination/> */}
 <Accordion pr="15px" h="10px" mt="5px" allowToggle>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
         <label style={{color:"black",fontWeight:"500",fontSize:"20px"}}>Category</label>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <Checkbox onChange={handleFilterCheckbox} checked={designation.includes("MANAGER")} value="MANAGER"  colorScheme='green' color="rgb(153, 153, 153)">
    MANAGER
  </Checkbox><br/>
  <Checkbox onChange={handleFilterCheckbox} checked={designation.includes("SDE-II")} value="SDE-II"   colorScheme='green' color="rgb(153, 153, 153)">
  SDE-II
  </Checkbox><br/>
  <Checkbox onChange={handleFilterCheckbox} value="SDE-I" checked={designation.includes("SDE-I")} colorScheme='green' color="rgb(153, 153, 153)">
  SDE-I
  </Checkbox><br/>
  <Checkbox onChange={handleFilterCheckbox}  value="TRAINEE"  checked={designation.includes("TRAINEE")}   colorScheme='green' color="rgb(153, 153, 153)">
  TRAINEE
  </Checkbox><br/>
  <Checkbox onChange={handleFilterCheckbox}  value="INTERN"  checked={designation.includes("INTERN")}   colorScheme='green' color="rgb(153, 153, 153)">
  INTERN
  </Checkbox>
    </AccordionPanel>
  </AccordionItem>
  </Accordion>
  {/* <Select onChange={handleFilterCheckbox} maxWidth="250px" padding="10px" placeholder='Select Designation' mt="0%">
  <option defaultChecked={designation.includes("MANAGER")} value='MANAGER'>MANAGER</option>
  <option defaultChecked={designation.includes("SDE-II")} value='SDE-II'>SDE-II</option>
  <option defaultChecked={designation.includes("SDE-I")} value='SDE-I'>SDE-I</option>
  <option defaultChecked={designation.includes("TRAINEE")} value='TRAINEE'>TRAINEE</option>
  <option defaultChecked={designation.includes("INTERN")} value='INTERN'>INTERN</option>

</Select>  */}


    </Box>
     <TableContainer border="px solid red" boxShadow='xl' p='6' rounded='md'  w="70%" m="auto" mt={["8%","8%","5%","0%"]}>
  <Table  variant='simple'>
    <TableCaption color="red">{employees.length>0?"Private information of employees":"Data Not Found"}</TableCaption>
    <Thead>
    <Tr bgColor="black" >
          <Th color="white" textAlign="center" >Employee Avatar</Th>
          <Th color="white" textAlign="center" >Employee Id</Th>
          <Th color="white" textAlign="center" >Employee NAME</Th>
          <Th color="white" textAlign="center" >Employee AGE</Th>
          <Th color="white" textAlign="center" >Employee DESIGNATION</Th>
        </Tr>
    </Thead>
    <Tbody>
    {loading? 
    <Stack w="100%" m="auto" mt="6%">
  <Skeleton height='20px' />
  <Skeleton height='20px' />
  <Skeleton height='20px' />
  <Skeleton height='20px' />
  <Skeleton height='20px' />
  <Skeleton height='20px' />
  <Skeleton height='20px' />
  <Skeleton height='20px' />
  <Skeleton height='20px' />
  <Skeleton height='20px' />
  <Skeleton height='20px' />
  <Skeleton height='20px' />
  <Skeleton height='20px' />
  </Stack>
    : employees.map((el)=>{
          return <>
        <Tr key={el?.id}>
          <Td  borderBottom="1px solid black" w="21%"><Link to={`/employee/${el.id}`}><Image cursor="pointer"  _hover={{border:"4px solid black"}} display="block"m="auto" borderRadius="60%" w="35%" src={el?.Imageurl}/></Link></Td>
          <Td  borderBottom="1px solid black" fontSize="20px" fontWeight="semi-bold" textAlign="center">{el?.employeeid}</Td>
          <Td cursor="pointer"  borderBottom="1px solid black" fontSize="20px" fontWeight="semi-bold" textAlign="center" ><Link  to={`/employee/${el.id}`}><Text _hover={{color:"gray"}} >{el?.firstname}</Text></Link></Td>
          <Td  borderBottom="1px solid black" fontSize="20px" fontWeight="semi-bold" textAlign="center">{el?.age}</Td>
          <Td  borderBottom="1px solid black" fontSize="20px" fontWeight="semi-bold" textAlign="center">{el?.designation}</Td>

        </Tr>
        
        </>
        })}
    </Tbody>
  </Table>
</TableContainer>

   
    </>
  )
}
export default Employees_page;