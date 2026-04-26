import { X } from "lucide-react";
import { useEffect, useState } from "react";

const BASE_URL = "https://propms-api.fly.dev/api/v1";

function SettingsDrawer({ open, onClose, role }: any) {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState<any>(null);
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(stored);

    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  if (!open) return null;

  
  
  const handleImage = (e: any) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  
  const uploadProfile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("ProfileImage", file);

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/Users/upload-profile-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("Profile updated");

        const updatedUser = { ...user, profileImage: data.data };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDarkMode(!darkMode);
  };


  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="settings-overlay">

      <div className="settings-drawer">

    
        <div className="settings-header">
          <h2>Settings</h2>
          <X onClick={onClose} />
        </div>

        
        <div className="settings-section">

          <h4>Profile</h4>

          <div className="profile-box">
            <img
              src={
                preview ||
                user?.profileImage ||
                "/images/default-avatar.png"
              }
              className="profile-img"
            />

            <input type="file" onChange={handleImage} />

            <button onClick={uploadProfile} disabled={loading}>
              {loading ? "Uploading..." : "Upload Photo"}
            </button>
          </div>

          <p><b>Name:</b> {user?.fullName}</p>
          <p><b>Email:</b> {user?.email}</p>

        </div>
        <div className="settings-section">
          <h4>Appearance</h4>

          <button onClick={toggleTheme}>
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>

        
        <div className="settings-section">
          <h4>Account</h4>

          <button>Change Password</button>
          <button className="danger" onClick={logout}>Logout</button>
        </div>

    
        {role === "tenant" && (
          <div className="settings-section">
            <h4>Tenant Settings</h4>
            <button>Payment Notifications</button>
            <button>Lease Alerts</button>
          </div>
        )}

        {role === "landlord" && (
          <div className="settings-section">
            <h4>Landlord Settings</h4>
            <button>Bank Details</button>
            <button>Rent Reminders</button>
          </div>
        )}

        {role === "admin" && (
          <div className="settings-section">
            <h4>Admin Controls</h4>
            <button>User Management</button>
            <button>System Logs</button>
          </div>
        )}

      </div>

    </div>
  );
}

export default SettingsDrawer;