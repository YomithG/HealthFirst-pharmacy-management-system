import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import HomeFeedback from './Feedback/HomeFeedback';
import AddCustomer from '../Components/Employee/AddCustomer';
import AllCustomer from '../Components/Employee/AllCustomer';

import AllInventoryMedicines from '../Components/Inventory/AllInventoryMedicines';
import AllNewMedicines from '../Components/Inventory/AllNewMedicines';
import HomeComplaints from './Inquiry/HomeComplaints';
import CheckComplaints from './Inquiry/checkComplaints';
import ViewSuppliers from '../Components/SupplierManagement/ViewSuppliers';
import Dashboard from './SalaryManagement/Dashboard';
import Home from './SalaryManagement/Home';
import Attendance from './SalaryManagement/Attendance';
import Leave from './SalaryManagement/Leave';
import SalaryReport from './SalaryManagement/SalaryReport';
import BonusReport from './SalaryManagement/BonusReport';
import AttendanceEmp from './SalaryManagement/AttendanceEmp';
import LeavesEmp from './SalaryManagement/LeavesEmp';
import AddDelivery from '../Components/Delivery/AddDelivery';
import GetDelivery from '../Components/Delivery/GetDelivery';

import CheckFeedback from './Feedback/FeedbackCheck';
import AdminPanelEdit from './Product/AdminPanelEdit';
import BonusPage from './Attendance/Bonus';
import AllEmployee from '../Components/Authentication/AllEmployee';
import DeliveryPage from './Product/DeliveryPage';


const Admin = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [activeTab, setActiveTab] = useState('tab1'); // State to manage active tab

    const tabDetails = [

        { id: 'tab1', name: 'Employee', url: '/employee' }, 
        { id: 'tab21', name: 'Delivery', url: '/get' }, 
        { id: 'tab22', name: 'Order/Delivery', url: '/order-delivery' }, 
        
        { id: 'tab9', name: 'Check Complaints', url: '/check-complaints' },
        { id: 'tab23', name: 'Feedback', url: '/check-feedback' },
        { id: 'tab12', name: 'Salary Management', url: '/salary-dashboard' },
        { id: 'tab25', name: 'Mark Attendance', url: '/mark-attendance' },  
        { id: 'tab14', name: 'View Attendance', url: '/attendance' },
        { id: 'tab26', name: 'Add Leave', url: '/add-leave' }, 
        { id: 'tab15', name: 'View Leaves', url: '/leave' },
        { id: 'tab16', name: 'Salary Report', url: '/salaryReport' },
        { id: 'tab17', name: 'Bonus Report', url: '/bonusReport' },
        { id: 'tab6', name: 'Inventory', url: '/add/inventoryList' },
        { id: 'tab3', name: 'Customers', url: '/view-customers' },
        { id: 'tab7', name: 'Medicine List', url: '/add/medicineList' },
        
        
       
        { id: 'tab10', name: 'Suppliers', url: '/all-forms' },
     

        { id: 'tab24', name: 'Product', url: '/editproduct' },  
    ];


    const handleTabClick = (tab) => {
        setActiveTab(tab.id);
    };

    return (
        <div className='h-100 d-flex w-100 align-items-start'>
        <div className='col-2 bg-dark w-100'>
            <div className="nav flex-column nav-pills " id="v-pills-tab" role="tablist" aria-orientation="vertical">
                {tabDetails.map(tab => (
                    
                    (
                        <button
                            key={tab.id}
                            className={`nav-link text-light ${activeTab === tab.id ? 'bg-success active' : ''}`}
                            onClick={() => handleTabClick(tab)}
                            style={{ marginTop: '10px' }}
                        >
                            {tab.name}
                        </button>
                    )
                    
                ))}
            </div>
        </div>
        <div className='col-8 h-100 w-100'>
            <div className="tab-content" id="v-pills-tabContent">
                {/* Render components based on activeTab */}
                {activeTab === 'tab1' && <AllEmployee />}
                {activeTab === 'tab21' && <GetDelivery />}
                {activeTab === 'tab9' && <CheckComplaints />}
                {activeTab === 'tab23' && <CheckFeedback />}
                {activeTab === 'tab12' && <Dashboard />}
                {activeTab === 'tab14' && <Attendance />}
                {activeTab === 'tab15' && <Leave />}
                {activeTab === 'tab16' && <SalaryReport />}
                {activeTab === 'tab17' && <BonusPage />}
          
                {activeTab === 'tab6' && <AllInventoryMedicines />}

                {activeTab === 'tab3' && <AllCustomer />}
                {activeTab === 'tab7' && <AllNewMedicines />}
                {activeTab === 'tab10' && <ViewSuppliers />}
                {activeTab === 'tab25' && <AttendanceEmp />}
                {activeTab === 'tab26' && <LeavesEmp />}
                {activeTab === 'tab19' && < LeavesEmp/>}

                {activeTab === 'tab24' && <AdminPanelEdit />}
                {activeTab === 'tab22' && <DeliveryPage />}
                
            </div>
        </div>
    </div>

    );
}

export default Admin;
