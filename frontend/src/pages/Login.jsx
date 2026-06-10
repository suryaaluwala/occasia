import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const BACKGROUND_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80",
    title: "One Place for Dining, Celebrations & Corporate Events",
    desc: "Book tables, pre-order food, plan events, and keep surprises private."
  },
  {
    url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&auto=format&fit=crop&q=80",
    title: "Curated Surprises & Private Parties",
    desc: "Use Stealth Mode to hide sensitive notifications from lockscreens automatically."
  },
  {
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80",
    title: "Bespoke Banquets & Corporate Galas",
    desc: "Enjoy professional setups, seamless digital payments, and exclusive custom themes."
  }
];

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [activeLoginTab, setActiveLoginTab] = useState("email"); // "email" | "otp"
  const [userRole, setUserRole] = useState("customer"); // "customer" | "owner"

  // Privacy preference states (persisted to localStorage)
  const [stealthMode, setStealthMode] = useState(() => {
    return localStorage.getItem("stealthMode") === "true";
  });
  const [hideNotifications, setHideNotifications] = useState(() => {
    return localStorage.getItem("hideNotificationDetails") === "true";
  });
  const [trustDevice, setTrustDevice] = useState(true);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Branding Carousel Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Sync privacy settings to localStorage immediately
  useEffect(() => {
    localStorage.setItem("stealthMode", stealthMode);
  }, [stealthMode]);

  useEffect(() => {
    localStorage.setItem("hideNotificationDetails", hideNotifications);
  }, [hideNotifications]);

  useEffect(() => {
    // Redirect if already logged in
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Email Address is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    setLoading(true);
    try {
      const response = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setSuccess("Successfully authenticated! Welcoming you to DineVerse...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          (!err.response
            ? "Could not connect to the backend server. Please check if the server is running."
            : "Something went wrong. Please check your credentials and try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!mobileNumber || mobileNumber.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsOtpSent(true);
      setSuccess("Security OTP has been sent successfully to your device!");
    }, 1000);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otpCode || otpCode.length < 4) {
      setError("Please enter the verification code sent to your device.");
      return;
    }

    setLoading(true);
    // Simulate successful login with a demo user
    setTimeout(() => {
      const demoUser = {
        name: "Surya Aluwala",
        email: "suryaaluwala55@gmail.com",
        role: userRole,
        walletBalance: 1259,
        loyaltyPoints: 164,
        _id: "user_1781073746283"
      };
      localStorage.setItem("token", "simulated-demo-token-occasia");
      localStorage.setItem("user", JSON.stringify(demoUser));
      setSuccess("Verification successful! Accessing DineVerse...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    }, 1200);
  };

  const handleGuestLogin = () => {
    const guestUser = {
      name: "Gourmet Guest",
      email: "guest@occasia.com",
      role: "customer",
      walletBalance: 500,
      loyaltyPoints: 0,
      _id: "guest_" + Date.now()
    };
    localStorage.setItem("token", "guest-token");
    localStorage.setItem("user", JSON.stringify(guestUser));
    navigate("/dashboard");
  };

  return (
    <div className="premium-login-wrapper">
      {/* Top Navigation */}
      <header className="premium-nav">
        <Link to="/" className="premium-logo-text">OCCASIA</Link>
        <nav className="premium-nav-links">
          <Link to="/" className="premium-nav-link">Home</Link>
          <Link to="/" className="premium-nav-link">Restaurants</Link>
          <Link to="/" className="premium-nav-link">Events</Link>
          <Link to="/" className="premium-nav-link">Corporate</Link>
          <Link to="/" className="premium-nav-link">Contact</Link>
        </nav>
      </header>

      {/* Main Split Interface */}
      <main className="premium-split-container">
        {/* Left Branding Carousel */}
        <div className="premium-branding-column">
          {BACKGROUND_IMAGES.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt="Occasia Luxury Selections"
              className="premium-branding-bg"
              style={{
                opacity: idx === currentSlide ? 0.45 : 0,
                zIndex: idx === currentSlide ? 1 : 0
              }}
            />
          ))}
          <div className="premium-branding-overlay" />
          <div className="premium-branding-content">
            <h1 className="premium-branding-title">
              {BACKGROUND_IMAGES[currentSlide].title}
            </h1>
            <p className="premium-branding-subtitle">
              {BACKGROUND_IMAGES[currentSlide].desc}
            </p>
          </div>
        </div>

        {/* Right Authentication Card */}
        <div className="premium-login-column">
          <div className="premium-login-card">
            <div className="mb-4">
              <h2 className="premium-login-heading">Welcome Back</h2>
              <p className="premium-login-sub">Sign in to continue to DineVerse</p>
            </div>

            {error && (
              <div className="alert alert-danger py-2 px-3 mb-3 border-0" role="alert" style={{ borderRadius: "8px", fontSize: "0.85rem" }}>
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="alert alert-success py-2 px-3 mb-3 border-0" role="alert" style={{ borderRadius: "8px", fontSize: "0.85rem" }}>
                <span>{success}</span>
              </div>
            )}

            {/* Login Tab Selectors */}
            <div className="premium-tab-container">
              <button
                type="button"
                className={`premium-tab-btn ${activeLoginTab === "email" ? "active" : ""}`}
                onClick={() => { setActiveLoginTab("email"); setError(""); setSuccess(""); }}
              >
                Email Sign In
              </button>
              <button
                type="button"
                className={`premium-tab-btn ${activeLoginTab === "otp" ? "active" : ""}`}
                onClick={() => { setActiveLoginTab("otp"); setError(""); setSuccess(""); }}
              >
                OTP Verification
              </button>
            </div>

            {/* Form Fields */}
            {activeLoginTab === "email" ? (
              <form onSubmit={handleEmailLogin}>
                <div className="mb-3 text-start">
                  <label className="premium-form-label">Email Address</label>
                  <input
                    type="email"
                    className="premium-input-field"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="mb-4 text-start">
                  <label className="premium-form-label">Password</label>
                  <input
                    type="password"
                    className="premium-input-field"
                    placeholder="Enter account password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  className="premium-action-btn"
                  disabled={loading}
                >
                  {loading ? "AUTHENTICATING..." : "VERIFY & LOGIN"}
                </button>
              </form>
            ) : (
              <form onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}>
                {!isOtpSent ? (
                  <div className="mb-4 text-start">
                    <label className="premium-form-label">Mobile Number</label>
                    <input
                      type="tel"
                      className="premium-input-field"
                      placeholder="+91 XXXXX XXXXX"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                ) : (
                  <>
                    <div className="mb-3 text-start">
                      <label className="premium-form-label">Mobile Number</label>
                      <input
                        type="tel"
                        className="premium-input-field text-muted"
                        value={mobileNumber}
                        disabled
                      />
                    </div>
                    <div className="mb-4 text-start">
                      <label className="premium-form-label">Enter One-Time PIN (OTP)</label>
                      <input
                        type="text"
                        className="premium-input-field"
                        placeholder="Enter 6-digit code"
                        maxLength="6"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </>
                )}

                {/* User Type Selection for OTP Routing */}
                <div className="d-flex justify-content-between mb-3 text-start" style={{ fontSize: "0.8rem" }}>
                  <label className="fw-semibold text-secondary">LOGIN AS:</label>
                  <div className="d-flex gap-3">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="userRole"
                        value="customer"
                        checked={userRole === "customer"}
                        onChange={() => setUserRole("customer")}
                        className="me-1"
                      /> Customer
                    </label>
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="userRole"
                        value="owner"
                        checked={userRole === "owner"}
                        onChange={() => setUserRole("owner")}
                        className="me-1"
                      /> Owner
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="premium-action-btn"
                  disabled={loading}
                >
                  {loading ? "PROCESSING..." : isOtpSent ? "VERIFY & LOGIN" : "SEND OTP"}
                </button>
              </form>
            )}

            {/* Remember Me */}
            <div className="text-start">
              <label className="premium-checkbox-container">
                <input
                  type="checkbox"
                  className="premium-checkbox"
                  checked={trustDevice}
                  onChange={() => setTrustDevice(!trustDevice)}
                />
                Remember this device
              </label>
            </div>

            {/* Social Logins */}
            <div className="premium-divider">OR</div>

            <button type="button" className="premium-social-btn" onClick={handleGuestLogin}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 6a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 12a6 6 0 0 0-5.33-3.25 6 6 0 0 0 10.66 0A6 6 0 0 0 12 18z"/></svg>
              Continue with Google
            </button>

            <button type="button" className="premium-social-btn" onClick={handleGuestLogin}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.62.73-1.16 1.87-1.02 2.98 1.11.09 2.27-.58 2.97-1.43Z"/></svg>
              Continue with Apple
            </button>

            {/* Premium Privacy Preference card */}
            <div className="premium-privacy-section">
              <div className="premium-privacy-title">
                <span>🔒</span> Privacy Preferences
              </div>
              <div className="premium-privacy-item">
                <span className="premium-privacy-label">Enable Stealth Mode</span>
                <label className="premium-switch">
                  <input
                    type="checkbox"
                    checked={stealthMode}
                    onChange={() => setStealthMode(!stealthMode)}
                  />
                  <span className="premium-slider"></span>
                </label>
              </div>
              <div className="premium-privacy-item">
                <span className="premium-privacy-label">Hide Booking Details</span>
                <label className="premium-switch">
                  <input
                    type="checkbox"
                    checked={hideNotifications}
                    onChange={() => setHideNotifications(!hideNotifications)}
                  />
                  <span className="premium-slider"></span>
                </label>
              </div>
              <p className="premium-privacy-desc">
                Keeps surprise bookings, private dining sessions, and celebrations hidden from standard notification screens automatically.
              </p>
            </div>

            {/* Browse as Guest shortcut */}
            <button type="button" onClick={handleGuestLogin} className="premium-guest-link border-0 bg-transparent">
              Browse Restaurants & Menus →
            </button>

            <div className="mt-4 pt-3 border-top border-color-light" style={{ fontSize: "0.85rem" }}>
              <p className="mb-0 text-muted">
                New to DineVerse?{" "}
                <Link to="/register" className="fw-semibold text-decoration-none" style={{ color: "#6b1f1f" }}>
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Nav */}
      <footer className="premium-footer-nav">
        <Link to="/" className="premium-footer-link">Privacy Policy</Link>
        <Link to="/" className="premium-footer-link">Terms & Conditions</Link>
        <Link to="/" className="premium-footer-link">Support</Link>
      </footer>
    </div>
  );
}

export default Login;