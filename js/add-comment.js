const allPosts = document.getElementById("allPosts");

// ========== SHOW/HIDE POST BUTTON ==========
allPosts.addEventListener("input", (e) => {
  if (e.target.classList.contains("comment-input")) {
    const postBtn = e.target.closest(".add-comments").querySelector(".post-comment-btn");

    if (e.target.value.trim()) {
      postBtn.style.display = "block"; // show as block
      postBtn.disabled = false;
    } else {
      postBtn.style.display = "none";
      postBtn.disabled = true;
    }
  }
});

// ========== POST COMMENT ==========
allPosts.addEventListener("click", async (e) => {
  if (e.target.classList.contains("post-comment-btn")) {
    const commentBtn = e.target;
    const commentInput = commentBtn.closest(".add-comments").querySelector(".comment-input");
    const commentText = commentInput.value.trim();

    if (!commentText) return;

    const postEl = commentBtn.closest(".post");
    const postId = postEl.dataset.id; // ensure each post has data-id
    const username = sessionStorage.getItem("username") || "Anonymous";

    // Display comment immediately
    let commentViews = postEl.querySelector(".comment-views");
    if (commentViews.textContent.includes("No comments yet")) {
      commentViews.innerHTML = '';
    }

    const newComment = document.createElement("p");
    newComment.innerHTML = `<strong>${username}</strong> ${commentText}`;
    commentViews.appendChild(newComment);

    // Save comment to db.json
    try {
      // 1. Get existing post
      const res = await fetch(`http://localhost:3000/posts/${postId}`);
      const post = await res.json();

      // 2. Update post's comments array
      const updatedComments = post.comments || [];
      updatedComments.push({ username, text: commentText });

      // 3. PATCH update post
      await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comments: updatedComments })
      });

    } catch (err) {
      console.error("Error saving comment:", err);
    }

    // Reset input and button
    commentInput.value = "";
    commentBtn.style.display = "none";
    commentBtn.disabled = true;
  }
});

// ========== LOAD EXISTING COMMENTS ==========
async function getPosts() {
  try {
    const res = await fetch("http://localhost:3000/posts");
    const posts = await res.json();

    allPosts.innerHTML = "";

    posts.forEach(post => {
      const postDiv = document.createElement("div");
      postDiv.classList.add("post");
      postDiv.dataset.id = post.id;

      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p class="post-content">${post.content}</p>
        <div class="comment-views">
          ${post.comments && post.comments.length > 0 ? post.comments.map(c => `<p><strong>${c.username}</strong> ${c.text}</p>`).join('') : 'No comments yet'}
        </div>
        <div class="add-comments">
          <input type="text" class="comment-input" placeholder="Add a comment...">
          <button class="post-comment-btn" style="display:none" disabled>Post</button>
        </div>
      `;

      allPosts.appendChild(postDiv);
    });

  } catch (err) {
    console.error("Error loading posts:", err);
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  getPosts();
});
