// signup.js
document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.getElementById("signupForm");
  const messageBox = document.getElementById("message");

  signUpForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !email || !password) {
      showMessage("⚠️ Please fill in all fields.", "error");
      return;
    }

    try {
      // Check if user already exists
      const res = await fetch("http://localhost:3000/users");
      const users = await res.json();

      const exists = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === username.toLowerCase()
      );

      if (exists) {
        showMessage("🚫 User already exists (email/username taken).", "error");
        return;
      }

      // Save new user in db.json
      const newUser = { username, email, password };

      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      showMessage("✅ Sign-up successful! Redirecting to login...", "success");

      setTimeout(() => {
        window.location.href = "login.html"; // adjust path if needed
      }, 1500);
    } catch (err) {
      console.error(err);
      showMessage("🚨 Error connecting to server.", "error");
    }
  });

  function showMessage(message, type) {
    messageBox.textContent = message;
    messageBox.style.display = "block";
    messageBox.className = `message ${type}`;
  }
});
