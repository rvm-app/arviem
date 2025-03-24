function showUserLogin() {
    document.getElementById('user-login').classList.remove('hidden');
    document.getElementById('entry-choice').classList.add('hidden');
}

function showAdminLogin() {
    document.getElementById('admin-login').classList.remove('hidden');
    document.getElementById('entry-choice').classList.add('hidden');
}

function showRegister() {
    document.getElementById('user-registration').classList.remove('hidden');
    document.getElementById('user-login').classList.add('hidden');
}

function registerUser() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (!username || !password) {
        alert("❌ Please enter a username and password!");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username]) {
        alert("❌ Username already exists!");
        return;
    }

    users[username] = { password };
    localStorage.setItem('users', JSON.stringify(users));

    alert("✅ Registration successful! You can now log in.");
    showUserLogin();
}

function loginUser() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    let users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[username] || users[username].password !== password) {
        alert("❌ Invalid username or password!");
        return;
    }

    localStorage.setItem('currentUser', username);
    window.location.href = "dashboard.html";
}

function loginAdmin() {
    const adminPassword = document.getElementById('admin-password').value;

    if (adminPassword === "admin123") {
        localStorage.setItem('isAdmin', true);
        window.location.href = "dashboard.html";
    } else {
        alert("❌ Incorrect admin password!");
    }
}
