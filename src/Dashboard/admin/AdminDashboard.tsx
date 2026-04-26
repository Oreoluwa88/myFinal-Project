import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbarone from "../../components/Navbarone";
import Navbartwo from "../../components/Navbartwo";
import Footer from "../../components/Footer";
import { ChevronRight, Bell, Settings, Search, LogOut } from "lucide-react";
import "../Tenant/TenantDashboard.css";
import "../../pages/Notifications.css";



const BASE_URL = "https://propms-api.fly.dev/api/v1";

function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [approvals, setApprovals] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    if (!token) return;

    const fetchNotifications = async () => {
      try {
        const res = await fetch(`${BASE_URL}/Notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) return;

        const data = await res.json();
        setNotifications(data?.data || []);
      } catch (err) {
        console.error("Notifications error:", err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);

    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const fetchApprovals = async () => {
      try {
        const res = await fetch(`${BASE_URL}/Properties/pending`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) return;

        const data = await res.json();

        const list = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data)
          ? data
          : [];

        setApprovals(list.slice(0, 4));
      } catch (err) {
        console.error("Approvals error:", err);
      }
    };

    fetchApprovals();
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const fetchPayments = async () => {
      try {
        const res = await fetch(`${BASE_URL}/Payments`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) return;

        const data = await res.json();

        const list = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data)
          ? data
          : [];

        setPayments(list.slice(0, 4));
      } catch (err) {
        console.error("Payments error:", err);
      }
    };

    fetchPayments();
  }, [token]);

  useEffect(() => {
    if (!token) return;

    fetch(`${BASE_URL}/Dashboard/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setStats(d?.data));
  }, [token]);

  useEffect(() => {
    if (!token) return;

    fetch(`${BASE_URL}/Admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setUsers(d?.data || []));
  }, [token]);

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

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Navbarone />

      <div className="about-hero admin-hero">
        <div className="overlay">
          <Navbartwo />
          <div className="hero-text">
            <p>
              Home <ChevronRight size={12} />Dashboard
              <ChevronRight size={12} />
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

          <button
            onClick={() =>
              document.getElementById("users")?.scrollIntoView({ behavior: "smooth" })
            }
          >
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
              <div
                className="icon-circle"
                onClick={() => navigate("/notifications")}
              >
                <Bell size={16} />
                {unreadCount > 0 && (
                  <span className="notif-badge">{unreadCount}</span>
                )}
              </div>

              <div className="icon-circle">
                <Settings size={18} />
              </div>
            </div>
          </div>

          <section className="overview">
            <h1>Overview</h1>

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

              {approvals.length === 0 ? (
                <p>No pending approvals</p>
              ) : (
                <div className="approval-grid" style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"12px"}}>
                  {approvals.map((p) => (
                    <div key={p.id} className="approval-card">

                      <div className="approval-img">
                        <img
                          src={p.primaryImageUrl || "/placeholder.jpg"}
                          alt={p.title}
                        />
                      </div>

                      <div className="approval-body">
                        <h3>{p.title}</h3>
                        <p className="location">{p.location}</p>

                        <span className="badge">
                          {p.status || "Pending"}
                        </span>
                      </div>

                    </div>
                  ))}
                </div>
              )}

              <button onClick={() => navigate("/dashboard/approvals")} style={{ marginTop: "12px" }}>
                View All Approvals
              </button>
            </div>

            <div className="panel">
              <h2>Recent Payments</h2>

              {payments.length === 0 ? (
                <p>No recent payments</p>
              ) : (
                payments.map((p) => (
                  <div key={p.id} className="payment-preview">
                    <h4>{p.tenantName || "Tenant Payment"}</h4>
                    <p>₦{p.amount}</p>
                    <span
                      className={
                        p.status === "success"
                          ? "status success"
                          : "status pending"
                      }
                    >
                      {p.status}
                    </span>
                  </div>
                ))
              )}

              <button onClick={() => navigate("/payments")}>
                View All Payments
              </button>
            </div>
          </section>

          <section id="users" className="panel full" style={{marginTop:"30px"}}>
            <h2>User Management</h2>

            <div className="user-grid">
              {users.map((u) => (
                <div key={u.id} className="user-card">
                  <div>
                    <h3>
                      {u.firstName} {u.lastName}
                    </h3>
                    <p>{u.email}</p>
                    <span>{u.role}</span>
                  </div>

                  <div className="actions">
                    <button onClick={() => suspendUser(u.id)}>Suspend</button>
                    <button onClick={() => activateUser(u.id)}>
                      Activate
                    </button>
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