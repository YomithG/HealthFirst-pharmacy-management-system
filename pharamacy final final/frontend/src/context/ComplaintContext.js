// import the function from react
import { createContext, useReducer } from 'react';

// Make a context and store it in a constant
export const ComplaintsContext = createContext();

export const complaintsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COMPLAINTS':
      return { 
        complaints: action.payload 
      };
    case 'CREATE_COMPLAINT':
      return { 
        complaints: [action.payload, ...state.complaints] 
      };
    case 'DELETE_COMPLAINT':
      return { 
        complaints: state.complaints.filter(c => c._id !== action.payload._id) 
      };
    default:
      return state;
  }
};

export const ComplaintsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(complaintsReducer, { 
    complaints: []
  });
    
  // Return the template 
  return (
    // Wrapping the parts that need access to the context (whole app/component tree)
    // Children property represents the whole app component in index.js
    // The value will always change when deleting and updating, so the value should be a dynamic state
    <ComplaintsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ComplaintsContext.Provider>
  );
};
