import { SalaryContext } from "../context/SalaryContext"
import { useContext } from "react"

export const useSalaryContext =() => {
    const context = useContext(SalaryContext)

    if (!context) {
        throw Error('useSalaryContext must be used inside an SalaryContextProvider')
    }

    return context
}