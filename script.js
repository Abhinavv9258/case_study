// Store data in local variables (use localStorage for persistence)
const users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = null;
const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

// Registration Logic
document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("customerName").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("mobileNumber").value;
    const address = document.getElementById("address").value;
    const password = document.getElementById("password").value;
    const customerId = Math.random().toString(36).substr(2, 9);

    document.getElementById("generatedUserId").textContent = customerId;
    document.getElementById("acknowledgment").classList.remove("d-none");

    if (users.some((user) => user.email === email)) {
        alert("Email already registered!");
        return;
    }

    users.push({ name, email, contact, address, customerId, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");

    // Optional: Reset the form after displaying acknowledgment
    this.reset();
});

// Login Logic
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const customerId = document.getElementById("loginUserId").value;
    const password = document.getElementById("loginPassword").value;

    // Authenticate user
    const user = users.find((user) => user.customerId === customerId && user.password === password);
    if (!user) {
        alert("Invalid credentials!");
        return;
    }

    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert(`Welcome, ${user.name}!`);
    showLogoutSection();
});

// Logout Logic
document.getElementById("nav-logout-tab").addEventListener("click", (e) => {
    e.preventDefault();
    // Clear currentUser from local storage
    localStorage.removeItem("currentUser");
    currentUser = null;
    alert("You have logged out successfully!");
    hideLogoutSection();
});

function showLogoutSection() {
    document.getElementById("logoutTabItem").style.display = "block";
}

function hideLogoutSection() {
    document.getElementById("logoutTabItem").style.display = "none";
}

function showRegisterSection() {
    console.log("Show");
    document.getElementById("nav-registration").style.display = "block";
}


function hideRegisterSection() {
    console.log("Register");
    document.getElementById("registration").style.display = "none";
}



// Helper Functions
// function showLoginSection() {
//     document.getElementById("nav-registration").classList.remove("active");
//     document.getElementById("nav-login").classList.add("active");
//     document.getElementById("nav-home-tab").classList.remove("active");
//     document.getElementById("nav-home").classList.remove("show", "active");
//     document.getElementById("nav-login").classList.add("show", "active");
// }

// function showBookingSection() {
//     document.getElementById("loginSection").classList.add("d-none");
//     document.getElementById("reservationSection").classList.remove("d-none");
// }

// function updateBookingsList() {
//     const list = document.getElementById("bookingsList");
//     list.innerHTML = "";
//     bookings
//         .filter((booking) => booking.user === currentUser.email)
//         .forEach((booking, index) => {
//             const item = document.createElement("li");
//             item.className = "list-group-item";
//             item.textContent = Check-In: ${booking.checkInDate}, Check-Out: ${booking.checkOutDate}, Room: ${booking.roomPreference}, Name: ${booking.reservationName}, Contact: ${booking.reservationContact};
//             list.appendChild(item);
//         });
// }


// Check if user is already logged in when the page loads
if (JSON.parse(localStorage.getItem("currentUser"))) {
    // showBookingSection();
    // updateBookingsList();
    showLogoutSection();
} else {
    hideLogoutSection();
}
