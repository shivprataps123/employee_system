import * as types from './actionTypes';
import axios from 'axios';

// -----------------------GETTING DATA-------------------------------
const getDataRequest=()=>{
    return {
        type:types.GET_EMPLOYEES_DATA_REQUEST,
       
    }
};
const getDataSuccess=(payload)=>{
    return {
        type:types.GET_EMPLOYEES_DATA_SUCCESS,
        payload

    }
};
const getDataError=()=>{
    return {
        type:types.GET_EMPLOYEES_DATA_ERROR
    }
};
// -----------------ADDING DATA-------------------------------
const addDataRequest=()=>{
    return {
        type:types.ADD_EMPLOYEES_DATA_REQUEST
    }
};
const addDataSuccess=(payload)=>{
    return {
        type:types.ADD_EMPLOYEES_DATA_SUCCESS,
        payload

    }
};
const addDataError=()=>{
    return {
        type:types.ADD_EMPLOYEES_DATA_ERROR
    }
};

// --------------------UPDATING DATA--------------------

const updateDataRequest=()=>{
    return {
        type:types.UPDATE_EMPLOYEES_DATA_REQUEST
    }
}
const updateDataSuccess=(payload,id)=>{
    return {
        type:types.UPDATE_EMPLOYEES_DATA_SUCCESS,
        payload,
        id

    }
}
const updateDataError=()=>{
    return {
        type:types.UPDATE_EMPLOYEES_DATA_ERROR
    }
}

// ------------------DELETING DATA------------------------------

const deleteDataRequest=()=>{
    return {
        type:types.DELETE_EMPLOYEES_DATA_REQUEST
    }
}
const deleteDataSuccess=(id)=>{
    return {
        type:types.DELETE_EMPLOYEES_DATA_SUCCESS,
        id

    }
}
const deleteDataError=()=>{
    return {
        type:types.DELETE_EMPLOYEES_DATA_ERROR
    }
}
// -------------------search-------------------------------
const searchDataRequest=(query)=>{
    return {
        type:types.SEARCH_EMPLOYEES_DATA_REQUEST,
        query
    }
}
const searchDataSuccess=(payload)=>{
    return {
        type:types.SEARCH_EMPLOYEES_DATA_SUCCESS,
        payload

    }
}
const searchDataError=()=>{
    return {
        type:types.SEARCH_EMPLOYEES_DATA_ERROR
    }
}
// ---------api call for get data---------------

export const getData=(params)=>(dispatch)=>{
    // console.log("hi")
    dispatch(getDataRequest());
    return axios.get(`http://localhost:8080/employees`,params)
    .then((response)=>{
        dispatch(getDataSuccess(response.data))})
    .catch((error)=>{
        console.log("error in getting data",error);
        dispatch(getDataError(error))
    })
    
}


// ---------request for adding data-------------

export const addData=(payload)=>(dispatch)=>{
     dispatch(addDataRequest());
     return axios
     .post(`http://localhost:8080/employees`,payload)
     .then((response)=>{dispatch(addDataSuccess(response.data))})
     .catch((error)=>{
        console.log("error in adding data",error);
        dispatch(addDataError(error))
     })
}

// // ------------------------request for updating data----------------------------

// export const updateData=(id,payload)=>(dispatch)=>{
//      dispatch(updateDataRequest());
//      return axios
//      .patch(`http://localhost:8080/employees/${id}`,payload)
//      .then((response)=>updateDataSuccess(response.data))
//      .catch((error)=>{
//         console.log('error in updating',error);
//         updateDataError(error)
//      })
// }

// // ------------------------deleting data------------------

// export const deleteData=(id)=>(dispatch)=>{
//     dispatch(deleteDataRequest());
//     return axios
//     .delete(`http://localhost:8080/employees/${id}`)
//     .then((response)=>{dispatch(deleteDataSuccess(id))})
//     .catch((error)=>{
//         console.log('error in deleting',error);
//         dispatch(deleteDataError(error))
//     })
// }
// -----------searching---------------------------------
export const SearchData=(query)=>(dispatch)=>{
    dispatch(searchDataRequest(query));
    return axios.get(`http://localhost:8080/employees?q=${query}`,)
    .then((response)=>dispatch(searchDataSuccess(response.data)))
    .catch((error)=>{
        console.log("error in search data",error);
        dispatch(searchDataError(error))
    })
    
}