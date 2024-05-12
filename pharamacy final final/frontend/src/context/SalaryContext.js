import { createContext, useReducer } from "react";

export const SalaryContext = createContext()

export const salaryReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SALARY':
            return {
                salary: action.payload
            }
        case 'CREATE_SALARY':
            return {
                salary: [action.payload, ...state.salary]
            }
        case 'DELETE_SALARY':
            return {
                salary: state.salary.filter((s) => s._id !== action.payload._id)
            }
        case 'UPDATE_SALARY':
            return {
                ...state,
                salary: state.salary.map((s) => s._id === action.payload._id ? action.payload : s)
            };
        default:
            return state
    }
}

export const SalaryContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(salaryReducer, {
        salary: null
    })

    return (
        <SalaryContext.Provider value={{...state, dispatch}}>
            { children }
        </SalaryContext.Provider>
    )
}