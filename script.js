document.addEventListener("DOMContentLoaded", function () {
    const selection = document.getElementById("selection");
    const userForms = document.getElementById("userForms");
    const adminLogin = document.getElementById("adminLogin");
    const backButtons = document.querySelectorAll(".backBtn");

    // Show User Login/Register
    document.getElementById("userBtn").addEventListener("click", function () {
        selection.style.display = "none";
        userForms.style.display = "block";
    });
document.getElementById("transferPoints").addEventListener("click", function () {
    const recipient = document.getElementById("recipientUsername").value.trim();
    const pointsToTransfer = parseInt(document.getElementById("pointsToTransfer").value);

    // Validate recipient and points
    if (!recipient || isNaN(pointsToTransfer) || pointsToTransfer <= 0) {
        alert("Please enter a valid recipient and a valid number of points to transfer.");
        return;
    }

    // Restrict transfer to "admin" or "user2" only
    if (recipient !== "admin" && recipient !== "user2") {
        alert("Points can only be transferred to 'admin' or 'user2'.");
        return;
    }

    // Example logic for transferring points
    const userPoints = parseInt(document.getElementById("pointsEarned").textContent);
    if (pointsToTransfer > userPoints) {
        alert("Insufficient points to transfer.");
        return;
    }

    // Update points after transfer
    document.getElementById("pointsEarned").textContent = userPoints - pointsToTransfer;
    alert(`Successfully transferred ${pointsToTransfer} points to ${recipient}!`);

    // Optionally, update pointsUsed
    const pointsUsed = parseInt(document.getElementById("pointsUsed").textContent) + pointsToTransfer;
    document.getElementById("pointsUsed").textContent = pointsUsed;

    // Example: send data to server (uncomment to implement)
    /*
    fetch('https://your-server-endpoint/transfer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sender: loggedInUser,
            recipient: recipient,
            points: pointsToTransfer
        })
    }).then(response => response.json())
      .then(data => {
          console.log(data);
          alert('Points transferred successfully!');
      }).catch(error => {
          console.error('Error:', error);
      });
    */
});
    // Show Admin Login
    document.getElementById("adminBtn").addEventListener("click", function () {
        selection.style.display = "none";
        adminLogin.style.display = "block";
    });

    // Go back to selection menu
    backButtons.forEach(btn => {
        btn.addEventListener("click", function () {
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

    // Set the admin credentials
    if (adminUsername === "admin" && adminPassword === "admin") {
        localStorage.setItem("loggedInUser", adminUsername);
        localStorage.setItem("userType", "admin");
        window.location.href = "admin_dashboard.html";
    } else {
        alert("Invalid admin credentials!");
    }
    });
});
