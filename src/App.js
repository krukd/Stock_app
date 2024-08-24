import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { StockOverviewPage } from "./pages/StockOverviewPage";
import { StockDetailsPage } from "./pages/StockDetailsPage";
import { ListContextProvider } from "./context/StockCompaniesList";

function App() {
  return (
    <main className="container">
      <ListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StockOverviewPage />} />
            <Route path="/details/:symbol" element={<StockDetailsPage />} />
          </Routes>
        </BrowserRouter>
      </ListContextProvider>
    </main>
  );
}

export default App;
