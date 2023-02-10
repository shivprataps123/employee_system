import * as types from './actionTypes';

const initialState={
    employess:[],
    isLoading:false,
    isError:false
};

const reducer=(oldState=initialState,action)=>{
    const {type,payload}=action;

    switch(type){
        // getting details
        case types.GET_EMPLOYEES_DATA_REQUEST:
            return {
                    ...oldState,
                    isLoading:true
                   };
        case types.GET_EMPLOYEES_DATA_SUCCESS:
            return {
                   ...oldState,
                   isLoading:false,
                   employess:payload
                }
        case types.GET_EMPLOYEES_DATA_ERROR:
            return {
                   ...oldState,
                   isLoading:false,
                   isError:true
            }
        // adding details
        case types.ADD_EMPLOYEES_DATA_REQUEST:
            return {
                   ...oldState,
                   isLoading:true
                }
        case types.ADD_EMPLOYEES_DATA_SUCCESS:
            return {
                   ...oldState,
                   isLoading:false,
                   data:[...oldState.employess,payload]
                  }
        case types.ADD_EMPLOYEES_DATA_ERROR:
            return {
                   ...oldState,
                   isLoading:false,
                   isError:true
                  }
           // updating details

        case types.UPDATE_EMPLOYEES_DATA_REQUEST:
            return {
                   ...oldState,
                   isLoading:true
                  }
        case types.UPDATE_EMPLOYEES_DATA_SUCCESS:
            let newData=oldState.employess.map((item)=>item.id===payload.id?payload:item)
            return {
                   ...oldState,
                   isLoading:false,
                   data:newData
                  }
        case types.UPDATE_EMPLOYEES_DATA_ERROR:
            return {
                    ...oldState,
                    isLoading:false,
                    isError:true
                   }
            // deleting details

        case types.DELETE_EMPLOYEES_DATA_REQUEST:
                return {
                       ...oldState,
                       isLoading:true
                      }
        case types.DELETE_EMPLOYEES_DATA_SUCCESS:
                let filteredData=oldState.employess.filter((item)=>item.id!==payload)
                return {
                       ...oldState,
                       isLoading:false,
                       employess:filteredData
                      }
        case types.DELETE_EMPLOYEES_DATA_ERROR:
                return {
                       ...oldState,
                       isLoading:false,
                       isError:true
                       }
        default:
            return oldState
        }
}
export {reducer}