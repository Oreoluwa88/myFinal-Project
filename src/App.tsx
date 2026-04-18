import { lazy, Suspense } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./authentication/AuthContext";
import ProtectedRoute from "./authentication/ProtectedRoute";

const Landing = lazy(() => import("./Public pages/Landing"));
const About = lazy(() => import("./Public pages/About"));
const Contact = lazy(() => import("./Public pages/Contact"));
const Properties = lazy(() => import("./Public pages/Properties"));

const Login = lazy(() => import("./Auth Pages/Login"));
const Register = lazy(() => import("./Auth Pages/Register"));

const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const DashboardHome = lazy(() => import("./Dashboard/DashboardHome"));

const AddProperties = lazy(() => import("./Dashboard/Landlord/AddProperties"));
const MyProperties = lazy(() => import("./Dashboard/Landlord/MyProperties"));
const LandlordDashboard = lazy(() => import("./Dashboard/Landlord/LandlordDashboard"));

const TenantDashboard = lazy(() => import("./Dashboard/Tenant/TenantDashboard"));

const AdminDashboard = lazy(() => import("./Dashboard/admin/AdminDashboard"));
const Approvals = lazy(() => import("./Dashboard/admin/Approvals"));
import { PropertyProvider } from "./pages/PropertyContext";
import Categories from "./components/Categories";




function App() {
  return (
    <PropertyProvider>
    <AuthProvider>
      <BrowserRouter>

      <Suspense fallback={<div className="loader"> <div className="spinner"></div> </div> }>

        <Routes>

          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/categories" element={<Categories/>}/>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />

            <Route path="add-property" element={<AddProperties />} />
            <Route path="my-properties" element={<MyProperties />} />
            <Route path="landlord" element={<LandlordDashboard />} />

            <Route path="admin" element={<AdminDashboard />} />
            <Route path="approvals" element={<Approvals />} />

            <Route path="tenant" element={<TenantDashboard />} />
            
          </Route>

        </Routes>

        </Suspense>

      </BrowserRouter>
    </AuthProvider>
    </PropertyProvider>
  );
}

export default App;