import { createContext } from "react";
import { PiCropDuotone } from "react-icons/pi";
import { useState } from "react";

export const ListContext = createContext()

export const ListContextProvider = (props) => {
    const [stockCompaniesList, setListOfCompanies] = useState([
        "GOOGL",
        "MSFT",
        "AMZN",
      ]);

    return <ListContext.Provider value={{stockCompaniesList}}>
        {props.children}
    </ListContext.Provider>
}