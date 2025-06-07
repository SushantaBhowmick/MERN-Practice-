import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useEffect } from "react";
import { useUser } from "./context/UserContext";
import { loadUser } from "./api/auth";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import About from "./pages/About";
import TaskLayout from "./components/Task/TaskLayout";
import CreateTask from "./pages/CreateTask";
import AdminTask from "./components/Task/AdminTask";
import Accordion from "./pages/Accordion";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentCancel from "./pages/payment/PaymentCancel";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import UserOrders from "./pages/UserOrder";
function App() {
  // const username = "Sushanta"
  const { setUser } = useUser();

  const loadCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = await loadUser();
      if (userData) {
        setUser(userData.user);
      }
    }
  };
  useEffect(() => {

    loadCurrentUser();
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Layout />}>
          <Route path="/accordion" element={<Accordion />} />
          {/* protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route index element={<Home />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="cart" element={<Cart />} />
              <Route path="orders" element={<UserOrders />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="cancel" element={<PaymentCancel />} />
              <Route path="success" element={<PaymentSuccess />} />
              <Route path="tasks" element={<TaskLayout />}>
                <Route index element={<Tasks />} />
                <Route path="admin-tasks" element={<AdminTask />} />
                <Route path="create-task" element={<CreateTask />} />
              </Route>
              <Route path="about" element={<About />} />
            </Route>

          <Route path="/products" element={<Products />}/>

          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
