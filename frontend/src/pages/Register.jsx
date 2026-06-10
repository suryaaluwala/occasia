import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    if (!name.trim()) {
      setError("Name is required.");
      return false;
    }
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
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      await API.post("/auth/register", { name, email, password });
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          (!err.response
            ? "Could not connect to the backend server. Please check if the server is running or if the API base URL is correct."
            : "Registration failed. Email might already be in use.")
      );
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "85vh" }}>
      <div className="card shadow border-0 p-5" style={{ maxWidth: "480px", width: "100%", borderRadius: "16px", background: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(10px)" }}>
        <div className="text-center mb-4">
          <h1 className="fw-bold mb-1" style={{ color: "var(--accent)", fontSize: "2.3rem", borderInline: "none" }}>Create Account</h1>
          <p className="text-muted" style={{ fontSize: "0.95rem" }}>Join DineVerse and explore dining & surprise events</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 px-3 mb-3 border-0" role="alert" style={{ borderRadius: "8px", fontSize: "0.9rem" }}>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success py-2 px-3 mb-3 border-0" role="alert" style={{ borderRadius: "8px", fontSize: "0.9rem" }}>
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label text-start d-block fw-semibold text-secondary" style={{ fontSize: "0.85rem" }}>Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading || !!success}
              style={{ borderRadius: "8px", padding: "10px 12px" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-start d-block fw-semibold text-secondary" style={{ fontSize: "0.85rem" }}>Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || !!success}
              style={{ borderRadius: "8px", padding: "10px 12px" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-start d-block fw-semibold text-secondary" style={{ fontSize: "0.85rem" }}>Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || !!success}
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

          <div className="mb-4">
            <label className="form-label text-start d-block fw-semibold text-secondary" style={{ fontSize: "0.85rem" }}>Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading || !!success}
              style={{ borderRadius: "8px", padding: "10px 12px" }}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 mb-3 fw-bold py-3 shadow-sm"
            disabled={loading || !!success}
            style={{ borderRadius: "8px", background: "var(--accent)", border: "none", color: "#ffffff", fontSize: "1.1rem" }}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : "Register Account"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>
            Already have an account?{" "}
            <Link to="/" className="fw-semibold text-decoration-none" style={{ color: "var(--accent)" }}>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;