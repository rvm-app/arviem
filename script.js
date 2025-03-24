// Load user data when dashboard opens
window.onload = function () {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = "index.html"; // Redirect if not logged in
        return;
    }

    document.getElementById("user-name").textContent = currentUser;

    // Retrieve user data
    let users = JSON.parse(localStorage.getItem('users')) || {};
    let userData = users[currentUser] || { bottles: 0, pointsEarned: 0, pointsUsed: 0 };

    let tableRow = `
        <tr>
            <td>${userData.bottles}</td>
            <td>${userData.pointsEarned}</td>
            <td>${userData.pointsUsed}</td>
        </tr>`;
    document.getElementById("user-data").innerHTML = tableRow;
};

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = "index.html";
}

// Redirect to transfer page
function goToTransfer() {
    window.location.href = "transfer.html";
}
