const BLYNK_AUTH = "cSX4tsklZueXt8cbGAKREbpG4u5OPIhM"; // Your Blynk Token

document.getElementById('loginButton').addEventListener('click', function () {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Simulated login check (Modify this if using a real database)
    if (username && password) {
        localStorage.setItem('currentUser', username);
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('usernameDisplay').innerText = username;
        loadUserData(username);
    } else {
        alert("Invalid login!");
    }
});

// **Fetch Bottle Count & Points from Blynk**
async function loadUserData(username) {
    const userId = getUserID(username);
    const bottlePin = 10 + (userId * 10);
    const pointsPin = 11 + (userId * 10);

    try {
        let bottleCount = await fetchBlynkData(bottlePin);
        let bottlePoints = await fetchBlynkData(pointsPin);

        document.getElementById("bottleCount").innerText = bottleCount || 0;
        document.getElementById("bottlePoints").innerText = bottlePoints || 0;
    } catch (error) {
        console.error("Error loading Blynk data:", error);
    }
}

// **Fetch Data from Blynk API**
async function fetchBlynkData(pin) {
    const response = await fetch(`https://blynk.cloud/external/api/get?token=${BLYNK_AUTH}&V${pin}`);
    return response.ok ? await response.text() : "0";
}

// **Transfer Points Between Users**
document.getElementById('transferForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const fromUser = localStorage.getItem('currentUser');
    const toUser = document.getElementById('toUser').value;
    const amount = parseInt(document.getElementById('transferAmount').value);

    if (!fromUser || !toUser || isNaN(amount) || amount <= 0) {
        alert("Invalid transfer details!");
        return;
    }

    const fromUserID = getUserID(fromUser);
    const toUserID = getUserID(toUser);

    const fromPointsPin = 11 + (fromUserID * 10);
    const toPointsPin = 11 + (toUserID * 10);

    let fromUserPoints = await fetchBlynkData(fromPointsPin);
    fromUserPoints = parseInt(fromUserPoints);

    if (fromUserPoints < amount) {
        alert("Not enough points!");
        return;
    }

    let toUserPoints = await fetchBlynkData(toPointsPin);
    toUserPoints = parseInt(toUserPoints);

    await updateBlynkData(fromPointsPin, fromUserPoints - amount);
    await updateBlynkData(toPointsPin, toUserPoints + amount);

    alert(`Transferred ${amount} points from ${fromUser} to ${toUser}`);
    loadUserData(fromUser);
});

// **Update Blynk Data**
async function updateBlynkData(pin, value) {
    const response = await fetch(`https://blynk.cloud/external/api/update?token=${BLYNK_AUTH}&V${pin}=${value}`);
    if (!response.ok) {
        console.error(`Failed to update V${pin}`);
    }
}

// **Generate User ID from Username**
function getUserID(username) {
    return username.length % 10; // Example logic: Simple user-based ID
}

// **Logout Function**
function logout() {
    localStorage.removeItem('currentUser');
    location.reload();
}
