import {Select, TableCaption,TableContainer,Tr,Th,Thead,Tbody,Table,Td,Image,Skeleton,Stack,Box, Button, Input,Accordion,AccordionItem,AccordionButton,AccordionPanel,Checkbox,AccordionIcon } from '@chakra-ui/react';
import { useState,useEffect } from 'react';
import {Link,useLocation, useSearchParams} from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { getData, SearchData } from '../Redux/action';


const Employees_page= () => {
   const employees=useSelector((store)=>store.employees)
   const loading=useSelector((store)=>store.isLoading)

  
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
      // console.log(getDesignationParams.params);
      dispatch(getData(getDesignationParams))
    }
  },[location.search,setSearchParams,dispatch,employees.length,page])

  
    const handleSearch=(e)=>{
      e.preventDefault();
      dispatch(SearchData(searchValue));
      // .then(()=>console.log(employees))
      // console.log("search",search);
      setSearchValue("");
    }
  
  
  
   if(loading){
    return <>
    <Stack w="50%" m="auto" mt={["25%","14%","8%"]}>
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
  <Skeleton height='20px' />
  <Skeleton height='20px' />
  
</Stack>
    </>
   }
 
   return (
    <>
  <Box border="px solid red" display="flex" justifyContent="space-between" mt={["18%","12%","10%","6%"]}>
    <form onSubmit={handleSearch} style={{
          //  margin:"auto",
          display:"flex",
           padding:"15px",
           maxWidth:"300px",
          
    }}>
    <Input value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} type="text" placeholder="Search name..."/>
    <Button ml="2%" type="submit">Search</Button>
    {/* <Button>Reset</Button> */}
    </form>
    <Box display="flex" w={["","","","20%"]} m={["auto","auto","auto","auto"]} >
      <Button isDisabled={page==1} onClick={()=>setPage(page-1)}>Previous</Button>
        <Button ml="5%" color="black">{page}</Button>
        <Button ml="5%" isDisabled={page==10}  onClick={()=>setPage(page+1)}>Next</Button>
      </Box>
      
     <Select onChange={handleFilterCheckbox} maxWidth="250px" padding="10px" placeholder='Select Designation' mt="0%">
  <option defaultChecked={designation.includes("MANAGER")} value='MANAGER'>MANAGER</option>
  <option defaultChecked={designation.includes("SDE-II")} value='SDE-II'>SDE-II</option>
  <option defaultChecked={designation.includes("SDE-I")} value='SDE-I'>SDE-I</option>
  <option defaultChecked={designation.includes("TRAINEE")} value='TRAINEE'>TRAINEE</option>
  <option defaultChecked={designation.includes("INTERN")} value='INTERN'>INTERN</option>
</Select> 
    </Box>
     <TableContainer border="px solid red"  boxShadow='xl' p='6' rounded='md'  w="70%" m="auto" mt={["8%","8%","5%","0%"]}>
  <Table  variant='simple'>
    <TableCaption color="red">Private information of employees</TableCaption>
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
    {employees.length>0 && employees.map((el)=>{
          return <>
          <Tr key={el.id}>
          <Td w="21%"><Link to={`/employee/${el.id}`}><Image cursor="pointer" display="block"m="auto" borderRadius="60%" w="35%" src={el.Imageurl}/></Link></Td>
          <Td fontSize="20px" fontWeight="semi-bold" textAlign="center">{el.employeeid}</Td>
          <Td fontSize="20px" fontWeight="semi-bold" textAlign="center">{el.firstname}</Td>
          <Td fontSize="20px" fontWeight="semi-bold" textAlign="center">{el.age}</Td>
          <Td fontSize="20px" fontWeight="semi-bold" textAlign="center">{el.designation}</Td>
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