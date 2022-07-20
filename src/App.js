import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import ProductDetail from './components/ProductDetail/ProductDetail';
import NotFound from './components/NotFound/NotFound';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import RequireAuth from './components/RequireAuth/RequireAuth';
import SignUp from './components/SignUp/SignUp';

function App() {
  return (
    <div>
      <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element ={<Shop/>} />
        <Route path="/shop" element ={<Shop/>} />
        <Route path="/review" element ={<Review/>} />
        <Route path="/product/:productKey" element ={<ProductDetail/>} />
        <Route path='/inventory' element={
          <RequireAuth>
            <Inventory></Inventory>
          </RequireAuth>
        }></Route>
        <Route path="/shipment" element={
          <RequireAuth>
            <Shipment></Shipment>
          </RequireAuth>
        }></Route>
        <Route exact path="*" element ={<NotFound/>} />
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;