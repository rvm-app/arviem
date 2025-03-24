const BLYNK_AUTH = "cSX4tsklZueXt8cbGAKREbpG4u5OPIhM"; // Replace with your actual Blynk token

document.getElementById('transferForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const fromUser = localStorage.getItem('currentUser');  // Sender
    const toUser = document.getElementById('toUser').value.trim(); // Receiver
    const amount = parseInt(document.getElementById('transferAmount').value); // Points

    if (!fromUser || !toUser || isNaN(amount) || amount <= 0) {
        alert("❌ Invalid transfer details!");
        return;
    }

    if (fromUser === toUser) {
        alert("❌ You cannot transfer points to yourself!");
        return;
    }

    const fromUserID = getUserID(fromUser);
    const toUserID = getUserID(toUser);

    const fromPointsPin = 11 + (fromUserID * 10); // Sender's points
    const toPointsPin = 11 + (toUserID * 10); // Receiver's points

    let fromUserPoints = await fetchBlynkData(fromPointsPin);
    fromUserPoints = parseInt(fromUserPoints);

    if (fromUserPoints < amount) {
        alert("❌ Not enough points!");
        return;
    }

    let toUserPoints = await fetchBlynkData(toPointsPin);
    toUserPoints = parseInt(toUserPoints);

    await updateBlynkData(fromPointsPin, fromUserPoints - amount); // Deduct points
    await updateBlynkData(toPointsPin, toUserPoints + amount); // Add points

    alert(`✅ Transferred ${amount} points from ${fromUser} to ${toUser}`);
    window.location.href = "dashboard.html"; // Redirect back
});

// **Fetch Data from Blynk**
async function fetchBlynkData(pin) {
    try {
        let response = await fetch(`https://blynk.cloud/external/api/get?token=${BLYNK_AUTH}&V${pin}`);
        return response.ok ? await response.text() : "0";
    } catch (error) {
        console.error(`⚠️ Error fetching V${pin}:`, error);
        return "0";
    }
}

// **Update Blynk Data**
async function updateBlynkData(pin, value) {
    try {
        let response = await fetch(`https://blynk.cloud/external/api/update?token=${BLYNK_AUTH}&V${pin}=${value}`);
        if (!response.ok) {
            console.error(`❌ Failed to update V${pin}`);
        }
    } catch (error) {
        console.error(`⚠️ Error updating V${pin}:`, error);
    }
}

// **Generate User ID from Username**
function getUserID(username) {
    return username.length % 10; // Example: Simple user-based ID
}

// **Back to Dashboard**
function goBack() {
    window.location.href = "dashboard.html";
}
