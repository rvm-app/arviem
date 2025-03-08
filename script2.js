document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("currentUser")) {
        showUserDashboard(localStorage.getItem("currentUser"));
    }
});

function showUserRegistration() {
    document.getElementById("entry-choice").classList.add("hidden");
    document.getElementById("user-registration").classList.remove("hidden");
}

function showUserLogin() {
    document.getElementById("entry-choice").classList.add("hidden");
    document.getElementById("user-registration").classList.add("hidden"); // Hide registration form
    document.getElementById("user-login").classList.remove("hidden");

    // Clear the registration inputs
    document.getElementById("register-username").value = "";
    document.getElementById("register-password").value = "";
}

function showAdminLogin() {
    document.getElementById("entry-choice").classList.add("hidden");
    document.getElementById("admin-login").classList.remove("hidden");
}

function registerUser() {
    let username = document.getElementById("register-username").value;
    let password = document.getElementById("register-password").value;

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
        alert("Username already exists. Please choose another one.");
        return;
    }

    users[username] = {
        password: password,
        bottles: 0,
        pointsEarned: 0,
        pointsUsed: 0
    };

    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Please log in.");
    showUserLogin();
}

function loginUser() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[username]) {
        alert("User not found. Please register.");
        return;
    }

    if (users[username].password !== password) {
        alert("Incorrect password.");
        return;
    }

    localStorage.setItem("currentUser", username);
    showUserDashboard(username);
}

function loginAdmin() {
    let adminPassword = document.getElementById("admin-password").value;
    if (adminPassword === "PCNHS") { 
        showAdminDashboard();
    } else {
        alert("Incorrect password.");
    }
}

function showUserDashboard(username) {
    document.getElementById("entry-choice").classList.add("hidden");
    document.getElementById("user-login").classList.add("hidden");
    document.getElementById("user-dashboard").classList.remove("hidden");
    document.getElementById("user-name").textContent = username;
}

function showAdminDashboard() {
    document.getElementById("entry-choice").classList.add("hidden");
    document.getElementById("admin-login").classList.add("hidden");
    document.getElementById("admin-dashboard").classList.remove("hidden");

    let users = JSON.parse(localStorage.getItem("users")) || {};
    let tableBody = document.getElementById("user-data");
    tableBody.innerHTML = "";

    for (let username in users) {
        let row = `<tr>
            <td>${username}</td>
            <td>${users[username].bottles}</td>
            <td>${users[username].pointsEarned}</td>
            <td>${users[username].pointsUsed}</td>
        </tr>`;
        tableBody.innerHTML += row;
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    location.reload();
}
