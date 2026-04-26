import { useEffect, useState } from "react";
import Navbarone from "../components/Navbarone";
import "./Notifications.css";
import { ChevronRight } from "lucide-react";
import Navbartwo from "../components/Navbartwo";
import Footer from "../components/Footer";

const BASE_URL = "https://propms-api.fly.dev/api/v1";

function Notifications() {
  const token = localStorage.getItem("token");

  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${BASE_URL}/Notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();
      setNotifications(data.data || []);
    } catch (err) {
      console.error("Notification error:", err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`${BASE_URL}/Notifications/${id}/read`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(prev =>
        prev.map(n =>
          n.id === id ? { ...n, isRead: true } : n
        )
      );
    } catch (err) {
      console.error("Read error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
    <Navbarone />
    <div className="about-hero notifications-hero">
        <div className="overlay">
          <Navbartwo />
          <div className="hero-text">
            <p>
              Dashboard <ChevronRight size={12} /> Notifications <ChevronRight size={12} />
            </p>
            <h1>My Notifications</h1>
          </div>
        </div>
      </div>
      
    <div className="notif-page">

      <h2>All Notifications</h2>

      {loading ? (
        <p>Loading...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications available</p>
      ) : (
        <div className="notif-list">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`notif-card ${n.isRead ? "" : "unread"}`}
              onClick={() => markAsRead(n.id)}
            >
              <div className="notif-content">
                <h4>{n.title}</h4>
                <p>{n.message}</p>

                <small>
                  {new Date(n.createdDate).toLocaleString()}
                </small>
              </div>

              {!n.isRead && <span className="dot"></span>}
            </div>
          ))}
        </div>
      )}

    </div>
    <Footer />
    </>
  );
}

export default Notifications;