// login.js

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const messageBox = document.getElementById("message");

  // Dummy users (replace with JSON Server or database if needed)
  const users = [
    { username: "olivier", email: "olivier@example.com", password: "123456" },
    { username: "jean", email: "jean@example.com", password: "abcdef" }
  ];

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      messageBox.textContent = "Please fill in all fields!";
      messageBox.style.color = "red";
      return;
    }

    // Check if user exists
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Save login info in sessionStorage
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("username", user.username);

      messageBox.textContent = "Login successful! Redirecting...";
      messageBox.style.color = "green";

      // Redirect to home page
      setTimeout(() => {
        window.location.href = "../index.html"; // adjust path if needed
      }, 1000);
    } else {
      messageBox.textContent = "Invalid email or password!";
      messageBox.style.color = "red";
    }
  });
});
