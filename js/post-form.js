// post-form.js
const postForm = document.querySelector(".post-form");
const mediaInput = document.getElementById("media");
const fileURL = document.getElementById("fileURL");
const previewImages = document.getElementById("previewImage");
const descriptionInput = document.getElementById("description");
const mainContainer = document.querySelector(".main-container");
const selectPost = document.getElementById("select-post");

// File preview
mediaInput.addEventListener("change", () => {
  if (mediaInput.files.length > 0) {
    const file = mediaInput.files[0];
    const tempURL = URL.createObjectURL(file);
    fileURL.value = tempURL;

    if (file.type.startsWith("image/")) {
      previewImages.src = tempURL;
      previewImages.style.display = "block";
    } else {
      previewImages.style.display = "none";
    }
  } else {
    fileURL.value = "";
    previewImages.style.display = "none";
  }
});

// Submit post
postForm.addEventListener("submit", async e => {
  e.preventDefault();
  const file = mediaInput.files[0];
  const description = descriptionInput.value.trim();
  const username = sessionStorage.getItem("username") || "Anonymous";

  if (!file) return alert("Please select an image or video!");

  const fileURLLocal = URL.createObjectURL(file);

  const newPost = {
    user: username,
    description: description,
    media: fileURLLocal,
    type: file.type.startsWith("image/") ? "image" : "video",
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString()
  };

  try {
    const res = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost)
    });
    if (!res.ok) throw new Error("Failed to save post");
    const savedPost = await res.json();

    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
      <div class="post-images">
        <div class="post-header">
          <img src="../assets/images/profile1.jpg" alt="profile">
          <span class="username">${savedPost.user}</span>
          <p class="post-time">. just now</p>
          <i class="fa-solid fa-ellipsis"></i>
        </div>
        <div class="post-img">
          ${savedPost.type === "image" ? `<img src="${savedPost.media}" alt="post image">` :
            `<video controls src="${savedPost.media}" style="max-width:100%;"></video>`}
        </div>
        <div class="post-actions">
          <div class="post-comment">
            <i class="fa-regular fa-heart" id="likeBtn"></i>
            <i class="fa-regular fa-comment"></i>
            <i class="fa-regular fa-paper-plane"></i>
            <i class="fa-regular fa-bookmark"></i>
          </div>
        </div>
        <div class="total-like">
          <a href="#">${savedPost.likes}</a><p>likes</p>
        </div>
        <div class="description">
          <p><a href="#">${savedPost.user}</a> ${savedPost.description}</p>
        </div>
        <div class="comment-views">
          <a href="#">No comments yet</a>
        </div>
        <div class="add-comments">
          <input type="text" placeholder="Add commentdddddddddddd">
          <i class="fa-regular fa-face-smile"></i>
        </div>
      </div>
    `;
    mainContainer.prepend(postEl);
    postForm.reset();
    previewImages.style.display = "none";
    selectPost.style.display = "none";
  } catch (err) {
    console.error(err);
    alert("Error saving post!");
  }
});
