import { createContext } from "react";
import { PiCropDuotone } from "react-icons/pi";
import { useState } from "react";

export const ListContext = createContext();

export const ListContextProvider = (props) => {
  const [stockCompaniesList, setListOfCompanies] = useState([
    "GOOGL",
    "MSFT",
    "AMZN",
  ]);

  const [stockRates, setStockRates] = useState([]);
  const addStock = (stock) => {
    if(stockCompaniesList.indexOf(stock) === -1){
        setListOfCompanies([...stockCompaniesList, stock])
    }
  }

  const deleteStock = (stock) => {
    if(stockCompaniesList.indexOf(stock) > 0){
        const updatedList = stockCompaniesList.filter((el) => {
            return el !== stock
        })
        setListOfCompanies(updatedList)
    }
  }

  return (
    <ListContext.Provider value={{ stockCompaniesList, setListOfCompanies, addStock, deleteStock, stockRates, setStockRates}}>
      {props.children}
    </ListContext.Provider>
  );
};
