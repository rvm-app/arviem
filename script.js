document.addEventListener("DOMContentLoaded", function () {
    // Register Form
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let username = document.getElementById("registerUsername").value;
            let password = document.getElementById("registerPassword").value;

            if (username && password) {
                localStorage.setItem(username, password);
                alert("Registration successful! Please login.");
            } else {
                alert("Please enter a valid username and password.");
            }
        });
    }

    // User Login
    const userLoginForm = document.getElementById("userLoginForm");
    if (userLoginForm) {
        userLoginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let username = document.getElementById("userUsername").value;
            let password = document.getElementById("userPassword").value;

            if (localStorage.getItem(username) === password) {
                localStorage.setItem("loggedInUser", username);
                localStorage.setItem("userType", "user");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid username or password.");
            }
        });
    }

    // Admin Login
    const adminLoginForm = document.getElementById("adminLoginForm");
    if (adminLoginForm) {
        adminLoginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let adminUsername = document.getElementById("adminUsername").value;
            let adminPassword = document.getElementById("adminPassword").value;

            if (adminUsername === "admin" && adminPassword === "admin123") {
                localStorage.setItem("loggedInUser", adminUsername);
                localStorage.setItem("userType", "admin");
                window.location.href = "admin_dashboard.html";
            } else {
                alert("Invalid admin credentials!");
            }
        });
    }
});
