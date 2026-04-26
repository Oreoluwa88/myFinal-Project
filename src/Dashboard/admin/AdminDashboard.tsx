import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbarone from "../../components/Navbarone";
import Navbartwo from "../../components/Navbartwo";
import Footer from "../../components/Footer";
import { ChevronRight, Bell, Settings, Search, LogOut } from "lucide-react";
import Approvals from "./Approvals";
import PaymentConfirmation from "../../pages/payments/PaymentConfirmation";

const BASE_URL = "https://propms-api.fly.dev/api/v1";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const token = localStorage.getItem("token");
  
  const [notifications, setNotifications] = useState<any[]>([]);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${BASE_URL}/Notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setNotifications(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  fetchNotifications();

  const interval = setInterval(fetchNotifications, 30000);
  return () => clearInterval(interval);
}, [token]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    fetch(`${BASE_URL}/Dashboard/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setStats(d.data));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/Admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setUsers(d.data || []));
  }, []);

  const suspendUser = async (id: string) => {
    await fetch(`${BASE_URL}/Admin/users/${id}/suspend`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const activateUser = async (id: string) => {
    await fetch(`${BASE_URL}/Admin/users/${id}/activate`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <>
      <Navbarone />

  
      <div className="about-hero admin-hero">
        <div className="overlay">
          <Navbartwo />
          <div className="hero-text">
            <p>
              Home <ChevronRight size={12} /> Admin Dashboard
            </p>
            <h1>Admin Panel</h1>
          </div>
        </div>
      </div>

 
      <div className="admin-layout">

  
        <aside className="sidebar">
          <h2 className="logo">Rentify</h2>

          <button className="active" onClick={() => navigate("/dashboard/admin")}>
            Overview
          </button>
          <button onClick={() => navigate("/dashboard/approvals")}>
            Approvals
          </button>
          <button onClick={() => navigate("/properties")}>
            Properties
          </button>
          <button onClick={() => document.getElementById("users")?.scrollIntoView({ behavior: "smooth",block: "start",})}>
            Users
          </button>
          
          <button className="tenant-logout" onClick={logout}>
            <LogOut size={16} /> Logout
          </button>
          
        </aside>

 
        <main className="admin-main">

     
          <div className="admin-topbar">
            <div className="search-box">
              <Search size={16} />
              <input placeholder="Search users, properties, payments..." />
            </div>

            <div className="top-actions">
              <div className="icon-circle" onClick={() => navigate("/notifications")}
                  style={{ cursor: "pointer" }}>
                    <Bell size={16}/>
                  {unreadCount > 0 && (
                  <span className="notif-badge">{unreadCount}</span>)}
              </div>

              <div className="icon-circle">
                <Settings size={18} />
              </div>

              <div className="profile-card">
                <img src="images/agent1.jpg" />
                <div>
                  <h4>Admin</h4>
                  <p>Super Admin</p>
                </div>
              </div>
            </div>
          </div>

    
          <section className="overview">
            <h1>Overview</h1>
            <p>Monitor your entire platform in real time</p>

            <div className="card-grid">
              <Card title="Users" value={stats?.totalUsers ?? 0} />
              <Card title="Landlords" value={stats?.totalLandlords ?? 0} />
              <Card title="Tenants" value={stats?.totalTenants ?? 0} />
              <Card title="Properties" value={stats?.totalProperties ?? 0} />
              <Card title="Pending" value={stats?.pendingApprovals ?? 0} />
              <Card title="Revenue" value={`₦${stats?.totalRevenue ?? 0}`} />
            </div>
          </section>


          <section className="grid-panels">

            <div className="panel">
              <h2>Pending Approvals</h2>
              <Approvals />
            </div>

            <div className="panel">
              <h2>Payments</h2>
              <PaymentConfirmation />
            </div>

          </section>

      
          <section id="users" className="panel full">
            <h2>User Management</h2>

            <div className="user-grid">
              {users.map((u) => (
                <div key={u.id} className="user-card">
                  <div>
                    <h3>{u.firstName} {u.lastName}</h3>
                    <p>{u.email}</p>
                    <span>{u.role}</span>
                  </div>

                  <div className="actions">
                    <button onClick={() => suspendUser(u.id)}>Suspend</button>
                    <button onClick={() => activateUser(u.id)}>Activate</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>

      <Footer />
    </>
  );
}


function Card({ title, value }: any) {
  return (
    <div className="stat-card">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default AdminDashboard;