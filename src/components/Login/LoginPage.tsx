export default function LoginPage({ onLogin }: any) {
  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d", display: "flex", justifyContent: "center", padding: "30px 0" }}>
      <div style={{ width: "340px" }}>
        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <img src="/logo.png" style={{ width: "185px", height: "185px", margin: "0 auto", display: "block" }} alt="logo" />
          <h1 style={{ color: "white", fontSize: "42px", fontWeight: 400, margin: "15px 0 5px" }}>LaachiLive</h1>
          <p style={{ color: "#aaa", fontSize: "15px" }}>Connect · Talk · Live</p>
        </div>

        <label style={{ color: "#bbb", fontSize: "14px" }}>Name</label>
        <div style={{ background: "#2b2b2b", border: "1px solid #555", borderRadius: "28px", height: "48px", display: "flex", alignItems: "center", padding: "0 16px", margin: "8px 0 22px" }}>
          <span style={{ color: "#999", marginRight: "12px" }}>👤</span>
          <input placeholder="Enter your name" style={{ background: "transparent", border: "none", outline: "none", color: "white", width: "100%" }} />
        </div>

        <label style={{ color: "#bbb", fontSize: "14px" }}>Password</label>
        <div style={{ background: "#2b2b2b", border: "1px solid #555", borderRadius: "28px", height: "48px", display: "flex", alignItems: "center", padding: "0 16px", margin: "8px 0 32px" }}>
          <span style={{ color: "#999", marginRight: "12px" }}>🔒</span>
          <input type="password" placeholder="Enter your password" style={{ background: "transparent", border: "none", outline: "none", color: "white", width: "100%" }} />
          <span style={{ color: "#999" }}>👁️</span>
        </div>

        <button onClick={()=>onLogin?.("User")} style={{ width: "100%", height: "50px", borderRadius: "28px", background: "linear-gradient(90deg,#ff6ea8,#a855ff)", color: "white", fontSize: "19px", border: "none" }}>Login</button>
        
        <p style={{ textAlign: "center", color: "#c07cff", marginTop: "18px", fontSize: "14px" }}>Forgot Password?</p>
        <p style={{ textAlign: "center", color: "#888", marginTop: "22px", fontSize: "12px" }}>Don't have an account? <span style={{ color: "#d070ff", fontWeight: 600 }}>Sign up</span></p>
      </div>
    </div>
  );
}
