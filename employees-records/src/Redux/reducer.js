import * as types from './actionTypes';

const initialState={
    employees:[],
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
                   employees:payload
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
                   data:[...oldState.employees,payload]
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
            let newData=oldState.employees.map((item)=>item.id===payload.id?payload:item)
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
                let filteredData=oldState.employees.filter((item)=>item.id!==payload)
                return {
                       ...oldState,
                       isLoading:false,
                       employees:filteredData
                      }
        case types.DELETE_EMPLOYEES_DATA_ERROR:
                return {
                       ...oldState,
                       isLoading:false,
                       isError:true
                       }
        // -----search function=---------
        case types.SEARCH_EMPLOYEES_DATA_REQUEST:
            return {
                   ...oldState,
                   isLoading:true
                  }
    case types.SEARCH_EMPLOYEES_DATA_SUCCESS:
            return {
                   ...oldState,
                   isLoading:false,
                   employees:payload
                  }
    case types.SEARCH_EMPLOYEES_DATA_ERROR:
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