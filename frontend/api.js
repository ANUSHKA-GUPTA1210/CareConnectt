const API_BASE = "http://localhost:5000/api/auth";  // your local backend

// Register user
async function registerUser(name, email, password, role, bloodGroup, city) {
    try {
        const res = await fetch(`${API_BASE}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role, bloodGroup, city })
        });
        const data = await res.json();
        console.log("Register response:", data);
        return data;
    } catch (err) {
        console.error("Register error:", err);
    }
}

// Login user
async function loginUser(email, password) {
    try {
        const res = await fetch(`${API_BASE}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        console.log("Login response:", data);
        return data;
    } catch (err) {
        console.error("Login error:", err);
    }
}
