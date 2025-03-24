document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus(); // Check login on page load

    // Event listeners for login and register forms
    document.getElementById("register-btn")?.addEventListener("click", registerUser);
    document.getElementById("login-btn")?.addEventListener("click", loginUser);
    document.getElementById("logout-btn")?.addEventListener("click", logoutUser);
});

// ✅ 1. REGISTER FUNCTION
function registerUser() {
    let username = document.getElementById("register-username").value;
    let password = document.getElementById("register-password").value;

    if (username === "" || password === "") {
        alert("Please enter a username and password.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
        alert("User already exists! Please log in.");
        return;
    }

    // Save user data
    users[username] = {
        password: password,
        bottles: 0,
        pointsEarned: 0,
        pointsUsed: 0
    };

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", username); // Save session

    alert("Registration successful! Redirecting to dashboard...");
    window.location.href = "dashboard.html"; // Redirect after registration
}

// ✅ 2. LOGIN FUNCTION
function loginUser() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[username] || users[username].password !== password) {
        alert("Invalid username or password.");
        return;
    }

    localStorage.setItem("currentUser", username); // Save session

    alert("Login successful! Redirecting to dashboard...");
    window.location.href = "dashboard.html"; // Redirect to dashboard
}

// ✅ 3. CHECK LOGIN STATUS FUNCTION
function checkLoginStatus() {
    let currentUser = localStorage.getItem("currentUser");

    if (window.location.pathname.includes("dashboard.html")) {
        if (!currentUser) {
            alert("You must be logged in!");
            window.location.href = "index.html"; // Redirect to login page
        } else {
            loadDashboardData();
        }
    }
}

// ✅ 4. LOAD DASHBOARD DATA
function loadDashboardData() {
    let currentUser = localStorage.getItem("currentUser");
    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[currentUser]) {
        document.getElementById("usernameDisplay").innerText = currentUser;
        document.getElementById("bottlesCount").innerText = users[currentUser].bottles;
        document.getElementById("pointsEarned").innerText = users[currentUser].pointsEarned;
        document.getElementById("pointsUsed").innerText = users[currentUser].pointsUsed;
    }
}

// ✅ 5. LOGOUT FUNCTION
function logoutUser() {
    localStorage.removeItem("currentUser");
    alert("Logged out successfully!");
    window.location.href = "index.html"; // Redirect to login page
}
