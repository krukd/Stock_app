import { useState, useEffect, useContext } from "react";
import finnHub from "../apis/finnHub";
import { ListContext } from "../context/StockCompaniesList";

export const SearchComponent = () => {
  const [search, setSearch] = useState("");
  const [results, setResult] = useState([]);
  const { addStock } = useContext(ListContext);

  const renderDropDown = () => {
    const dropDownClass = search ? "show" : null;

    return (
      <ul
        style={{
          height: "300px",
          cursor: "pointer",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
        className={`dropdown-menu ${dropDownClass}`}
      >
        {results.map((result) => {
          return (
            <li
              onClick={() => {
                addStock(result.symbol); // Сначала вызывается addStock
                setSearch(""); // Затем вызывается setSearch
              }}
              key={result.symbol}
              className="dropdown-item"
            >
              {result.description} ({result.symbol})
            </li>
          );
        })}
      </ul>
    );

    return;
  };

  useEffect(() => {
    let isMount = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });

        if (isMount) {
          setResult(response.data.result);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (search.length > 0) {
      fetchData();
    } else {
      setResult([]);
    }

    return () => (isMount = false);
  }, [search]);

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={{ backgroundColor: "rgba(145, 158, 171, 0.04)" }}
          id="search"
          type="text"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor="search">Search</label>
        {renderDropDown()}
      </div>
    </div>
  );
};
