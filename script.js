document.addEventListener("DOMContentLoaded", function () {
     const selection = document.getElementById("selection");
     const userLogin = document.getElementById("userLogin");
     const userForms = document.getElementById("userForms");
     const adminLogin = document.getElementById("adminLogin");
     const backButtons = document.querySelectorAll(".backBtn");
 
     // Show User Login/Register
     document.getElementById("userBtn").addEventListener("click", function () {
         selection.style.display = "none";
         userLogin.style.display = "block";
         userForms.style.display = "block";
     });
 
     // Show Admin Login
     document.getElementById("adminBtn").addEventListener("click", function () {
         selection.style.display = "none";
         adminLogin.style.display = "block";
     });
 
     // Go back to selection menu
     backButtons.forEach(btn => {
         btn.addEventListener("click", function () {
             userLogin.style.display = "none";
             userForms.style.display = "none";
             adminLogin.style.display = "none";
             selection.style.display = "block";
         });
     });
 
     // Register User
     document.getElementById("registerForm").addEventListener("submit", function (event) {
         event.preventDefault();
         let username = document.getElementById("registerUsername").value;
         let password = document.getElementById("registerPassword").value;
 
         if (localStorage.getItem(username)) {
             alert("Username already exists!");
         } else {
             localStorage.setItem(username, password);
             alert("Registration successful!");
         }
     });
 
     // User Login
     document.getElementById("userLoginForm").addEventListener("submit", function (event) {
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
 
     // Admin Login
     document.getElementById("adminLoginForm").addEventListener("submit", function (event) {
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
 });
