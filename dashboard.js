function goToTransfer() {
    window.location.href = "transfer.html";
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    window.location.href = "index.html";
}
