function LogoutButton({ onLogout }) {
  return (
    <div className="logout-container">
      <button
        className="logout-btn"
        onClick={onLogout}
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default LogoutButton;