import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updatePage } from "../Redux/action";
import { Box, Button } from "@chakra-ui/react";
import "./Pagination.css";
const Pagination = () => {
 const [searchParams, setSearchParams] = useSearchParams();
 const {activePage,perPage}=useSelector(store=>store);
const dispatch=useDispatch();

const handlePage=(newPage)=>{
     dispatch(updatePage(newPage))
 }

 useEffect(()=>{
  let params={};
  if(activePage!=1){

    params.page=activePage;
  }
  setSearchParams(params)
 },[activePage])

  return (
    <Box className="paginationWrapper" data-testid='paginationWrapper'>

       {activePage>1&&<Button
          onClick={()=>handlePage(activePage-1)}
          className="prevBtn"
          data-testid='prevBtn'
        >
          Prev
        </Button>}
      
      {/* render the buttons here, directly. Ensure, each button has the "data-testid='btn'" prop. Add the className, activeBtn, if the current button is the activePage*/}
    {
      Array(10).fill(0).map((item,index)=>
        <Button data-testid='btn' 
        key={index+1} 
        className={index+1==activePage?"activeBtn":""}
        onClick={()=>handlePage(index+1)}
        >{index+1}</Button>
      )
    }
        {activePage<10&&<Button
          onClick={()=>handlePage(activePage+1)}
          className="nextBtn"
          data-testid='nextBtn'
        >
          Next
        </Button>}
      
    </Box>
  );
};

export default Pagination;
