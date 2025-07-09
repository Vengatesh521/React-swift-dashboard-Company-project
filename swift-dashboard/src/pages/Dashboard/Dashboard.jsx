import { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState(localStorage.getItem("search") || "");
  const [page, setPage] = useState(+localStorage.getItem("page") || 1);
  const [pageSize, setPageSize] = useState(
    +localStorage.getItem("pageSize") || 10
  );
  const [sortField, setSortField] = useState(
    localStorage.getItem("sortField") || ""
  );
  const [sortOrder, setSortOrder] = useState(
    localStorage.getItem("sortOrder") || ""
  );

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => setComments(data));

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUser(data[0]));
  }, []);

  useEffect(() => {
    localStorage.setItem("search", search);
    localStorage.setItem("page", page);
    localStorage.setItem("pageSize", pageSize);
    localStorage.setItem("sortField", sortField);
    localStorage.setItem("sortOrder", sortOrder);
  }, [search, page, pageSize, sortField, sortOrder]);

  const handleSort = (field) => {
    if (sortField !== field) {
      setSortField(field);
      setSortOrder("asc");
    } else {
      if (sortOrder === "asc") setSortOrder("desc");
      else if (sortOrder === "desc") {
        setSortField("");
        setSortOrder("");
      } else {
        setSortOrder("asc");
      }
    }
  };

  const filtered = comments.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.body.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered];
  if (sortField && sortOrder) {
    sorted.sort((a, b) => {
      const aVal = a[sortField].toString().toLowerCase();
      const bVal = b[sortField].toString().toLowerCase();
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  const totalPages = Math.ceil(sorted.length / pageSize);
  const current = sorted.slice((page - 1) * pageSize, page * pageSize);

  const initials = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="profile__header">
        <div
          className="profile__logo-container"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img
            src="https://cdn.prod.website-files.com/6509887b9119507025235a5a/650ada40fd6cf3427547c9d8_Swift%20logo.svg"
            alt="Swift Logo"
            className="profile__logo"
          />
        </div>

        {user && (
          <div
            className="profile__name-logo"
            onClick={() => navigate("/profile")}
            style={{ cursor: "pointer" }}
          >
            <div className="profile__user-circle">{initials}</div>
            <span className="profile__name-text">{user.name}</span>
          </div>
        )}
      </header>

      <div className="dashboard__top">
        <div className="dashboard__sort-buttons">
          <button onClick={() => handleSort("postId")}>Sort Post ID</button>
          <button onClick={() => handleSort("name")}>Sort Name</button>
          <button onClick={() => handleSort("email")}>Sort Email</button>
        </div>

        <input
          type="text"
          placeholder="Search name, email, comment"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <table className="dashboard__table">
        <thead>
          <tr>
            <th>Post ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {current.map((c) => (
            <tr key={c.id}>
              <td>{c.postId}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="dashboard__pagination">
        <button onClick={() => setPage(1)} disabled={page === 1}>
          ⏮️
        </button>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))}>◀️</button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
          ▶️
        </button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >
          ⏭️
        </button>

        <select value={pageSize} onChange={(e) => setPageSize(+e.target.value)}>
          <option value={10}>10 / page</option>
          <option value={50}>50 / page</option>
          <option value={100}>100 / page</option>
        </select>
      </div>
    </div>
  );
}

export default Dashboard;
