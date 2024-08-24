import { useState, useEffect, useContext } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import finnHub from "../apis/finnHub";
import { ListContext } from "../context/StockCompaniesList";

export const StockList = () => {
  const { stockRates, setStockRates } = useContext(ListContext);
  const {stockCompaniesList} = useContext(ListContext);
  

  const changeColor = (change) => {
    return change > 0 ? "success" : "danger";
  };

  const renderIcon = (change) => {
    return change > 0 ? <FaCaretUp /> : <FaCaretDown />;
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      let responses = [];
      try {
        responses = await Promise.all(
          stockCompaniesList.map((company) => {
            return finnHub.get("/quote", {
              params: {
                symbol: company,
              },
            });
          })
        );

        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });

        if (isMounted) {
          setStockRates(data);
        }

        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [stockCompaniesList]);
  return (
    <div>
      <table className="table hover mt-5">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Cng</th>
            <th scope="col">Cng%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stockRates.map((stock) => {
            return (
              <tr className="table-row" key={stock.symbol}>
                <th scope="row">{stock.symbol}</th>
                <td>{stock.data.c}</td>
                <td className={`text-${changeColor(stock.data.d)}`}>
                  {stock.data.d}
                  {renderIcon(stock.data.d)}
                </td>
                <td className={`text-${changeColor(stock.data.d)}`}>
                  {stock.data.dp}
                  {renderIcon(stock.data.dp)}
                </td>
                <td>{stock.data.h}</td>
                <td>{stock.data.l}</td>
                <td>{stock.data.o}</td>
                <td>{stock.data.pc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
// c
// :
// 165.62
// d
// :
// 1.82
// dp
// :
// 1.1111
// h
// :
// 166.18
// l
// :
// 163.83
// o
// :
// 164.5
// pc
// :
// 163.8
// t
// :
// 1724443201
