document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("logout");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      sessionStorage.clear();
      sessionStorage.setItem("logoutMessage", "Logged out successfully");
      window.location.replace("login.html");
    });
  }

  // 🔐 Block access to home if not logged in
  if (sessionStorage.getItem("isLoggedIn") !== "true") {
    window.location.replace("login.html");
  }

  // 🔒 Prevent going back after logout
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
    window.history.pushState(null, null, window.location.href);
  };
});
