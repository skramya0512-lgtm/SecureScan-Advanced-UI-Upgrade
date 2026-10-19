import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await api.post("/auth/login", { email: formData.email.trim().toLowerCase(), password: formData.password });
      if (!response.data?.token) throw new Error("The server did not return an authentication token.");
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful.");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      const message = error.response?.data?.message || error.userMessage || error.message || "Login failed. Please check your credentials.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container"><div className="auth-card">
      <div className="auth-header"><div className="auth-badge">Secure Authentication</div><h2 className="auth-title">Welcome Back</h2><p className="auth-subtitle">Access your SecureScan security dashboard.</p></div>
      {errorMessage && <p role="alert" style={{ color: "#ff8e8e", marginBottom: "1rem" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="auth-group"><label htmlFor="login-email">Email</label><input id="login-email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="auth-input" autoComplete="email" required /></div>
        <div className="auth-group"><label htmlFor="login-password">Password</label><input id="login-password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" className="auth-input" autoComplete="current-password" required /></div>
        <button type="submit" className="auth-button" disabled={loading}>{loading ? "Signing in…" : "Login"}</button>
      </form>
      <p className="auth-subtitle" style={{ marginTop: "1rem", textAlign: "center" }}>New to SecureScan? <Link to="/register">Create an account</Link></p>
    </div></div>
  );
}

export default Login;
