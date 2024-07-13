import Header from './Header';
import AddCustomer from './Components/Employee/AddCustomer';
import AllCustomer from './Components/Employee/AllCustomer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddNewMedicine from './Components/Inventory/AddNewMedicine';
import AllInventoryMedicines from './Components/Inventory/AllInventoryMedicines';
import AllNewMedicines from './Components/Inventory/AllNewMedicines';
import CheckComplaints from './pages/Inquiry/checkComplaints';
import AllForms from './Components/SupplierManagement/ViewSuppliers';


import Attendance from './pages/SalaryManagement/Attendance';

import Leave from './pages/SalaryManagement/Leave';
import SalaryReport from './pages/SalaryManagement/SalaryReport';
import BonusReport from './pages/SalaryManagement/BonusReport';
import AttendanceEmp from './pages/SalaryManagement/AttendanceEmp';
import LeavesEmp from './pages/SalaryManagement/LeavesEmp';
import Dashboard from './pages/SalaryManagement/Dashboard';

import AddDelivery from './Components/Delivery/AddDelivery';
import GetDelivery from './Components/Delivery/GetDelivery';

import DemergedList from "./Components/Inventory/DemergedList";
import ExpiredList from "./Components/Inventory/ExpiredList";
import SoldOutList from "./Components/Inventory/SoldOutList";
import Contactus from './Components/Authentication/Contactus';
import Aboutus from './Components/Authentication/Aboutus';
import HomeFeedback from './pages/Feedback/HomeFeedback';
import HomeComplaints from './pages/Inquiry/HomeComplaints';


// import AddItem from './pages/AddItem';
import DelievryDetailsForm from "./Components/Product/oDetails";
import Medicine from './pages/Product/Medicine';
import Babycare from './pages/Product/Categories/Babycare';
import Vitamins from './pages/Product/Categories/Vitamins';
import Beauty from './pages/Product/Categories/Beauty';
import Fitness from './pages/Product/Categories/Fitness';

import Cart from "./pages/Product/Cart";
import CheckoutPage from "./pages/Product/CheckoutPage";
import Navbar from './Components/Product/Navbar';
import Navbar2 from './Components/Inquiry/Navbar';
import DeliveryPage from './pages/Product/DeliveryPage';

// import UploadItems from './pages/Product/UploadItem';


import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminPanelEdit from './pages/Product/AdminPanelEdit';
import Bonus from './pages/Attendance/Bonus';
import AddSupplier from './Components/SupplierManagement/AddSupplier';
import AddInventoryMedicine from './Components/Inventory/AddInventoryMedicine';
import AddProductForm from './pages/Product/AddProduct';
import Login from './Components/Authentication/login';
import Admin from './Components/Authentication/admin';
import AdminDashboard from './pages/Admin';
import AddEmployee from './Components/Authentication/AddEmployee';
import Home from './Components/Authentication/Home';


// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <div>
          <Header />

          <Routes>

            <Route path="/" element={<Admin />} />
            <Route path="/medicine" element={<Medicine />} />
            <Route path='/babycare' element={<Babycare />} />
            <Route path='/vitamins' element={<Vitamins />} />
            <Route path='/beauty' element={<Beauty />} />
            <Route path='/fitness' element={<Fitness />} />
            <Route path="/admin" element={<Admin />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/DemergedList" element={<DemergedList />} />
            <Route path="/ExpiredList" element={<ExpiredList />} />
            <Route path="/SoldOutList" element={<SoldOutList />} />

            <Route path="/editproduct" element={<AdminPanelEdit/>} />
            <Route
              path="/employees"
              element={<Dashboard />}
            />

           
            {/* <Route path="/addDelivery" element={<DelievryDetailsForm />} /> */}

            <Route path="/delivery-page" element={<DeliveryPage />} />

            <Route path="/bonus" element={<Bonus />} />
            <Route path="/add-customer" element={<AddCustomer />} />
            <Route path="/add-delivery" element={<AddDelivery />} />
            <Route path="/add-supplier" element={<AddSupplier />} />
            <Route path="/add-inventory-medicine" element={<AddInventoryMedicine />} />
            <Route path="/add-medicine" element={<AddNewMedicine />} />
            <Route path="/add-product" element={<AddProductForm />} />

            <Route path="/Contactus" element={<Contactus />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-employee" element={<AddEmployee />} />

           <Route path="/feedbacks" element={<HomeFeedback />} />
           <Route path="/add-complaint" element={<HomeComplaints />} /> 
           <Route path="/home" element={<Home />} /> 

          {/* Salary details */}
          <Route path="/salary-dashboard" element={<Dashboard />} />

          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
