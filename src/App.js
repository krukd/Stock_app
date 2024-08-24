import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { StockOverviewPage } from './pages/StockOverviewPage';
import { StockDetailsPage } from './pages/StockDetailsPage';

function App() {
  return (
    <main className='container'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<StockOverviewPage/>} />
        <Route path='/details/:symbol' element={<StockDetailsPage/>} />
      </Routes>
    </BrowserRouter>
    </main>
  );
}

export default App;
