import {Route,Routes} from 'react-router-dom';
import React from 'react'
import Employees_page from '../Pages/Employees_page';
import Single_Employee_details_page from '../Pages/Single_Employee_details_page';
import Edit_page from '../Pages/Edit_page';
import Add_details from '../Pages/Add_details';
const AllRoutes = () => {
  return (
   <>
<Routes>
    <Route path='/' element={<Employees_page/>}/>
    <Route path='/employee/:id' element={<Single_Employee_details_page/>}/>
    <Route path="/edit_employee/:id" element={<Edit_page/>}/>
    {/* <Route path="add_employee" element={<Add_details/>}/> */}
</Routes>
   </>
  )
}

export default AllRoutes