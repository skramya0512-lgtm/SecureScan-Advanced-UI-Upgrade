import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
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
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };
      await api.post("/auth/register", payload);
      // Use the regular login endpoint so registration does not require a second manual step.
      const loginResponse = await api.post("/auth/login", {
        email: payload.email,
        password: payload.password,
      });
      if (!loginResponse.data?.token) throw new Error("The server did not return an authentication token.");
      localStorage.setItem("token", loginResponse.data.token);
      toast.success("Account created. Welcome to SecureScan!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      const message = error.response?.data?.message || error.userMessage || error.message || "Registration failed. Please try again.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-badge">Secure Authentication</div>
          <h2 className="auth-title">Create SecureScan Account</h2>
          <p className="auth-subtitle">Protect your digital assets with intelligent security analysis.</p>
        </div>
        {errorMessage && <p role="alert" className="auth-error" style={{ color: "#ff8e8e", marginBottom: "1rem" }}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="auth-group"><label htmlFor="register-name">Name</label><input id="register-name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="auth-input" autoComplete="name" required minLength={2} maxLength={100} /></div>
          <div className="auth-group"><label htmlFor="register-email">Email</label><input id="register-email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="auth-input" autoComplete="email" required /></div>
          <div className="auth-group"><label htmlFor="register-password">Password</label><input id="register-password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="At least 6 characters" className="auth-input" autoComplete="new-password" minLength={6} required /></div>
          <button type="submit" className="auth-button register-button" disabled={loading}>{loading ? "Creating account…" : "Create Account"}</button>
        </form>
        <p className="auth-subtitle" style={{ marginTop: "1rem", textAlign: "center" }}>Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
}

export default Register;
