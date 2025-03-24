document.addEventListener('DOMContentLoaded', function () {
    const currentUser = localStorage.getItem('currentUser');
    const isAdmin = localStorage.getItem('isAdmin');

    if (!currentUser && !isAdmin) {
        window.location.href = "index.html"; // Redirect if not logged in
    }

    if (currentUser) {
        document.getElementById('user-dashboard').classList.remove('hidden');
        document.getElementById('user-name').innerText = currentUser;
        loadUserData(currentUser);
    } else if (isAdmin) {
        document.getElementById('admin-dashboard').classList.remove('hidden');
        loadAdminData();
    }
});

// **Navigate to Transfer Page**
function goToTransfer() {
    window.location.href = "transfer.html";
}

// **Logout Function**
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    window.location.href = "index.html";
}
