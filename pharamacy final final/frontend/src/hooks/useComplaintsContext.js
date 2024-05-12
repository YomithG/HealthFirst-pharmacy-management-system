import { useContext } from "react";
import { ComplaintsContext } from "../context/ComplaintContext"; // Update import

export const useComplaintsContext = () => {
  const context = useContext(ComplaintsContext);

  if (!context) {
    throw Error('useComplaintsContext must be used inside a ComplaintsContextProvider');
  }

  return context;
};
