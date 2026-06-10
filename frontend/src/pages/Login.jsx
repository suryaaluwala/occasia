import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const validateForm = () => {
    if (!email) {
      setError("Email is required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!password) {
      setError("Password is required.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please check your credentials or try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "85vh" }}>
      <div className="card shadow border-0 p-5" style={{ maxWidth: "450px", width: "100%", borderRadius: "16px", background: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(10px)" }}>
        <div className="text-center mb-4">
          <h1 className="fw-bold mb-1" style={{ color: "var(--accent)", fontSize: "2.5rem", borderInline: "none" }}>DineVerse</h1>
          <p className="text-muted" style={{ fontSize: "0.95rem" }}>Dining, Celebrations & Surprise Events</p>
        </div>

        {error && (
          <div className="alert alert-danger d-flex align-items-center py-2 px-3 mb-3 border-0" role="alert" style={{ borderRadius: "8px", fontSize: "0.9rem" }}>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label text-start d-block fw-semibold text-secondary" style={{ fontSize: "0.85rem" }}>Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              style={{ borderRadius: "8px", padding: "10px 12px" }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-start d-block fw-semibold text-secondary" style={{ fontSize: "0.85rem" }}>Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                style={{ borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px", padding: "10px 12px" }}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ borderTopRightRadius: "8px", borderBottomRightRadius: "8px" }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100 mb-3 fw-bold py-3 shadow-sm"
            disabled={loading}
            style={{ borderRadius: "8px", background: "var(--accent)", border: "none", color: "#ffffff", fontSize: "1.1rem" }}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : "Log In"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>
            New to DineVerse?{" "}
            <Link to="/register" className="fw-semibold text-decoration-none" style={{ color: "var(--accent)" }}>
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;