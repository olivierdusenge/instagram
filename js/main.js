// main.js
document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("logout");

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      sessionStorage.clear();
      window.location.replace("/auth/login.html");
    });
  }

  // Block access if not logged in
  if (sessionStorage.getItem("isLoggedIn") !== "true") {
    window.location.replace("/auth/login.html");
  }

  // Prevent back button after logout
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
    window.history.pushState(null, null, window.location.href);
  };
});


