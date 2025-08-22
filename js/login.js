// login.js
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const messageBox = document.getElementById("message");

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      showMessage("⚠️ Please fill in all fields!", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) throw new Error("Failed to connect to server");

      const users = await response.json();

      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("username", user.username);
        sessionStorage.setItem("userId", user.id);

        showMessage("✅ Login successful! Redirecting...", "success");

        setTimeout(() => {
          window.location.href = "../index.html";
        }, 1500);
      } else {
        showMessage("❌ Invalid email or password!", "error");
      }
    } catch (error) {
      showMessage("🚨 Server error: " + error.message, "error");
    }
  });

  function showMessage(message, type) {
    messageBox.textContent = message;
    messageBox.style.display = "block";
    messageBox.className = `message ${type}`;
  }
});
