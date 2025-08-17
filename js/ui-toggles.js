// ui-toggles.js
const moreBtn = document.getElementById("more-btn");
const switchContainer = document.getElementById("switch-accounts-container");
const createPostBtn = document.getElementById("create");
const createPostCard = document.querySelector(".create-post-card");
const selectPost = document.getElementById("select-post");
const openPostOption = document.getElementById("openModal");

// Toggle "More" menu
moreBtn.addEventListener("click", e => {
  e.preventDefault();
  switchContainer.style.display = switchContainer.style.display === "block" ? "none" : "block";
  createPostCard.style.display = "none";
  e.stopPropagation();
});

// Toggle "Create" menu
createPostBtn.addEventListener("click", e => {
  e.preventDefault();
  createPostCard.style.display = createPostCard.style.display === "block" ? "none" : "block";
  switchContainer.style.display = "none";
  e.stopPropagation();
});

// Show "Select Post" modal
openPostOption.addEventListener("click", e => {
  e.preventDefault();
  selectPost.style.display = "flex";
  createPostCard.style.display = "none";
  e.stopPropagation();
});

// Close menus/modals when clicking outside
document.addEventListener("click", e => {
  if (!switchContainer.contains(e.target) && !moreBtn.contains(e.target)) switchContainer.style.display = "none";
  if (!createPostCard.contains(e.target) && !createPostBtn.contains(e.target)) createPostCard.style.display = "none";
  if (selectPost.style.display === "flex" && !selectPost.contains(e.target) && !openPostOption.contains(e.target)) selectPost.style.display = "none";
});
