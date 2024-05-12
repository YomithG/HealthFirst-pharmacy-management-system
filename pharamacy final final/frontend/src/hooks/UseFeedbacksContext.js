import {FeedbacksContext} from '../context/FeedbackContext'
import { useContext } from 'react'

export const UseFeedbackContext = ()=> {
    const context = useContext(FeedbacksContext)


    if(!context) {
        throw Error('UseFeedbackContext must be used inside an FeedbackContextProvider')
      }
    
    return context
}