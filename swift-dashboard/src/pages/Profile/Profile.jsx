import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { HiArrowLeft } from "react-icons/hi2";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUser(data[0]));
  }, []);

  if (!user) return <p className="profile__loading">Loading...</p>;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  console.log(initials);

  return (
    <div className="profile__page">
      {/* Header */}
      <header className="profile__header">
        <div
          className="profile__logo-container"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img
            src="https://cdn.prod.website-files.com/6509887b9119507025235a5a/650ada40fd6cf3427547c9d8_Swift%20logo.svg"
            alt="Swift Logo"
            className="profile__logo"
          />
        </div>
        <div className="profile__name-logo">
          <div className="profile__user-circle">{initials}</div>
          <span className="profile__name-text">{user.name}</span>
        </div>
      </header>
      {/* Welcome */}
      <div className="profile__welcome">
        <button className="profile__back-btn" onClick={() => navigate("/")}>
          <HiArrowLeft size={20} />
        </button>
        <h2>Welcome, {user.name}</h2>
      </div>
      {/* Profile Card */}
      <div className="profile__container">
        <div className="profile__card">
          <div className="profile__info">
            <div className="profile__avatar">{initials}</div>
            <div>
              <div className="profile__name">{user.name}</div>
              <div className="profile__email">{user.email}</div>
            </div>
          </div>

          <div className="profile__details">
            <div className="profile__field">
              <label>User ID</label>
              <input value="12345687" readOnly />
            </div>
            <div className="profile__field">
              <label>Name</label>
              <input value={user.name} readOnly />
            </div>
            <div className="profile__field">
              <label>Email ID</label>
              <input value={user.email} readOnly />
            </div>
            <div className="profile__field">
              <label>Address</label>
              <input
                value={`${user.address.street}, ${user.address.city}`}
                readOnly
              />
            </div>
            <div className="profile__field">
              <label>Phone</label>
              <input value={user.phone} readOnly />
            </div>
          </div>

          <button className="profile__button" onClick={() => navigate("/")}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
