document.addEventListener("DOMContentLoaded", function () {
  const signUpBtn = document.getElementById("signup");
  const messageBox = document.getElementById("message");

  signUpBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !email || !mobile || !password) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    try {
      // Check if user already exists
      const res = await fetch("http://localhost:3000/users");
      const users = await res.json();

      const exists = users.some(
        u =>
          u.email.toLowerCase() === email.toLowerCase() ||
          u.username.toLowerCase() === username.toLowerCase() ||
          u.mobile === mobile
      );

      if (exists) {
        showMessage("User already exists.", "error");
        return;
      }

      // Save user
      const newUser = { username, email, mobile, password };
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      showMessage("Sign-up successful! Redirecting to login...", "success");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);
    } catch (err) {
      console.error(err);
      showMessage("Error connecting to server.", "error");
    }
  });

  function showMessage(message, type) {
    messageBox.textContent = message;
    messageBox.style.display = "block";
    messageBox.className = `message-${type}`;
  }
});
